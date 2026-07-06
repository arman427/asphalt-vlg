"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"
import { Container } from "./container";
import Image from "next/image";
import { NAV_LINKS } from "@/constants/header-link-data";
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { HeaderMenu } from "./header-menu";

interface Props {
   className?: string
   itsPrices?: boolean
}

export function Header({ className, itsPrices }: Props) {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const filteredMenu = itsPrices
      ? NAV_LINKS.filter(item => item.id === 'main' || item.id === "prices")
      : NAV_LINKS;

   useGSAP(() => {
      gsap.from(".welcome-image", {
         clipPath: "inset(0% 0% 100% 100%)",
         duration: 1.4,
         ease: "expo.out",
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
         duration: 0.7,
         translateX: -10,
         ease: "power3.out",
         delay: 0.4,
         stagger: 0.07
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
      <header className={cn("bg-accent min-h-screen lg:h-screen py-3 sm:py-5 flex", className)}>
         <Container className="border border-black/15 flex-1 flex flex-col p-[1.5px]">

            <div className="flex flex-wrap justify-between items-center gap-3 header p-3 border-t border-x border-dashed border-black/15">
               <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative w-10 h-10 sm:w-20 sm:h-20 shrink-0">
                     <Image
                        src="/logotip.svg"
                        alt="Логотип"
                        fill
                        className="object-contain header-logo"
                     />
                  </div>
                  <div>
                     <p className="uppercase text-xl sm:text-2xl lg:text-3xl font-semibold font-title tracking-wider header-logo-title">Асфальт</p>
                     <p className="uppercase text-[10px] sm:text-xs lg:text-sm header-logo-subTitle">Качество. Надежность. Гарантия.</p>
                  </div>
               </div>

               <HeaderMenu filteredMenu={filteredMenu} />

               <div className="flex items-center gap-2 sm:gap-3">
                  <button className="bg-foreground text-background h-10 sm:h-13 px-4 sm:w-35 sm:px-0 uppercase text-xs sm:text-sm tracking-wider cursor-pointer relative group overflow-hidden header-button">
                     <span className="relative z-10 group-hover:text-black duration-500 ease-in-out">
                        Рассчитать
                     </span>
                     <div className="absolute w-full h-full bg-white transition-all duration-500 ease -left-full top-0 group-hover:left-0"></div>
                  </button>

                  <button
                     onClick={() => setIsMenuOpen((v) => !v)}
                     aria-label="Открыть меню"
                     className="lg:hidden relative flex flex-col items-center justify-center gap-1.5 w-10 h-10 bg-foreground shrink-0"
                  >
                     <span className={cn("block w-5 h-0.5 bg-background transition-all duration-300", isMenuOpen && "rotate-45 translate-y-2")}></span>
                     <span className={cn("block w-5 h-0.5 bg-background transition-all duration-300", isMenuOpen && "opacity-0")}></span>
                     <span className={cn("block w-5 h-0.5 bg-background transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-2")}></span>
                  </button>
               </div>
            </div>

            {isMenuOpen && (
               <nav className="lg:hidden border-x border-b border-dashed border-black/15">
                  <ul className="flex flex-col text-sm">
                     {filteredMenu.map((item) => (
                        <li key={item.id} className="bg-[#e7a63e] border-t border-dashed border-black/15">
                           <a
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block uppercase py-3 px-5 transition-all hover:bg-[#faa928] tracking-wide"
                           >
                              {item.title}
                           </a>
                        </li>
                     ))}
                  </ul>
               </nav>
            )}

            <div className="border border-dashed border-black/15 flex flex-col lg:grid lg:grid-cols-[1fr_1fr] w-full min-h-0 flex-1">
               <div className="px-4 sm:px-6 lg:px-0 lg:ml-10 lg:border-r border-dashed border-black/15 flex flex-col justify-center lg:justify-between gap-6 py-8 lg:py-0">
                  <h1 className="uppercase pt-0 lg:pt-15 mr-0 lg:mr-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold font-title tracking-wider welcome-title xl:leading-20">
                     КАЧЕСТВЕННЫЙ АСФАЛЬТ ДЛЯ ДВОРОВ, ДОРОГ И ПАРКОВОК
                  </h1>
                  <div className="max-w-full sm:max-w-80 lg:max-w-70">
                     <p className="uppercase text-xs sm:text-sm font-medium mb-4 sm:mb-5">
                        <span className="block welcome-line">Современная техника, проверенные</span>
                        <span className="block welcome-line">технологии укладки и гарантия на</span>
                        <span className="block welcome-line">каждый объект.</span>
                     </p>
                     <a
                        href="tel:+79610599262"
                        className="inline-block bg-foreground text-background h-12 sm:h-13 w-full uppercase text-xs sm:text-sm tracking-wider cursor-pointer relative group overflow-hidden mb-6 lg:mb-10 welcome-button"
                     >
                        <span className="absolute left-3 bottom-1 z-10 group-hover:text-black duration-500 ease-in-out">
                           Связаться
                        </span>
                        <img src="/Button_logo.svg" className="absolute right-0 top-0 z-10 rotate-45 w-5 h-5" />
                        <div className="absolute w-full h-full bg-white transition-all duration-500 ease -left-full top-0 group-hover:left-0"></div>
                     </a>
                  </div>
               </div>
               <div className="relative m-1 h-64 sm:h-80 md:h-96 lg:h-auto">
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
};