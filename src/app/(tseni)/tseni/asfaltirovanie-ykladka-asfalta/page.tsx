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

const prices = [
   { name: "Проливка битумной эмульсией", price: "35 р/м2" },
   { name: "Асфальтирование покрытием из плотного асфальтобетона мелкозернистого h=4 см", price: "от 550 р/м2" },
   { name: "Асфальтирование покрытием из плотного асфальтобетона мелкозернистого h=5 см", price: "от 650 р/м2" },
   { name: "Асфальтирование покрытием из плотного асфальтобетона мелкозернистого h=6 см", price: "от 750 р/м2" },
   { name: "Асфальтирование покрытием из плотного асфальтобетона мелкозернистого h=7 см", price: "от 850 р/м2" },
   { name: "Укладка асфальтобетонного среза (крошки)", price: "от 250 р/м2" },
   { name: "Ремонт асфальта (ямочный ремонт) однослойного толщиной 5 см площадью ремонта до 5 м²", price: "от 780 р/м2" },
   { name: "Ремонт асфальта (ямочный ремонт) однослойного толщиной 5 см площадью ремонта до 25 м²", price: "от 750 р/м2" },
];

export default function AsfaltirovanieYkladkaAsfalta() {
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
      <Container className="">
         <div className="flex items-center gap-2 justify-center mt-20">
            <div className="w-10 h-0.5 bg-accent"></div>
            <h1 className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider">Асфальтирование — укладка асфальта в Волгограде</h1>
            <div className="w-10 h-0.5 bg-accent"></div>
         </div>
         <div className="max-w-400 mx-auto grid gap-3 mt-3">
            <p>Ищете компанию, которая качественно и в срок уложит асфальт? Хотите получить ровное, долговечное покрытие без переплат? Важно, чтобы работы выполнялись по технологии, а не «на глазок»? Тогда вы обратились по адресу — расскажем, почему стоит выбрать именно нас.</p>
            <p>Заявлять о качестве можно что угодно, но без фактов это просто слова. Цена укладки асфальта — первое, что интересует заказчика, и все расценки вы найдёте в этом разделе. А пока обратите внимание на наши преимущества:</p>
            <ul className="grid gap-1 pl-3 mt-2">
               <li className="flex items-center gap-2"><SquareCheckBig className="shrink-0 text-accent" size={18} /> <span className="font-bold">Опыт работы 10 лет.</span> За это время мы отработали технологию укладки до мелочей — асфальт ложится ровно, без трещин и просадок.</li>
               <li className="flex items-center gap-2"><SquareCheckBig className="shrink-0 text-accent" size={18} /> <span className="font-bold">Собственный асфальтоукладчик и каток.</span> Техника не берётся в аренду в последний момент — она всегда готова к выезду, поэтому сроки не срываются.</li>
               <li className="flex items-center gap-2"><SquareCheckBig className="shrink-0 text-accent" size={18} /> <span className="font-bold">Контроль толщины и температуры укладки.</span> Мы не экономим на слое асфальта и не укладываем остывшую смесь — это гарантия срока службы покрытия.</li>
            </ul>

            <div>
               <h1 className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider text-center mt-10 mb-4">Цены</h1>
               <div className="shadow-lg shadow-black/10 overflow-hidden w-full">
                  <Table className="w-full table-fixed">
                     <TableHeader className="bg-accent">
                        <TableRow>
                           <TableHead className="text-background tracking-wide text-xs sm:text-sm w-3/4">
                              Наименование работы
                           </TableHead>
                           <TableHead className="text-right text-background text-xs sm:text-sm w-2/4">
                              Цена, рублей
                           </TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {prices.map((item) => (
                           <TableRow key={item.name} className="hover:bg-accent/30 table-row">
                              <TableCell className="font-medium text-xs sm:text-sm py-2 break-words whitespace-normal">
                                 {item.name}
                              </TableCell>
                              <TableCell className="text-right text-xs sm:text-sm py-2 whitespace-nowrap">
                                 {item.price}
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </div>

               {/* <div className="sm:hidden grid gap-3">
                  {prices.map((item) => (
                     <div
                        key={item.name}
                        className="flex justify-between items-center gap-4 border border-border rounded-md px-4 py-3 shadow-sm"
                     >
                        <span className="font-medium text-sm">{item.name}</span>
                        <span className="text-accent font-semibold text-sm whitespace-nowrap">
                           {item.price} ₽
                        </span>
                     </div>
                  ))}
               </div> */}

               <p className="text-[14px] text-center mt-6"><span className="font-bold text-foreground">*Внимание!</span> Цены на услуги не являются окончательными, точную стоимость уточняйте у менеджеров компании.</p>
            </div>
         </div>
      </Container>
   );
}