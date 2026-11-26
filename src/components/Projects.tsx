import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { Eyebrow } from "./SectionHeading";
import { buttonVariants } from "./ui/button";
import { PRICE_CATEGORIES, priceHref } from "@/constants/prices-data";

/** Пока нет фото сданных объектов — честный пустой блок вместо слайдов-заглушек */
export function Projects() {
   return (
      <section id="nashi-raboti" aria-labelledby="projects-title" className="pb-20 md:pb-28">
         <Container>
            <div
               data-reveal
               className="grid gap-8 rounded-2xl bg-raised p-8 md:grid-cols-[1fr_auto] md:items-end md:gap-12 md:p-12"
            >
               <div>
                  <Eyebrow>Наши работы</Eyebrow>
                  <h2 id="projects-title" className="mt-4 font-display text-[32px] leading-[1.05] md:text-4xl">
                     Портфолио пополняется
                  </h2>
                  <p className="mt-4 max-w-xl text-[17px] leading-7 text-subtle">
                     Фотографии сданных объектов появятся здесь. Пока можно посмотреть цены по видам работ или
                     заказать расчёт для своего участка.
                  </p>
               </div>
               <Link
                  href={priceHref(PRICE_CATEGORIES[0].slug)}
                  className={buttonVariants({ variant: "dark", size: "lg", className: "justify-self-start" })}
               >
                  Цены по видам работ
                  <ArrowRight size={18} strokeWidth={1.5} />
               </Link>
            </div>
         </Container>
      </section>
   );
}
