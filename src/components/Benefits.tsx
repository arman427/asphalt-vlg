"use client";

import { cn } from "@/lib/utils"
import { Container } from "./container";
import { BENEFITS_CARD_DATA } from "@/constants/benefits-card-data";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

interface Props {
   className?: string
}

gsap.registerPlugin(ScrollTrigger, SplitText);

export function Benefits({ className }: Props) {
   useGSAP(() => {
      const split = new SplitText(".benefits-description", {
         type: "lines",
         linesClass: "split-line",
      });

      gsap.from(".benefits-title", {
         clipPath: "inset(0% 0% 100% 0%)",
         translateY: 50,
         duration: 0.5,
         ease: "circ.inOut",
         stagger: 0.15,
         scrollTrigger: {
            trigger: ".benefits-title",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
         }
      });

      const splits: SplitText[] = [];

      gsap.utils.toArray<HTMLElement>(".benefits-card").forEach((card) => {
         const title = card.querySelector(".benefits-card-title");
         const icon = card.querySelector(".benefits-card-icon");
         const description = card.querySelector(".benefits-description");

         const split = new SplitText(description, {
            type: "lines",
            linesClass: "split-line",
         });
         splits.push(split);

         const tl = gsap.timeline({
            scrollTrigger: {
               trigger: card,
               start: "top 80%",
               end: "bottom 20%",
               toggleActions: "play none none none",
            }
         });

         tl.from(card, {
            opacity: 0,
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.2,
            ease: "circ.out",
         })
            .from(title, {
               clipPath: "inset(0% 0% 100% 0%)",
               translateY: 50,
               duration: 0.5,
               ease: "circ.inOut",
            }, "-=0.6") // запускаем чуть раньше окончания предыдущей
            .from(icon, {
               scale: 0,
               duration: 0.7,
               ease: "expo.out",
            }, "-=0.1")
            .from(split.lines, {
               clipPath: "inset(0% 0% 100% 0%)",
               translateY: 30,
               duration: 0.4,
               ease: "power3.inOut",
               stagger: 0.08,
            }, "-=0.2");
      });

      return () => splits.forEach((s) => s.revert());
   });

   return (
      <Container className={cn("mb-30", className)}>
         <p className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider max-w-105 text-center mx-auto mt-20">
            <span className="block benefits-title">ГИБКИЕ РЕШЕНИЯ</span>
            <span className="block benefits-title">ДЛЯ КАЧЕСТВЕННОГО</span>
            <span className="block benefits-title">АСФАЛЬТИРОВАНИЯ</span>
         </p>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-15">
            {
               BENEFITS_CARD_DATA.map(({ id, title, description, imageUrl, icon: Icon }) => (
                  <div key={id} className="w-full h-120 bg-[#f7f7f7] flex flex-col justify-between border-dashed border border-black/5 benefits-card">
                     <div className="flex justify-between items-center">
                        <h3 className="text-xl font-medium pl-6 pt-3 whitespace-pre-line benefits-card-title">{title}</h3>
                        <Image
                           src="/Button_logo.svg"
                           alt="Иконка"
                           width={50}
                           height={50}
                           className="rotate-45 p-3"
                        />
                     </div>

                     <div className="text-center mx-auto benefits-card-icon">
                        <Image
                           src={imageUrl}
                           alt="Фотка"
                           width={300}
                           height={300}
                        />
                     </div>

                     <p className="mb-10 uppercase text-black/60 text-sm text-center mx-auto max-w-[45ch] text-balance benefits-description">{description}</p>
                  </div>
               ))
            }
         </div>
      </Container>
   );
}