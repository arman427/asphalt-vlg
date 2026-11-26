import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
   className?: string;
   tone?: "light" | "dark";
   onClick?: () => void;
}

export function Logo({ className, tone = "light", onClick }: Props) {
   return (
      <Link
         href="/"
         onClick={onClick}
         aria-label="Асфальт — на главную"
         className={cn(
            "flex shrink-0 items-center gap-3 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-brand/45",
            className
         )}
      >
         {/* Тёмный треугольник знака теряется на асфальте — там остаётся только надпись */}
         {tone === "light" && (
            <Image src="/logo-mark.png" alt="" width={44} height={30} priority className="h-[30px] w-auto" />
         )}
         <span className="flex flex-col">
            <span
               className={cn(
                  "font-display text-[22px] leading-none tracking-[0.04em] uppercase",
                  tone === "dark" ? "text-chalk" : "text-foreground"
               )}
            >
               Асфальт
            </span>
            <span className={cn("mt-1 text-xs leading-none", tone === "dark" ? "text-chalk-faint" : "text-faint")}>
               Волгоград
            </span>
         </span>
      </Link>
   );
}
