import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
   className?: string
}

export function BackToTop({ className }: Props) {
   const [isVisible, setIsVisible] = useState(false);

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

   const onClickToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth"
      })
   }

   return (
      <button
         aria-label="Вернуться наверх"
         className={cn("fixed z-100 left-5 bottom-5 md:left-17 md:bottom-17 opacity-0 p-4 translate-y-10 bg-accent duration-400 cursor-pointer border border-dashed border-black/10", {
            "opacity-100 translate-y-0": isVisible
         }, className)}
         onClick={onClickToTop}
      >
         <ArrowUp size={20} />
      </button>
   );
}