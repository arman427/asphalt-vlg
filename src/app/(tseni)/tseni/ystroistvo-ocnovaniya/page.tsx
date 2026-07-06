"use client";

import { Container } from "@/components/container";
import { SquareCheckBig } from "lucide-react";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const prices = [
   {
      title: "Устройство подстилающих и выравнивающих оснований из песка, толщина 10 см",
      price: "от 100 р/м2"
   },
   {
      title: "Укладка геотекстиля со стоимостью материала",
      price: "от 50 р/м2"
   },
   {
      title: "Устройство подстилающих и выравнивающих оснований из щебня марки М600, с клинцеванием, толщина 10 см",
      price: "от 200 р/м2"
   },
   {
      title: "Устройство подстилающих и выравнивающих оснований из щебня марки М1000 и выше, с клинцеванием, толщина 10 см",
      price: "от 280 р/м2"
   },
   {
      title: "Устройство подстилающих и выравнивающих оснований из вторичного бетонного щебня фр. 40-100 мм, 10 см",
      price: "от 180 р/м2"
   },
   {
      title: "Устройство подстилающих и выравнивающих оснований из асфальтобетонного среза (крошки) толщиной слоя 7 см",
      price: "от 250 р/м2"
   },
   {
      title: "Укладка дорожной сетки в бетонное основание",
      price: "от 120 р/м2"
   },
   {
      title: "Устройство основания из товарного бетона марки М100, толщина 10 см",
      price: "от 500 р/м2"
   },
   {
      title: "Устройство основания из товарного бетона марки М300, толщина 10 см",
      price: "от 600 р/м2"
   }
];

export default function YstroistvOcnovaniya() {
   useGSAP(() => {
      gsap.set(".table-row", {
         opacity: 0,
         translateY: 10,
      });

      ScrollTrigger.batch(".table-row", {
         start: "top 90%",
         once: true,
         onEnter: (batch) => {
            gsap.to(batch, {
               opacity: 1,
               translateY: 0,
               duration: 0.4,
               ease: "power3.out",
               stagger: 0.10,
            });
         },
      });
   });

   return (
      <div className="">
         <Container>
            <div className="flex items-center gap-2 justify-center mt-20">
               <div className="w-10 h-0.5 bg-accent"></div>
               <h1 className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider">Устройство основания для асфальтирования в Волгограде</h1>
               <div className="w-10 h-0.5 bg-accent"></div>
            </div>
            <div className="max-w-400 mx-auto grid gap-3 mt-3">
               <p>Знаете, что 80% проблем с дорожным покрытием возникают из-за плохого основания? Хотите, чтобы асфальт прослужил не один сезон, а десятилетия? Ищете исполнителя, который не станет экономить на щебне и геотекстиле? Тогда вы нашли нужную компанию.</p>
               <p>Основание — то, что не видно глазу заказчика после сдачи объекта, но именно оно определяет судьбу всей дороги. Цену на устройство основания вы найдёте в этом разделе, а ниже — почему заказчики выбирают нас:</p>
               <ul className="grid gap-1 pl-3 mt-2">
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Опыт работы 10 лет.</span> Мы знаем, какое основание нужно под пешеходную дорожку, а какое — под проезд грузового транспорта.</li>
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Многослойное уплотнение виброкатками.</span> Каждый слой щебня проходит трамбовку — это исключает просадку покрытия в будущем.</li>
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Гарантия на основание.</span> Если под асфальтом «поведёт» слой — переделаем за свой счёт. Но такое у нас случается крайне редко.</li>
               </ul>

               <div>
                  <h1 className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider text-center mt-10 mb-4">Цены</h1>
                  <div className="shadow-lg shadow-black/10 overflow-hidden w-full">
                     <Table className="w-full table-fixed">
                        <TableHeader className="bg-accent">
                           <TableRow>
                              <TableHead className="text-background tracking-wide w-3/4">Наименование работы</TableHead>
                              <TableHead className="text-right text-background w-2/4">Цена, рублей</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {prices.map((item) => (
                              <TableRow key={item.title} className="hover:bg-accent/30 table-row">
                                 <TableCell className="font-medium break-words whitespace-normal">
                                    {item.title}
                                 </TableCell>
                                 <TableCell className="text-right whitespace-nowrap">
                                    {item.price}
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </div>
                  <p className="text-[14px] text-center mt-6"><span className="font-bold text-foreground">*Внимание!</span> Цены на услуги не являются окончательными, точную стоимость уточняйте у менеджеров компании.</p>
               </div>
            </div>
         </Container>
      </div>
   );
}