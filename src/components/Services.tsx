"use client";

import { cn } from "@/lib/utils"
import { Container } from "./container";
import { SERVICES_CARD } from "@/constants/services-card-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface Props {
   className?: string
}

gsap.registerPlugin(ScrollTrigger);

export function Services({ className }: Props) {
   useGSAP(() => {
      gsap.set(".service-card", {
         opacity: 0,
         clipPath: "inset(0% 100% 0% 0%)",
      });

      ScrollTrigger.batch(".service-card", {
         start: "top 85%",
         once: true,
         onEnter: (batch) => {
            gsap.to(batch, {
               opacity: 1,
               clipPath: "inset(0% 0% 0% 0%)",
               duration: 1,
               ease: "power3.out",
               stagger: 0.10,
            });
         },
      });
   })

   return (
      <div className="services pb-30 w-full bg-[url('/yslygi_img.png')] bg-cover bg-no-repeat relative" id="yslygi">
         <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/30 to-transparent" />
         <Container className={cn("my-20", className)}>
            <h1 className="relative z-30 uppercase text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider max-w-105 text-center mx-auto pt-20 mb-10">Наши услуги</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 mt-10">
               {SERVICES_CARD.map(({ id, title, description, icon: Icon }) => (
                  <div
                     key={id}
                     className="group service-card relative z-50 flex flex-col lg:flex-row items-start gap-4 p-6 text-white bg-black/30 backdrop-blur-md border-dashed border border-white/40"
                  >
                     <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10">
                        <Icon className="w-7 h-7 text-white" />
                     </div>
                     <div className="text-left">
                        <h3 className="font-semibold text-lg mb-1 text-white uppercase">{title}</h3>
                        <p className="text-sm text-white/70 leading-relaxed">{description}</p>
                     </div>
                  </div>
               ))}
            </div>
         </Container>
      </div>
   );
}