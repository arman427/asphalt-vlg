"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"
import { Container } from "./container";
import Image from "next/image";
import { NAV_LINKS } from "@/constants/header-link-data";
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { HeaderMenu } from "./header-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { HEADER_DROPDOWN_DATA } from "@/constants/header-dropdown-data";
import Link from "next/link";
import { DialogModal } from "./Dialog";
import { FixedHeader } from "./Fixed-Header";
import { X } from "lucide-react";
import { BackToTop } from "./backToTop";
import { FixedFeedBack } from "./Fixed-Feedback";

interface Props {
   className?: string
   itsPrices?: boolean
}

export function Header({ className, itsPrices }: Props) {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [dialogOpen, setDialogOpen] = useState(false);
   const [isAnimate, setIsAnimate] = useState(false);
   const [isPricesOpen, setIsPricesOpen] = useState(false);

   const handleTouch = () => {
      setIsAnimate(true);
      setTimeout(() => {
         setIsAnimate(false);
      }, 500);
   };

   useEffect(() => {
      if (isMenuOpen) {
         document.body.style.overflow = "hidden"
      } else {
         document.body.style.overflow = ""
      }

      return () => {
         document.body.style.overflow = ""
      }
   }, [isMenuOpen]);

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
         <BackToTop />
         <FixedFeedBack />
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

               <DialogModal open={dialogOpen} handleClose={() => setDialogOpen(false)} />

               <div className="flex items-center gap-2 sm:gap-3">
                  <button onClick={() => setDialogOpen(true)} className="bg-foreground text-background h-10 sm:h-13 px-4 sm:w-35 sm:px-0 uppercase text-xs sm:text-sm tracking-wider cursor-pointer relative group overflow-hidden header-button">
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

            <FixedHeader filteredMenu={filteredMenu} />

            {isMenuOpen && (
               <div className="lg:hidden fixed inset-0 z-300 bg-[#e7a63e] flex flex-col">
                  {/* Шапка с кнопкой закрытия */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-dashed border-black/15">
                     <span className="text-sm font-medium uppercase tracking-wide">Меню</span>
                     <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-1.5 transition-all hover:bg-[#faa928] rounded"
                        aria-label="Закрыть меню"
                     >
                        <X className="w-5 h-5" />
                     </button>
                  </div>

                  {/* Навигация */}
                  <nav className="flex-1 overflow-y-auto">
                     <ul className="flex flex-col text-sm">
                        {filteredMenu?.map((item) => {
                           if (item.id === "prices") {
                              return (
                                 <li key={item.id} className="border-b border-dashed border-black/15">
                                    <button
                                       onClick={() => setIsPricesOpen((v) => !v)}
                                       className="w-full text-left uppercase py-4 px-5 transition-all hover:bg-[#faa928] tracking-wide cursor-pointer flex justify-between items-center"
                                    >
                                       {item.title}
                                       <span className={cn("text-xs transition-transform duration-200", isPricesOpen && "rotate-180")}>▼</span>
                                    </button>
                                    {isPricesOpen && (
                                       <ul className="border-t border-dashed border-black/15">
                                          {HEADER_DROPDOWN_DATA.map((drop, i) => (
                                             <li
                                                key={drop.id}
                                                className={cn(i < HEADER_DROPDOWN_DATA.length - 1 && "border-b border-dashed border-black/15")}
                                             >
                                                <Link
                                                   href={drop.href}
                                                   scroll={false}
                                                   onClick={() => { setIsPricesOpen(false); setIsMenuOpen(false); }}
                                                   className="block py-3 px-8 text-sm transition-all hover:bg-[#faa928]"
                                                >
                                                   {drop.title}
                                                </Link>
                                             </li>
                                          ))}
                                       </ul>
                                    )}
                                 </li>
                              );
                           }

                           return (
                              <li key={item.id} className="border-b border-dashed border-black/15">
                                 <a
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block uppercase py-4 px-5 transition-all hover:bg-[#faa928] tracking-wide"
                                 >
                                    {item.title}
                                 </a>
                              </li>
                           );
                        })}
                     </ul>
                  </nav>
               </div>
            )}

            <div className="border border-dashed border-black/15 flex flex-col lg:grid lg:grid-cols-[1fr_1fr] w-full min-h-0 flex-1">
               <div className="px-4 sm:px-6 lg:px-0 lg:ml-10 lg:border-r border-dashed border-black/15 flex flex-col justify-center lg:justify-between gap-6 py-8 lg:py-0">
                  <h1 className="uppercase pt-0 lg:pt-15 mr-0 lg:mr-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold font-title tracking-wider welcome-title xl:leading-20">
                     КАЧЕСТВЕННЫЙ АСФАЛЬТ ДЛЯ ДВОРОВ, ДОРОГ И ПАРКОВОК
                  </h1>
                  <div className="max-w-full sm:max-w-80">
                     <p className="uppercase text-xs sm:text-sm font-medium mb-4 sm:mb-5">
                        <span className="block welcome-line">Современная техника, проверенные</span>
                        <span className="block welcome-line">технологии укладки и гарантия на</span>
                        <span className="block welcome-line">каждый объект.</span>
                     </p>
                     <a
                        href="tel:+79610599262"
                        onTouchStart={handleTouch}
                        className="inline-block bg-foreground text-background h-12 sm:h-13 w-full uppercase text-xs sm:text-sm tracking-wider cursor-pointer relative group overflow-hidden mb-6 lg:mb-10 welcome-button"
                     >
                        <span className={`absolute left-3 bottom-1 z-10 duration-500 ease-in-out group-hover:text-foreground ${isAnimate ? 'text-foreground' : ''}`}>
                           Связаться
                        </span>
                        <img src="/Button_logo.svg" className="absolute right-0 top-0 z-10 rotate-45 w-5 h-5" />
                        <div className={`absolute w-full h-full bg-white transition-all duration-500 ease -left-full top-0 group-hover:left-0 ${isAnimate ? 'left-0' : ''}`}></div>
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
      </header >
   );
};