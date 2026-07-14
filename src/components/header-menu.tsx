import { NavItem } from "@/constants/header-link-data";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { HEADER_DROPDOWN_DATA } from "@/constants/header-dropdown-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface Props {
   className?: string;
   filteredMenu?: NavItem[];
   isFixed?: boolean;
}

export function HeaderMenu({ className, filteredMenu, isFixed }: Props) {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <nav className="hidden lg:block">
         <ul className="flex gap-0.5 text-sm">
            {filteredMenu?.map((item) => {
               if (item.id === "prices") {
                  return (
                     <li key={item.id} className={cn("bg-[#e7a63e]", { "header-link": !isFixed })}>
                        <Popover open={isOpen} onOpenChange={setIsOpen}>
                           <PopoverTrigger
                              className="inline-block uppercase py-1.5 px-5 transition-all hover:bg-[#faa928] tracking-wide cursor-pointer"
                           >
                              {item.title}
                           </PopoverTrigger>
                           <PopoverContent className="w-120 bg-accent rounded-none relative z-200">
                              <div className="grid gap-px">
                                 {
                                    HEADER_DROPDOWN_DATA.map((item, i) => (
                                       <Link
                                          scroll={false}
                                          href={item.href}
                                          key={item.id}
                                          onClick={() => setIsOpen(false)}
                                          className={cn("py-3 px-4 text-lg bg-[#e7a63e] transition-all hover:bg-[#faa928]", {
                                             "border-b border-dashed border-b-black/15": i < 4
                                          })}
                                       >
                                          {item.title}
                                       </Link>
                                    ))
                                 }
                              </div>
                           </PopoverContent>
                        </Popover>
                     </li>
                  )
               }

               return (
                  <li
                     key={item.id}
                     className={cn("bg-[#e7a63e]", { "header-link": !isFixed })}
                  >
                     <a
                        href={item.href}
                        className="inline-block uppercase py-1.5 px-5 transition-all hover:bg-[#faa928] tracking-wide"
                     >
                        {item.title}
                     </a>
                  </li>
               )
            })}
         </ul>
      </nav>
   );
}