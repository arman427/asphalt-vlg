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
      title: "Устройство покрытия из тротуарной плитки (цвет серый)",
      price: "от 350 р/м2"
   },
   {
      title: "Устройство покрытия из тротуарной плитки цветной в зависимости от сложности",
      price: "от 380 р/м2"
   },
   {
      title: "Устройство покрытия из брусчатки",
      price: "от 350 р/м2"
   },
   {
      title: "Установка бортовых камней БР 100.30.15",
      price: "от 360 п/м"
   },
   {
      title: "Установка тротуарных поребриков БР 100.20.8",
      price: "от 260 п/м"
   },
   {
      title: "Поднятие горловин колодцев и ремонт",
      price: "от 3000 р/шт."
   },
   {
      title: "Устройство сливных колодцев",
      price: "от 19000 р/шт."
   },
   {
      title: "Устройство газона",
      price: "от 400 р/м2"
   }
];

export default function BlagoYstroistvo() {
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
               <h1 className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider">Благоустройство территории в Волгограде </h1>
               <div className="w-10 h-0.5 bg-accent"></div>
            </div>
            <div className="max-w-400 mx-auto grid gap-3 mt-3">
               <p>Хотите привести придомовую территорию, двор или коммерческий объект в порядок? Ищете подрядчика, который сделает не только асфальт, но и бордюры, тротуары, озеленение? Важно получить комплексное решение «под ключ»? Тогда вы нашли то, что искали.</p>
               <p>Благоустройство — это финальный штрих, который формирует впечатление обо всём объекте. Расценки на услуги по благоустройству вы найдёте в этом разделе, а вот почему заказчики выбирают нас:</p>
               <ul className="grid gap-1 pl-3 mt-2">
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Опыт работы 10 лет.</span> Реализовали десятки объектов благоустройства — от дворов до коммерческих территорий.</li>
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Полный цикл работ одной бригадой.</span> Асфальт, бордюры, плитка, озеленение — не нужно нанимать несколько подрядчиков.</li>
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Гарантия на все виды работ.</span> Устраняем недочёты бесплатно, если они возникают в гарантийный период.</li>
               </ul>

               <div>
                  <h1 className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider text-center mt-10 mb-4">Цены</h1>
                  <div className="shadow-lg shadow-black/10 overflow-hidden w-full">
                     <Table className="w-full table-fixed">
                        <TableHeader className="bg-accent">
                           <TableRow>
                              <TableHead className="text-background tracking-wide text-xs sm:text-sm w-3/4">Наименование работы</TableHead>
                              <TableHead className="text-right text-background text-xs sm:text-sm w-2/4">Цена, рублей</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {prices.map((item) => (
                              <TableRow key={item.title} className="hover:bg-accent/30 table-row">
                                 <TableCell className="font-medium text-xs sm:text-sm py-2 break-words whitespace-normal">{item.title}</TableCell>
                                 <TableCell className="text-right text-xs sm:text-sm py-2 whitespace-nowrap">{item.price}</TableCell>
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