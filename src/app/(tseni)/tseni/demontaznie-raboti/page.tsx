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
      title: "Нарезка швов в асфальтобетонном покрытии",
      price: "от 150 п/м"
   },
   {
      title: "Срезка поверхностного слоя асфальтобетонных дорожных покрытий методом холодного фрезерования, толщина слоя до 5 см",
      price: "от 70 р/м2"
   },
   {
      title: "Разборка асфальтобетонного покрытия и щебеночного основания экскаватором",
      price: "от 100 р/м3"
   },
   {
      title: "Разборка покрытий и оснований асфальтобетонных с помощью молотков отбойных толщиной слоя 5 см",
      price: "от 150 р/м2"
   },
   {
      title: "Разборка цементобетонного покрытия проезжей части толщиной слоя до 10 см",
      price: "от 190 р/м2"
   },
   {
      title: "Разборка тротуарного покрытия толщиной слоя 10 см",
      price: "от 150 р/м2"
   },
   {
      title: "Разборка дорожных плит с погрузкой автокраном",
      price: "от 150 р/м2"
   },
   {
      title: "Разборка бортовых камней БР 100.30.15 на бетонном основании с погрузкой",
      price: "от 220 п/м"
   },
   {
      title: "Разборка бортовых камней БР 100.20.8 на бетонном основании с погрузкой",
      price: "от 180 п/м"
   },
   {
      title: "Погрузка и вывоз строительного мусора на расстояние до 30 км",
      price: "от 300 р/м3"
   }
];

export default function DemontaznieRaboti() {
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
               <h1 className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider">Демонтажные работы в Волгограде</h1>
               <div className="w-10 h-0.5 bg-accent"></div>
            </div>
            <div className="max-w-400 mx-auto grid gap-3 mt-3">
               <p>Требуется снять старое асфальтовое покрытие или бетонное основание перед новым строительством? Хотите, чтобы демонтаж прошёл быстро и без лишнего мусора на объекте? Важно вывезти отходы по правилам, а не оставить кучи на участке? Тогда вы по адресу.</p>
               <p>Демонтаж — первый и самый «грязный» этап любой реконструкции, поэтому важно доверить его профессионалам. Цены на демонтаж вы найдёте в этом разделе, а вот наши преимущества:</p>
               <ul className="grid gap-1 pl-3 mt-2">
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Опыт работы 10 лет.</span> Демонтировали покрытия любой сложности — от тротуарной плитки до многослойного асфальта.</li>
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Спецтехника для фрезерования и дробления.</span> Асфальтофрезы и гидромолоты позволяют снимать покрытие послойно, не повреждая основание под ним.</li>
                  <li className="flex items-center gap-2"><SquareCheckBig className="text-accent" size={18} /> <span className="font-bold">Вывоз строительного мусора включён.</span> Не оставляем после себя завалы — территория сдаётся полностью очищенной.</li>
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