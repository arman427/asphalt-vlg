import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
   className?: string
}

export function FixedFeedBack({ className }: Props) {
   const [isVisible, setIsVisible] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

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

   return (
      <div className={cn("fixed z-100 translate-y-10 right-5 bottom-5 md:right-17 md:bottom-17 opacity-0 duration-400", {
         "opacity-100 translate-y-0": isVisible
      })}>
         <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger
               aria-label="Связаться с нами"
               className={cn("p-4.5 md:p-5 bg-accent cursor-pointer relative border border-dashed border-black/10", className)}
            >
               <Phone size={24} className="text-white" />
               <div className="absolute w-3/4 h-3/4 animate-ping bg-gray-400/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
            </PopoverTrigger>
            <PopoverContent side="top" align="end" className="w-fit p-2 rounded-none">
               <ul className="grid gap-2">
                  <li>
                     <a href="https://t.me/armanhik7" target="_blank" className="text-[#33AAE0] flex items-center gap-1 bg-background p-2 border border-foreground/10">
                        <div
                           className="w-9 h-9 lg:w-10 lg:h-10 bg-current"
                           style={{
                              mask: `url("/telegram.svg") no-repeat center / contain`,
                              WebkitMask: `url("/telegram.svg") no-repeat center / contain`,
                           }}
                        />
                        <span className="text-foreground">Telegram</span>
                     </a>
                  </li>
                  <li>
                     <a href="https://wa.me/79610599262" target="_blank" className="text-[#67D449] flex items-center gap-1 bg-background p-2 border border-foreground/10">
                        <div
                           className="w-9 h-9 lg:w-10 lg:h-10 bg-current"
                           style={{
                              mask: `url("/whatsapp.svg") no-repeat center / contain`,
                              WebkitMask: `url("/whatsapp.svg") no-repeat center / contain`,
                           }}
                        />
                        <span className="text-foreground">WhatsApp</span>
                     </a>
                  </li>
                  <li>
                     <a href="tel:+79610599262" target="_blank" className="text-accent flex items-center gap-1 bg-background p-2 border border-foreground/10">
                        <Phone className="w-7 h-7 lg:w-8 lg:h-8" />
                        <span className="text-foreground">+7 (961) 059 92-62</span>
                     </a>
                  </li>
               </ul>
            </PopoverContent>
         </Popover>
      </div>
   );
}