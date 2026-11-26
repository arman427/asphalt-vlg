"use client";

import { ReactNode } from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { useEstimateDialog } from "./EstimateDialogProvider";

interface Props extends VariantProps<typeof buttonVariants> {
   className?: string;
   children?: ReactNode;
   onClick?: () => void;
}

/** Кнопка, открывающая диалог расчёта стоимости */
export function EstimateButton({ className, variant, size, children = "Рассчитать стоимость", onClick }: Props) {
   const { open } = useEstimateDialog();

   return (
      <button
         type="button"
         onClick={() => {
            onClick?.();
            open();
         }}
         className={buttonVariants({ variant, size, className })}
      >
         {children}
      </button>
   );
}
