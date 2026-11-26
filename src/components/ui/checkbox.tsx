"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
   return (
      <CheckboxPrimitive.Root
         data-slot="checkbox"
         className={cn(
            "peer relative flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[5px] border border-input bg-card text-foreground outline-none transition-[background-color,border-color,box-shadow] duration-150 ease-brand hover:border-foreground/35 focus-visible:ring-3 focus-visible:ring-brand/45 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 data-checked:border-brand data-checked:bg-brand",
            className
         )}
         {...props}
      >
         <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="grid place-content-center text-current [&>svg]:size-3.5"
         >
            <CheckIcon strokeWidth={2.5} />
         </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
   )
}

export { Checkbox }
