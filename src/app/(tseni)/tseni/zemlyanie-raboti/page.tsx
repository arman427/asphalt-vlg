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
      title: "Разработка грунта с перемещением на расстояние до 20 м",
      price: "от 70 р/м3"
   },
   {
      title: "Вертикальная планировка",
      price: "от 60 р/м2"
   },
   {
      title: "Разработка грунта экскаватором с погрузкой в автомобили самосвалы",
      price: "от 120 р/м3"
   },
   {
      title: "Доработка грунта вручную",
      price: "от 500 р/м3"
   },
   {
      title: "Погрузка грунта в автомобили самосвалы",
      price: "от 90 р/м3"
   },
   {
      title: "Перевозка грунта на расстояние до 1 км",
      price: "от 90 р/м3"
   },
   {
      title: "Перевозка грунта на расстояние до 30 км",
      price: "от 280 р/м3"
   },
   {
      title: "Уплотнение основания грунтовыми катками",
      price: "от 100 р/м3"
   }
];

export default function ZemlyanieRaboti() {
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
               <h1 className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider">Земляные работы в Волгограде</h1>
               <div className="w-10 h-0.5 bg-accent"></div>
            </div>
            <div className="max-w-400 mx-auto grid gap-3 mt-3">
               <p>Нужна выемка или подсыпка грунта под будущее строительство? Хотите, чтобы техника не повредила соседние коммуникации и зелёные насаждения? Важна скорость выполнения работ без потери качества? Тогда обратились по адресу.</p>
               <p>Земляные работы — это фундамент любого дальнейшего благоустройства или дорожного строительства. Расценки на м³ вы найдёте в этом разделе, а вот почему стоит работать с нами:</p>
               <ul className="grid gap-1 pl-3 mt-2">
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Опыт работы 10 лет.</span> Мы выполняли земляные работы разной сложности — от небольших участков до крупных объектов.</li>
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Парк экскаваторов и самосвалов.</span> Собственная техника позволяет вывозить грунт и завозить обратную засыпку без простоев.</li>
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Согласование с инженерными сетями.</span> Перед началом работ проверяем расположение коммуникаций — это исключает аварийные ситуации на объекте.</li>
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