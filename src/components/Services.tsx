import { cn } from "@/lib/utils"
import { Container } from "./container";
import { SERVICES_CARD } from "@/constants/services-card-data";
import Image from "next/image";

interface Props {
   className?: string
}

export function Services({ className }: Props) {
   return (
      <div className="services pb-10 w-full bg-[url('/yslygi_img.png')] bg-cover bg-no-repeat relative">
         <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
         <Container className={cn("my-20", className)}>
            <h1 className="relative z-30 uppercase text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider max-w-105 text-center mx-auto pt-10">Наши услуги</h1>
            <div className="grid grid-cols-3 gap-6 mt-10">
               {SERVICES_CARD.map((item) => (
                  <div key={item.id} className="flex relative z-50 flex-col items-center text-center bg-[#f7f7f7]">
                     
                  </div>
               ))}
            </div>
         </Container>
      </div>
   );
}