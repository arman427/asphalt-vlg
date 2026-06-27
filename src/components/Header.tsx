"use client";

import { cn } from "@/lib/utils"
import { Container } from "./container";
import Image from "next/image";
import { NAV_LINKS } from "@/constants/header-link-data";
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface Props {
   className?: string
}

export function Header({ className }: Props) {
   useGSAP(() => {
      gsap.from(".welcome-image", {
         clipPath: "inset(100% 0% 0% 100%)",
         duration: 1,
         ease: "power3.out",
         delay: 1
      });
      gsap.from(".header-logo", {
         opacity: 0,
         clipPath: "inset(0% 0% 100% 0%)",
         duration: 1,
         ease: "power3.out",
         delay: 0.3
      });
      gsap.from(".header-button", {
         opacity: 0,
         scale: 0.7,
         duration: 1,
         ease: "circ",
         delay: 0.4
      });
      gsap.from(".header-logo-title", {
         opacity: 0,
         duration: 1,
         ease: "power3.out",
         delay: 0.3
      });
      gsap.from(".header-logo-subTitle", {
         opacity: 0,
         duration: 1,
         ease: "power3.out",
         delay: 0.5
      });
      gsap.from(".header-link", {
         opacity: 0,
         duration: 0.8,
         translateX: -5,
         ease: "power3.out",
         delay: 0.4,
         stagger: 0.1
      });
      gsap.from(".welcome-title", {
         opacity: 0,
         duration: 1.2,
         ease: "power3.out",
         delay: 1.6,
      });
      gsap.from(".welcome-line", {
         opacity: 0,
         y: 10,
         duration: 0.3,
         ease: "circ",
         stagger: 0.15,
         delay: 1.7,
      });
      gsap.from(".welcome-button", {
         opacity: 0,
         y: 20,
         duration: 0.8,
         ease: "power3.out",
         delay: 1.8,
      });
   });

   return (
      <header className={cn("bg-accent h-screen py-5 flex", className)}>
         <Container className="border border-black/15 flex-1 flex flex-col p-[1.5px]">
            <div className="flex justify-between items-center header p-3 border-t border-x border-dashed border-black/15">
               <div className="flex items-end gap-3">
                  <div className="relative w-13 h-13">
                     <Image
                        src="./Header_logo.svg"
                        alt="Логотип"
                        fill
                        className="object-contain header-logo"
                     />
                  </div>
                  <div>
                     <p className="uppercase text-3xl font-semibold font-title tracking-wider header-logo-title">Асфальт</p>
                     <p className="uppercase text-sm header-logo-subTitle">Качество. Надежность. Гарантия.</p>
                  </div>
               </div>

               <nav>
                  <ul className="flex gap-1 text-sm">
                     {NAV_LINKS.map((item) => (
                        <li key={item.id} className="bg-[#e7a63e] header-link"><a href={item.href} className="inline-block uppercase py-1.5 px-5 transition-all hover:bg-[#faa928] tracking-wide">{item.title}</a></li>
                     ))}
                  </ul>
               </nav>

               <button className="bg-foreground text-background h-13 w-35 uppercase text-sm tracking-wider cursor-pointer relative group overflow-hidden header-button">
                  <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                     Рассчитать
                  </span>
                  <div className="absolute w-full h-full bg-white transition-all duration-500 ease -left-50 top-0 group-hover:left-0"></div>
               </button>
            </div>
            <div className="border border-dashed border-black/15 grid grid-cols-[1fr_1fr] w-full min-h-0 flex-1">
               <div className="border-r border-dashed ml-10 border-black/15 flex flex-col justify-between">
                  <h1 className="uppercase pt-15 mr-10 text-7xl font-semibold font-title tracking-wider welcome-title">КАЧЕСТВЕННЫЙ АСФАЛЬТ ДЛЯ ДВОРОВ, ДОРОГ И ПАРКОВОК</h1>
                  <div className="max-w-70">
                     <p className="uppercase text-sm font-medium mb-5">
                        <span className="block welcome-line">Современная техника, проверенные</span>
                        <span className="block welcome-line">технологии укладки и гарантия на</span>
                        <span className="block welcome-line">каждый объект.</span>
                     </p>
                     <button className="bg-foreground text-background h-13 w-full uppercase text-sm tracking-wider cursor-pointer relative group overflow-hidden mb-10 welcome-button">
                        <span className="absolute left-3 bottom-1 z-10 group-hover:text-black transition-colors duration-500">
                           Узнать цены
                        </span>
                        <img src="/Button_logo.svg" className="absolute right-0 top-0 z-10 rotate-45 w-5 h-5" />
                        <div className="absolute w-full h-full bg-white transition-all duration-500 ease -left-85 top-0 group-hover:left-0"></div>
                     </button>
                  </div>
               </div>
               <div className="relative m-1">
                  <Image
                     src="/welcome.png"
                     alt="Кладка асфальта"
                     fill
                     className="object-cover welcome-image"
                  />
               </div>
            </div>
         </Container>
      </header>
   );
}