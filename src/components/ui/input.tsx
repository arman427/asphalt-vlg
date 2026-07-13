import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
   label?: string
}

function Input({ className, type, label, id, placeholder, ...props }: InputProps) {
   const inputId = id || React.useId()

   return (
      <div className="relative w-full pt-4">
         <InputPrimitive
            id={inputId}
            type={type}
            placeholder={placeholder || " "} // Важно: пробел нужен для работы селектора placeholder-shown
            data-slot="input"
            className={cn(
               // Базовые стили: убираем border, оставляем только нижний border-b
               "peer h-8 w-full min-w-0 border-b border-input bg-transparent px-0 py-4 text-base transition-all outline-none md:text-lg",
               // Состояния фокуса, валидации и disabled
               "focus-visible:border-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive",
               className
            )}
            {...props}
         />

         {label && (
            <label
               htmlFor={inputId}
               className={cn(
                  "absolute left-0 top-5 text-base text-muted-foreground transition-all duration-200 ease-out origin-top-left pointer-events-none",
                  // Анимация при фокусе ИЛИ когда инпут не пустой (благодаря placeholder=" ")
                  "peer-focus:-translate-y-5 peer-focus:scale-85 peer-focus:text-ring",
                  "peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-85",
                  // Адаптив под размер шрифта инпута
                  "md:text-sm"
               )}
            >
               {label}
            </label>
         )}

         {/* Дополнительная линия для красивой анимации фокуса (разъезжается из центра) */}
         <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-foreground/60 transition-transform duration-200 ease-out peer-focus:scale-x-100" />
      </div>
   )
}

export { Input };