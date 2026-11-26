"use server";

import nodemailer from "nodemailer";
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

/** Служебные поля, которые не попадают в таблицу письма */
const SKIP_FIELDS = new Set(["honeypot", "formTitle", "consent"]);

type FormValue = string | number | boolean | null | undefined | { [key: string]: FormValue };

export type UniversalFormData = {
   honeypot?: string;
   formTitle?: string;
   consent?: boolean;
   [key: string]: FormValue;
};

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 2 * 60 * 1000;

const escapeHtml = (value: string) =>
   value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

const row = (label: string, value: string) => `
   <tr>
      <td style="padding:5px;font-weight:bold;border-bottom:1px solid #eee;">${label}</td>
      <td style="padding:5px;border-bottom:1px solid #eee;">${value}</td>
   </tr>
`;

function generateHtmlRows(data: Record<string, FormValue>): string {
   let html = "";

   for (const [key, value] of Object.entries(data)) {
      if (SKIP_FIELDS.has(key) || value === undefined || value === null) {
         continue;
      }

      const label = escapeHtml(FIELD_LABELS[key] || key);

      if (typeof value === "object") {
         const nestedRows = generateHtmlRows(value);
         if (!nestedRows) continue;

         html += `
            <tr>
               <td colspan="2" style="padding-top:10px;font-weight:bold;border-bottom:1px solid #eee;">${label}</td>
            </tr>
            ${nestedRows}
         `;
         continue;
      }

      if (typeof value === "boolean") {
         if (value) html += row(label, "Да");
         continue;
      }

      if (value !== "") {
         html += row(`${label}:`, escapeHtml(String(value)));
      }
   }

   return html;
}

export async function sendContactForm(data: UniversalFormData) {
   if (data.honeypot) {
      return { success: false, error: "Обнаружен бот" };
   }

   // Без согласия на обработку персональных данных заявку не принимаем (152-ФЗ, ст. 9)
   if (data.consent !== true) {
      return { success: false, error: "Нужно согласие на обработку персональных данных" };
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
         error: `Подождите ${secondsLeft} с перед повторной отправкой`,
      };
   }

   const smtpUser = process.env.SMTP_USER;
   if (!smtpUser || !process.env.SMTP_PASS) {
      console.error("[SEND_CONTACT_FORM] SMTP_USER или SMTP_PASS не настроены");
      return { success: false, error: "Форма временно не работает. Позвоните нам или напишите в мессенджер" };
   }

   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: smtpUser,
         pass: process.env.SMTP_PASS,
      },
   });

   const formName = escapeHtml(data.formTitle || "Новая заявка");
   const consentAt = new Date(now).toLocaleString("ru-RU", { timeZone: "Europe/Volgograd" });
   const mailRowsHtml = generateHtmlRows(data) + row("Согласие на обработку ПД:", `дано ${consentAt} (Волгоград)`);

   try {
      await transporter.sendMail({
         from: `"Заявка с сайта" <${smtpUser}>`,
         to: smtpUser,
         replyTo: smtpUser,
         subject: `${data.formTitle || "Новая заявка"} — Асфальтирование Волгоград`,
         html: `
            <div style="display:none; color:transparent; font-size:0;">Заявка на расчёт стоимости от клиента</div>
            <h2>${formName}</h2>
            <p>Данные формы:</p>
            <table style="width: 100%; max-width: 600px; border-collapse: collapse; font-family: sans-serif;">
               <tbody>
                  ${mailRowsHtml}
               </tbody>
            </table>
         `,
      });

      rateLimitMap.set(ip, now);
      return { success: true };
   } catch (error) {
      console.error("[SEND_CONTACT_FORM] SERVER-ACTION", error);
      return {
         success: false,
         error: "Не удалось отправить форму. Попробуйте позже",
      };
   }
}
