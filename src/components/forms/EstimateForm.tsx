"use client";

import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import {
   FEEDBACK_SELECT_DATA_1,
   FEEDBACK_SELECT_DATA_2,
   FEEDBACK_SELECT_DATA_3,
} from "@/constants/feedback-select-data";
import { sendContactForm } from "@/server-actions/sendContactForm";
import { CheckboxField, ConsentField, Field, Honeypot, invalidProps, PhoneInput, SubmitButton } from "./form-fields";

const schema = z.object({
   name: z.string().trim().min(2, "Введите имя"),
   phone: z.string().refine((value) => isValidPhoneNumber(value, "RU"), "Введите номер телефона полностью"),
   location: z.string().min(1, "Выберите тип объекта"),
   load: z.string().min(1, "Выберите нагрузку"),
   base: z.string().min(1, "Выберите основание"),
   extras: z.object({
      bordur: z.boolean(),
      kanalization: z.boolean(),
      demontaz: z.boolean(),
      vivozGrunta: z.boolean(),
   }),
   consent: z.boolean().refine((value) => value, "Без согласия мы не сможем обработать заявку"),
   honeypot: z.string().optional(),
});

export type EstimateFormData = z.infer<typeof schema>;

const EXTRAS = [
   { name: "bordur", label: "Установка бордюра" },
   { name: "kanalization", label: "Ливневая канализация" },
   { name: "demontaz", label: "Демонтаж покрытия" },
   { name: "vivozGrunta", label: "Вывоз грунта / мусора" },
] as const;

const SELECTS = [
   { name: "location", label: "Тип объекта", options: FEEDBACK_SELECT_DATA_1 },
   { name: "load", label: "Нагрузка", options: FEEDBACK_SELECT_DATA_2 },
   { name: "base", label: "Текущее основание", options: FEEDBACK_SELECT_DATA_3 },
] as const;

const DEFAULT_VALUES: EstimateFormData = {
   name: "",
   phone: "",
   location: "",
   load: "",
   base: "",
   extras: { bordur: false, kanalization: false, demontaz: false, vivozGrunta: false },
   consent: false,
   honeypot: "",
};

interface Props {
   onSuccess?: () => void;
}

export function EstimateForm({ onSuccess }: Props) {
   const uid = useId();
   const id = (name: string) => `${uid}-${name}`;

   const {
      handleSubmit,
      control,
      register,
      reset,
      formState: { errors, isSubmitting },
   } = useForm<EstimateFormData>({
      resolver: zodResolver(schema),
      defaultValues: DEFAULT_VALUES,
   });

   const onSubmit = async (data: EstimateFormData) => {
      if (data.honeypot) return;

      try {
         const result = await sendContactForm({ ...data, formTitle: "Расчёт стоимости" });
         if (result.success) {
            toast.success("Заявка отправлена", { description: "Перезвоним, уточним детали и пришлём смету" });
            reset(DEFAULT_VALUES);
            onSuccess?.();
         } else {
            toast.error(result.error || "Не получилось отправить. Попробуйте ещё раз");
         }
      } catch (error) {
         console.error(error);
         toast.error("Не получилось отправить. Попробуйте позже или позвоните нам");
      }
   };

   return (
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="relative grid gap-6">
         <div className="grid gap-5 sm:grid-cols-2">
            <Field id={id("name")} label="Ваше имя" error={errors.name?.message}>
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

         <div className="grid gap-5 md:grid-cols-3">
            {SELECTS.map(({ name, label, options }) => (
               <Field key={name} id={id(name)} label={label} error={errors[name]?.message}>
                  <Controller
                     control={control}
                     name={name}
                     render={({ field }) => (
                        <NativeSelect
                           id={id(name)}
                           options={options.map((option) => option.value)}
                           value={field.value}
                           onChange={field.onChange}
                           onBlur={field.onBlur}
                           ref={field.ref}
                           {...invalidProps(id(name), errors[name]?.message)}
                        />
                     )}
                  />
               </Field>
            ))}
         </div>

         <fieldset className="grid gap-3">
            <legend className="mb-3 text-sm font-medium text-foreground">Дополнительно</legend>
            <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
               {EXTRAS.map(({ name, label }) => (
                  <CheckboxField key={name} control={control} name={`extras.${name}`}>
                     {label}
                  </CheckboxField>
               ))}
            </div>
         </fieldset>

         <div className="h-px bg-border" />

         <ConsentField control={control} name="consent" id={id("consent")} error={errors.consent?.message} />

         <SubmitButton pending={isSubmitting}>Рассчитать стоимость</SubmitButton>

         <Honeypot registration={register("honeypot")} />
      </form>
   );
}
