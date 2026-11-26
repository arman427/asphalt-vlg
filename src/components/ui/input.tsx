import * as React from "react"

import { cn } from "@/lib/utils"

/** Общий вид полей ввода: инпут, textarea, select */
export const controlClass =
   "w-full min-w-0 rounded-lg border border-input bg-card px-3.5 text-[15px] text-foreground outline-none transition-[border-color,box-shadow] duration-150 ease-brand placeholder:text-faint/80 hover:border-foreground/30 focus-visible:border-brand-ink focus-visible:ring-3 focus-visible:ring-brand/35 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/15"

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
   return (
      <input
         type={type}
         data-slot="input"
         className={cn(controlClass, "h-11", className)}
         {...props}
      />
   )
}

export { Input }
