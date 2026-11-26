import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface EyebrowProps {
   children: ReactNode;
   tone?: "light" | "dark";
   className?: string;
}

/** Подпись секции с пунктиром разметки */
export function Eyebrow({ children, tone = "light", className }: EyebrowProps) {
   return (
      <p
         className={cn(
            "flex items-center gap-3 text-sm font-medium",
            tone === "dark" ? "text-chalk-subtle" : "text-subtle",
            className
         )}
      >
         <span aria-hidden className="road-mark" />
         {children}
      </p>
   );
}

interface SectionHeadingProps {
   eyebrow: string;
   title: ReactNode;
   id?: string;
   tone?: "light" | "dark";
   className?: string;
}

export function SectionHeading({ eyebrow, title, id, tone = "light", className }: SectionHeadingProps) {
   return (
      <div className={className}>
         <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
         <h2
            id={id}
            className={cn(
               "mt-4 font-display text-[34px] leading-[1.05] text-balance md:text-5xl",
               tone === "dark" ? "text-chalk" : "text-foreground"
            )}
         >
            {title}
         </h2>
      </div>
   );
}
