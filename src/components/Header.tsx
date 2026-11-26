"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Logo } from "./Logo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { buttonVariants } from "./ui/button";
import { EstimateButton } from "./estimate/EstimateButton";
import { NAV_LINKS } from "@/constants/header-link-data";
import { HEADER_DROPDOWN_DATA } from "@/constants/header-dropdown-data";
import { SITE } from "@/constants/site";

const navLinkClass =
   "inline-flex h-9 items-center gap-1 rounded-md px-3 text-[15px] text-subtle outline-none transition-colors duration-150 ease-brand hover:bg-raised hover:text-foreground focus-visible:ring-3 focus-visible:ring-brand/45 aria-[current=page]:text-foreground";

export function Header() {
   const pathname = usePathname();
   const [menuOpen, setMenuOpen] = useState(false);
   const [pricesOpen, setPricesOpen] = useState(false);
   const [mobilePricesOpen, setMobilePricesOpen] = useState(false);

   const isPricesPage = pathname.startsWith("/tseni");
   const closeMenu = () => setMenuOpen(false);

   useEffect(() => {
      if (!menuOpen) return;

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKeyDown = (event: KeyboardEvent) => {
         if (event.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKeyDown);

      return () => {
         document.body.style.overflow = previousOverflow;
         window.removeEventListener("keydown", onKeyDown);
      };
   }, [menuOpen]);

   return (
      <header className="sticky top-0 z-40 border-b border-border bg-background">
         <Container className="flex h-16 items-center gap-4">
            <Logo />

            <nav aria-label="Основная навигация" className="ml-6 hidden lg:block">
               <ul className="flex items-center gap-0.5">
                  {NAV_LINKS.map((item) =>
                     item.id === "prices" ? (
                        <li key={item.id}>
                           <Popover open={pricesOpen} onOpenChange={setPricesOpen}>
                              <PopoverTrigger
                                 className={cn(navLinkClass, "group cursor-pointer data-popup-open:bg-raised")}
                                 aria-current={isPricesPage ? "page" : undefined}
                              >
                                 {item.title}
                                 <ChevronDown
                                    aria-hidden
                                    size={16}
                                    strokeWidth={1.5}
                                    className="text-faint transition-transform duration-150 ease-brand group-data-popup-open:rotate-180"
                                 />
                              </PopoverTrigger>
                              <PopoverContent align="start" sideOffset={8} className="w-80 gap-0 rounded-xl p-1.5 shadow-[0_8px_24px_rgb(29_27_24/0.08)] ring-border">
                                 {HEADER_DROPDOWN_DATA.map((link) => (
                                    <Link
                                       key={link.id}
                                       href={link.href}
                                       onClick={() => setPricesOpen(false)}
                                       aria-current={pathname === link.href ? "page" : undefined}
                                       className="rounded-lg px-3 py-2.5 text-[15px] leading-5 text-subtle outline-none transition-colors duration-150 hover:bg-raised hover:text-foreground focus-visible:bg-raised aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                                    >
                                       {link.title}
                                    </Link>
                                 ))}
                              </PopoverContent>
                           </Popover>
                        </li>
                     ) : (
                        <li key={item.id}>
                           <Link href={item.href} className={navLinkClass}>
                              {item.title}
                           </Link>
                        </li>
                     )
                  )}
               </ul>
            </nav>

            <div className="ml-auto flex items-center gap-2">
               <a
                  href={SITE.phoneHref}
                  className="hidden h-9 items-center rounded-md px-3 font-mono text-sm text-foreground tabular-nums transition-colors duration-150 hover:bg-raised xl:inline-flex"
               >
                  {SITE.phone}
               </a>
               <EstimateButton className="hidden sm:inline-flex" />
               <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Открыть меню"
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  className={buttonVariants({ variant: "ghost", size: "icon", className: "text-foreground lg:hidden" })}
               >
                  <Menu size={22} strokeWidth={1.5} />
               </button>
            </div>
         </Container>

         {menuOpen && (
            <div
               id="mobile-menu"
               role="dialog"
               aria-modal="true"
               aria-label="Меню"
               className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
            >
               <div className="border-b border-border">
                  <Container className="flex h-16 items-center justify-between">
                     <Logo onClick={closeMenu} />
                     <button
                        type="button"
                        onClick={closeMenu}
                        aria-label="Закрыть меню"
                        autoFocus
                        className={buttonVariants({ variant: "ghost", size: "icon", className: "text-foreground" })}
                     >
                        <X size={22} strokeWidth={1.5} />
                     </button>
                  </Container>
               </div>

               <nav aria-label="Мобильная навигация" className="flex-1 overflow-y-auto">
                  <Container>
                     <ul className="divide-y divide-border">
                        <li>
                           <Link href="/" onClick={closeMenu} className="flex h-14 items-center text-lg">
                              Главная
                           </Link>
                        </li>
                        {NAV_LINKS.map((item) =>
                           item.id === "prices" ? (
                              <li key={item.id}>
                                 <button
                                    type="button"
                                    onClick={() => setMobilePricesOpen((open) => !open)}
                                    aria-expanded={mobilePricesOpen}
                                    className="flex h-14 w-full items-center justify-between text-left text-lg"
                                 >
                                    {item.title}
                                    <ChevronDown
                                       aria-hidden
                                       size={20}
                                       strokeWidth={1.5}
                                       className={cn(
                                          "text-faint transition-transform duration-150 ease-brand",
                                          mobilePricesOpen && "rotate-180"
                                       )}
                                    />
                                 </button>
                                 {mobilePricesOpen && (
                                    <ul className="grid gap-1 pb-4">
                                       {HEADER_DROPDOWN_DATA.map((link) => (
                                          <li key={link.id}>
                                             <Link
                                                href={link.href}
                                                onClick={closeMenu}
                                                aria-current={pathname === link.href ? "page" : undefined}
                                                className="flex min-h-11 items-center rounded-lg px-3 text-[15px] text-subtle aria-[current=page]:bg-raised aria-[current=page]:text-foreground"
                                             >
                                                {link.title}
                                             </Link>
                                          </li>
                                       ))}
                                    </ul>
                                 )}
                              </li>
                           ) : (
                              <li key={item.id}>
                                 <Link href={item.href} onClick={closeMenu} className="flex h-14 items-center text-lg">
                                    {item.title}
                                 </Link>
                              </li>
                           )
                        )}
                     </ul>
                  </Container>
               </nav>

               <div className="border-t border-border">
                  <Container className="grid gap-3 py-5">
                     <a
                        href={SITE.phoneHref}
                        className={buttonVariants({ variant: "outline", size: "lg", className: "font-mono tabular-nums" })}
                     >
                        {SITE.phone}
                     </a>
                     <EstimateButton size="lg" onClick={closeMenu} />
                  </Container>
               </div>
            </div>
         )}
      </header>
   );
}
