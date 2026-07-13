import * as React from "react"

import { cn } from "@/lib/utils"

interface TextareaProps extends React.ComponentProps<"textarea"> {
   label?: string
}

function Textarea({ className, label, id, placeholder, ...props }: TextareaProps) {
   const textareaId = id || React.useId()

   return (
      <div className="relative w-full pt-4">
         <textarea
            id={textareaId}
            placeholder={placeholder || " "} // Пробел для работы :placeholder-shown
            data-slot="textarea"
            className={cn(
               // field-sizing-content отвечает за автовысоту, убираем border, кроме border-b
               "peer flex field-sizing-content  w-full resize-none border-b border-input bg-transparent px-0 py-1 text-base transition-all outline-none md:text-lg",
               // Состояния (убрали внешнее кольцо focus-visible)
               "disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
               className
            )}
            {...props}
         />

         {label && (
            <label
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

         {/* Линия, которая всегда прижата к низу (bottom-0) и растет слева направо */}
         <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-foreground/60 transition-transform duration-200 ease-out peer-focus:scale-x-100" />
      </div>
   )
}

export { Textarea }