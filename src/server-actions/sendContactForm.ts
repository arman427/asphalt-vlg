"use server";

import nodemailer from 'nodemailer';
import { headers } from "next/headers";

const FIELD_LABELS: Record<string, string> = {
   name: "Имя",
   phone: "Телефон",
   email: "Email",
   message: "Сообщение",
   location: "Тип объекта",
   load: "Нагрузка",
   base: "Текущее основание",

   extras: "Дополнительные услуги",
   bordur: "Установка бордюра",
   kanalization: "Ливневая канализация",
   demontaz: "Демонтаж покрытия",
   vivozGrunta: "Вывоз грунта / мусора",
};

export type UniversalFormData = {
   honeypot?: string;
   formTitle?: string;
   [key: string]: any;
};

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 2 * 60 * 1000;

function generateHtmlRows(data: Record<string, any>): string {
   let html = "";

   for (const [key, value] of Object.entries(data)) {
      if (
         key === "honeypot" ||
         key === "formTitle" ||
         value === undefined ||
         value === null
      ) {
         continue;
      }

      const label = FIELD_LABELS[key] || key;

      if (typeof value === "object" && !Array.isArray(value)) {
         const nestedRows = generateHtmlRows(value);

         if (!nestedRows) {
            continue;
         }

         html += `
            <tr>
               <td colspan="2" style="padding-top:10px;font-weight:bold;border-bottom:1px solid #eee;">
                  ${label}
               </td>
            </tr>
         `;

         html += nestedRows;
         continue;
      }

      if (typeof value === "boolean") {
         if (value) {
            html += `
               <tr>
                  <td style="padding:5px;font-weight:bold;border-bottom:1px solid #eee;">
                     ✅ ${label}
                  </td>
                  <td style="padding:5px;border-bottom:1px solid #eee;">
                     Да
                  </td>
               </tr>
            `;
         }

         continue;
      }

      if (value !== "") {
         html += `
            <tr>
               <td style="padding:5px;font-weight:bold;border-bottom:1px solid #eee;">
                  ${label}:
               </td>
               <td style="padding:5px;border-bottom:1px solid #eee;">
                  ${value}
               </td>
            </tr>
         `;
      }
   }

   return html;
}

export async function sendContactForm(data: UniversalFormData) {
   if (data.honeypot) {
      return { success: false, error: "Обнаружен бот" };
   }

   const headersList = await headers();
   const ip =
      headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
      headersList.get("x-real-ip") ??
      "unknown";

   const lastSent = rateLimitMap.get(ip);
   const now = Date.now();

   if (lastSent && now - lastSent < RATE_LIMIT_MS) {
      const secondsLeft = Math.ceil((RATE_LIMIT_MS - (now - lastSent)) / 1000);
      return {
         success: false,
         error: `Подождите ${secondsLeft} секунд перед повторной отправкой.`
      };
   }

   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS
      }
   });

   const formName = data.formTitle || "Новая заявка";
   const mailRowsHtml = generateHtmlRows(data);
   const smtpUser = process.env.SMTP_USER;
   if (!smtpUser) {
      throw new Error("SMTP_USER не настроен");
   }

   try {
      await transporter.sendMail({
         from: `"Заявка с сайта" <${smtpUser}>`,
         to: smtpUser,
         replyTo: smtpUser,
         subject: `${formName} — Асфальтирование Волгоград`,
         html: `
         <div style="display:none; color:transparent; font-size:0;">Заявка на расчет стоимости от клиента</div>
            <h2>${formName}</h2>
            <p>Данные формы:</p>
            <table style="width: 100%; max-width: 600px; border-collapse: collapse; font-family: sans-serif;">
               <tbody>
                  ${mailRowsHtml}
               </tbody>
            </table>
         `
      });

      rateLimitMap.set(ip, now);
      return { success: true };
   } catch (error) {
      console.error("[SEND_CONTACT_FORM] SERVER-ACTION", error);
      return {
         success: false,
         error: "Не удалось отправить форму. Попробуйте позже."
      };
   }
}