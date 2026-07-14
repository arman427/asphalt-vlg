import { cn } from "@/lib/utils";
import { HeaderMenu } from "./header-menu";
import { DialogModal } from "./Dialog";
import Image from "next/image";
import { NavItem } from "@/constants/header-link-data";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { HEADER_DROPDOWN_DATA } from "@/constants/header-dropdown-data";
import Link from "next/link";

interface Props {
   className?: string
   filteredMenu: NavItem[];
}

export function FixedHeader({ className, filteredMenu }: Props) {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [dialogOpen, setDialogOpen] = useState(false);
   const [isVisible, setIsVisible] = useState(false);
   const [isPricesOpen, setIsPricesOpen] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 200) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

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


   return (
      <>
         <div
            className={cn(
               "fixed top-0 left-0 w-full z-50 bg-background shadow-lg transition-all duration-300 ease-in-out",
               isVisible
                  ? "translate-y-0 opacity-100 pointer-events-auto"
                  : "-translate-y-full opacity-0 pointer-events-none",
               className
            )}
         >
            <div className="flex flex-nowrap justify-between items-center gap-4 p-3 max-w-[1400px] mx-auto w-full">

               <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="relative w-10 h-10 sm:w-16 sm:h-16 shrink-0">
                     <Image
                        src="/logotip.svg"
                        alt="Логотип"
                        fill
                        className="object-contain"
                     />
                  </div>
                  <div className="">
                     <p className="uppercase text-lg sm:text-xl lg:text-2xl font-semibold font-title tracking-wider leading-none">Асфальт</p>
                     <p className="uppercase text-[8px] sm:text-[10px] tracking-tight mt-1 opacity-90">Качество. Надежность. Гарантия.</p>
                  </div>
               </div>

               <div className="hidden lg:block flex-1 max-w-4xl px-4">
                  <HeaderMenu filteredMenu={filteredMenu} isFixed={false} />
               </div>

               <DialogModal open={dialogOpen} handleClose={() => setDialogOpen(false)} />

               <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                     onClick={() => setDialogOpen(true)}
                     className="hidden md:block bg-foreground text-background h-10 sm:h-12 px-5 uppercase text-xs font-medium tracking-wider cursor-pointer relative group overflow-hidden shrink-0"
                  >
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
         </div>
         {isMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-70 bg-[#e7a63e] flex flex-col">
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
            </div >
         )
         }
      </>
   );
}