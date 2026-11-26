import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { controlClass } from "./input"

interface NativeSelectProps extends Omit<React.ComponentProps<"select">, "children"> {
   options: readonly string[]
   placeholder?: string
}

/** Нативный select: на телефоне открывает системный список, внутри диалога не конфликтует с порталами */
function NativeSelect({ className, options, placeholder = "Выберите", value, ...props }: NativeSelectProps) {
   const isEmpty = value === "" || value === undefined

   return (
      <div className="relative">
         <select
            data-slot="native-select"
            value={value}
            className={cn(
               controlClass,
               "h-11 cursor-pointer appearance-none truncate pr-10 [&>option]:text-foreground",
               isEmpty && "text-faint",
               className
            )}
            {...props}
         >
            <option value="" disabled>
               {placeholder}
            </option>
            {options.map((option) => (
               <option key={option} value={option}>
                  {option}
               </option>
            ))}
         </select>
         <ChevronDown
            aria-hidden
            size={16}
            strokeWidth={1.5}
            className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-faint"
         />
      </div>
   )
}

export { NativeSelect }
