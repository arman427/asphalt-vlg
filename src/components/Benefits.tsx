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
      gsap.set(".benefits-card", {
         opacity: 0,
         translateY: 30,
      });

      ScrollTrigger.batch(".benefits-card", {
         start: "top 80%",
         once: true,
         onEnter: (batch) => {
            gsap.to(batch, {
               opacity: 1,
               translateY: 0,
               duration: 1,
               ease: "power3.out",
               stagger: 0.10,
            });
         },
      });
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