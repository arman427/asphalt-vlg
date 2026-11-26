import * as React from "react"

import { cn } from "@/lib/utils"
import { controlClass } from "./input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
   return (
      <textarea
         data-slot="textarea"
         className={cn(controlClass, "field-sizing-content min-h-28 resize-none py-3 leading-6", className)}
         {...props}
      />
   )
}

export { Textarea }
