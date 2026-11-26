import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonCva = cva(
   "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent font-medium whitespace-nowrap outline-none select-none transition-[background-color,border-color,color,transform] duration-150 ease-brand focus-visible:ring-3 focus-visible:ring-brand/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0",
   {
      variants: {
         variant: {
            brand: "bg-brand text-foreground hover:bg-brand-hover",
            dark: "bg-foreground text-card hover:bg-foreground/88",
            outline: "border-input bg-card text-foreground hover:bg-raised",
            ghost: "text-subtle hover:bg-raised hover:text-foreground",
            "outline-dark":
               "border-chalk/25 text-chalk hover:border-chalk/40 hover:bg-chalk/8 focus-visible:ring-offset-asphalt",
         },
         size: {
            sm: "h-9 px-3.5 text-sm",
            default: "h-10 px-4 text-[15px]",
            lg: "h-12 px-5 text-base",
            icon: "size-10",
         },
      },
      defaultVariants: {
         variant: "brand",
         size: "default",
      },
   }
)

/** Классы кнопки, прогнанные через tailwind-merge: вариант перекрывает базовый border-transparent */
const buttonVariants = (props?: Parameters<typeof buttonCva>[0]) => cn(buttonCva(props))

function Button({
   className,
   variant,
   size,
   ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonCva>) {
   return (
      <ButtonPrimitive
         data-slot="button"
         className={buttonVariants({ variant, size, className })}
         {...props}
      />
   )
}

export { Button, buttonVariants }
