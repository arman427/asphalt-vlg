"use client";

import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
   className?: string
}

export function Projects({ className }: Props) {
   return (
      <div className={cn("mt-30", className)} id="nashi-raboti">
         <h1 className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider text-center mb-10">
            Наши работы
         </h1>
         <Swiper
            spaceBetween={1}
            slidesPerView={4}
            navigation={{
               nextEl: ".button-next-swiper",
               prevEl: ".button-prev-swiper",
            }}
            modules={[Navigation]}
            className="w-full relative"
         >
            {Array.from({ length: 10 }, (_, index) => (
               <SwiperSlide key={index}>
                  <div className="relative bg-accent/60 w-full h-100 flex items-center justify-center">
                     РАБОТ ПОКА НЕТ
                  </div>
               </SwiperSlide>
            ))}
            <button className="button-prev-swiper absolute left-10 top-1/2 -translate-y-1/2 z-10 p-2 h-15 bg-accent flex items-center justify-center text-black/75 cursor-pointer border border-black/40">
               <ChevronLeft size={30} />
            </button>

            <button className="button-next-swiper absolute right-10 top-1/2 -translate-y-1/2 z-10 p-2 h-15 bg-accent flex items-center justify-center text-black/75 cursor-pointer border border-black/40">
               <ChevronRight size={30} />
            </button>
         </Swiper>

      </div>
   );
}