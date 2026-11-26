"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactForm } from "@/server-actions/sendContactForm";
import { ConsentField, Field, Honeypot, invalidProps, PhoneInput, SubmitButton } from "./form-fields";

const MESSAGE_MAX = 1000;

const schema = z.object({
   name: z.string().trim().min(2, "Минимум 2 символа"),
   phone: z.string().refine((value) => isValidPhoneNumber(value, "RU"), "Введите номер телефона полностью"),
   email: z.email("Введите корректный e-mail"),
   message: z.string().max(MESSAGE_MAX, `Максимум ${MESSAGE_MAX} символов`),
   consent: z.boolean().refine((value) => value, "Без согласия мы не сможем обработать сообщение"),
   honeypot: z.string().optional(),
});

export type ContactFormData = z.infer<typeof schema>;

const DEFAULT_VALUES: ContactFormData = {
   name: "",
   phone: "",
   email: "",
   message: "",
   consent: false,
   honeypot: "",
};

export function ContactForm() {
   const uid = useId();
   const id = (name: string) => `${uid}-${name}`;

   const {
      handleSubmit,
      control,
      register,
      reset,
      formState: { errors, isSubmitting },
   } = useForm<ContactFormData>({
      resolver: zodResolver(schema),
      defaultValues: DEFAULT_VALUES,
   });

   const onSubmit = async (data: ContactFormData) => {
      if (data.honeypot) return;

      try {
         const result = await sendContactForm({ ...data, formTitle: "Сообщение с сайта" });
         if (result.success) {
            toast.success("Сообщение отправлено", { description: "Ответим по телефону или на e-mail" });
            reset(DEFAULT_VALUES);
         } else {
            toast.error(result.error || "Не получилось отправить. Попробуйте ещё раз");
         }
      } catch (error) {
         console.error(error);
         toast.error("Не получилось отправить. Попробуйте позже или позвоните нам");
      }
   };

   return (
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="relative grid gap-5">
         <div className="grid gap-5 sm:grid-cols-2">
            <Field id={id("name")} label="Имя" error={errors.name?.message}>
               <Input
                  id={id("name")}
                  autoComplete="name"
                  placeholder="Как к вам обращаться"
                  {...register("name")}
                  {...invalidProps(id("name"), errors.name?.message)}
               />
            </Field>
            <Field id={id("phone")} label="Телефон" error={errors.phone?.message}>
               <PhoneInput control={control} name="phone" id={id("phone")} error={errors.phone?.message} />
            </Field>
         </div>

         <Field id={id("email")} label="E-mail" error={errors.email?.message}>
            <Input
               id={id("email")}
               type="email"
               inputMode="email"
               autoComplete="email"
               placeholder="name@example.ru"
               {...register("email")}
               {...invalidProps(id("email"), errors.email?.message)}
            />
         </Field>

         <Field id={id("message")} label="Сообщение" optional error={errors.message?.message}>
            <Textarea
               id={id("message")}
               placeholder="Что нужно сделать, площадь, адрес объекта"
               maxLength={MESSAGE_MAX}
               {...register("message")}
               {...invalidProps(id("message"), errors.message?.message)}
            />
         </Field>

         <ConsentField control={control} name="consent" id={id("consent")} error={errors.consent?.message} />

         <SubmitButton pending={isSubmitting}>Отправить сообщение</SubmitButton>

         <Honeypot registration={register("honeypot")} />
      </form>
   );
}
