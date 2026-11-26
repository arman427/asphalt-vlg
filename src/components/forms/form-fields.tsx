"use client";

import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues, UseFormRegisterReturn } from "react-hook-form";
import { IMaskInput } from "react-imask";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { controlClass } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { LEGAL } from "@/constants/site";
import { cn } from "@/lib/utils";

export const errorId = (id: string) => `${id}-error`;

interface FieldProps {
   id: string;
   label: string;
   error?: string;
   optional?: boolean;
   className?: string;
   children: ReactNode;
}

/** Подпись сверху, поле, ошибка снизу */
export function Field({ id, label, error, optional, className, children }: FieldProps) {
   return (
      <div className={cn("flex min-w-0 flex-col gap-2", className)}>
         <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
            {optional && <span className="font-normal text-faint"> — необязательно</span>}
         </label>
         {children}
         <FieldError id={errorId(id)} message={error} />
      </div>
   );
}

export function FieldError({ id, message }: { id?: string; message?: string }) {
   if (!message) return null;
   return (
      <p id={id} role="alert" className="text-[13px] leading-5 text-destructive">
         {message}
      </p>
   );
}

/** aria-атрибуты для поля с ошибкой */
export const invalidProps = (id: string, error?: string) =>
   error ? { "aria-invalid": true as const, "aria-describedby": errorId(id) } : {};

interface PhoneInputProps<T extends FieldValues> {
   control: Control<T>;
   name: FieldPath<T>;
   id: string;
   error?: string;
}

export function PhoneInput<T extends FieldValues>({ control, name, id, error }: PhoneInputProps<T>) {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field }) => (
            <IMaskInput
               id={id}
               mask="+{7} (000) 000-00-00"
               value={field.value ?? ""}
               onAccept={(value: string) => field.onChange(value)}
               onBlur={field.onBlur}
               inputRef={field.ref}
               type="tel"
               inputMode="tel"
               autoComplete="tel"
               placeholder="+7 (900) 000-00-00"
               className={cn(controlClass, "h-11 font-mono tabular-nums placeholder:font-sans")}
               {...invalidProps(id, error)}
            />
         )}
      />
   );
}

interface CheckboxFieldProps<T extends FieldValues> {
   control: Control<T>;
   name: FieldPath<T>;
   children: ReactNode;
   invalid?: boolean;
   describedBy?: string;
   className?: string;
}

export function CheckboxField<T extends FieldValues>({
   control,
   name,
   children,
   invalid,
   describedBy,
   className,
}: CheckboxFieldProps<T>) {
   return (
      <Controller
         control={control}
         name={name}
         render={({ field }) => (
            <label className={cn("flex cursor-pointer items-start gap-3 text-[15px] leading-5 select-none", className)}>
               <Checkbox
                  ref={field.ref}
                  checked={Boolean(field.value)}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  aria-invalid={invalid || undefined}
                  aria-describedby={describedBy}
               />
               <span>{children}</span>
            </label>
         )}
      />
   );
}

interface ConsentFieldProps<T extends FieldValues> {
   control: Control<T>;
   name: FieldPath<T>;
   id: string;
   error?: string;
}

/** Обязательное согласие на обработку персональных данных — по умолчанию не отмечено */
export function ConsentField<T extends FieldValues>({ control, name, id, error }: ConsentFieldProps<T>) {
   const linkClass =
      "text-brand-ink underline decoration-brand-ink/30 underline-offset-3 transition-colors hover:decoration-brand-ink";

   return (
      <div className="flex flex-col gap-2">
         <CheckboxField
            control={control}
            name={name}
            invalid={Boolean(error)}
            describedBy={error ? errorId(id) : undefined}
            className="text-sm leading-5 text-subtle"
         >
            Даю{" "}
            <Link href={LEGAL.consent} target="_blank" className={linkClass}>
               согласие на обработку персональных данных
            </Link>{" "}
            и принимаю{" "}
            <Link href={LEGAL.policy} target="_blank" className={linkClass}>
               политику конфиденциальности
            </Link>
         </CheckboxField>
         <FieldError id={errorId(id)} message={error} />
      </div>
   );
}

export function Honeypot({ registration }: { registration: UseFormRegisterReturn }) {
   return (
      <input
         type="text"
         tabIndex={-1}
         autoComplete="off"
         aria-hidden="true"
         className="pointer-events-none absolute -left-[9999px] size-px opacity-0"
         {...registration}
      />
   );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
   return (
      <button type="submit" disabled={pending} className={buttonVariants({ size: "lg", className: "w-full" })}>
         {pending ? (
            <>
               <Spinner />
               Отправляем
            </>
         ) : (
            children
         )}
      </button>
   );
}
