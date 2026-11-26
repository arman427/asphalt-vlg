"use client";

import { useSyncExternalStore } from "react";
import { ArrowUp, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MaskIcon } from "./MaskIcon";
import { SITE } from "@/constants/site";

const SHOW_AFTER_PX = 480;

const subscribeToScroll = (callback: () => void) => {
   window.addEventListener("scroll", callback, { passive: true });
   return () => window.removeEventListener("scroll", callback);
};

const CONTACT_LINKS = [
   { label: "Telegram", href: SITE.telegram, icon: <MaskIcon src="/telegram.svg" />, external: true },
   { label: "WhatsApp", href: SITE.whatsapp, icon: <MaskIcon src="/whatsapp.svg" />, external: true },
   {
      label: SITE.phone,
      href: SITE.phoneHref,
      icon: <Phone size={18} strokeWidth={1.5} className="mx-px" />,
      external: false,
      mono: true,
   },
];

/** Кнопки связи и «наверх» в правом нижнем углу — появляются после первого экрана */
export function FloatingActions() {
   const isVisible = useSyncExternalStore(
      subscribeToScroll,
      () => window.scrollY > SHOW_AFTER_PX,
      () => false
   );

   const scrollToTop = () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
   };

   return (
      <div
         className={cn(
            "fixed right-4 bottom-4 z-30 flex flex-col items-end gap-2 transition-[opacity,transform] duration-300 ease-brand md:right-8 md:bottom-8",
            isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
         )}
         inert={!isVisible}
      >
         <button
            type="button"
            onClick={scrollToTop}
            aria-label="Наверх"
            className="flex size-11 cursor-pointer items-center justify-center rounded-lg border border-border bg-card text-subtle shadow-[0_1px_2px_rgb(29_27_24/0.06)] outline-none transition-colors duration-150 hover:text-foreground focus-visible:ring-3 focus-visible:ring-brand/45"
         >
            <ArrowUp size={18} strokeWidth={1.5} />
         </button>

         <Popover>
            <PopoverTrigger
               aria-label="Связаться с нами"
               className="flex size-14 cursor-pointer items-center justify-center rounded-xl bg-brand text-foreground shadow-[0_8px_24px_rgb(29_27_24/0.16)] outline-none transition-[background-color,transform] duration-150 ease-brand hover:bg-brand-hover focus-visible:ring-3 focus-visible:ring-brand/45 focus-visible:ring-offset-2 active:scale-[0.97]"
            >
               <Phone size={22} strokeWidth={1.75} />
            </PopoverTrigger>
            <PopoverContent
               side="top"
               align="end"
               sideOffset={10}
               className="w-64 gap-0 rounded-xl p-1.5 shadow-[0_8px_24px_rgb(29_27_24/0.1)] ring-border"
            >
               <p className="px-3 pt-2 pb-1 text-[13px] text-faint">Связаться</p>
               {CONTACT_LINKS.map(({ label, href, icon, external, mono }) => (
                  <a
                     key={href}
                     href={href}
                     {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                     className={cn(
                        "flex h-11 items-center gap-3 rounded-lg px-3 text-[15px] text-foreground outline-none transition-colors duration-150 hover:bg-raised focus-visible:bg-raised",
                        mono && "font-mono text-sm tabular-nums"
                     )}
                  >
                     <span className="flex w-5 justify-center text-faint">{icon}</span>
                     {label}
                  </a>
               ))}
            </PopoverContent>
         </Popover>
      </div>
   );
}
