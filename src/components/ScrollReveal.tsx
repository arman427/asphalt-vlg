"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Одна общая анимация появления при прокрутке: элементы с data-reveal
 * поднимаются на 12px и проявляются. При prefers-reduced-motion ничего не двигается.
 */
export function ScrollReveal() {
   const pathname = usePathname();

   useGSAP(
      () => {
         const mm = gsap.matchMedia();

         mm.add("(prefers-reduced-motion: no-preference)", () => {
            const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
            if (!items.length) return;

            gsap.set(items, { autoAlpha: 0, y: 12 });

            ScrollTrigger.batch(items, {
               start: "top 92%",
               once: true,
               onEnter: (batch) =>
                  gsap.to(batch, {
                     autoAlpha: 1,
                     y: 0,
                     duration: 0.5,
                     ease: "power3.out",
                     stagger: 0.05,
                     overwrite: true,
                  }),
            });
         });

         return () => mm.revert();
      },
      { dependencies: [pathname], revertOnUpdate: true }
   );

   return null;
}
