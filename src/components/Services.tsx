import Image from "next/image";
import { Container } from "./container";
import { SectionHeading } from "./SectionHeading";
import { SERVICES_CARD } from "@/constants/services-card-data";

export function Services() {
   return (
      <section id="yslygi" aria-labelledby="services-title" className="border-t border-border py-20 md:py-28">
         <Container>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
               <SectionHeading id="services-title" eyebrow="Услуги" title="Что мы асфальтируем" />
               <p className="max-w-sm text-[17px] leading-7 text-subtle">
                  От частного двора до промплощадки под фуры — подбираем покрытие под нагрузку объекта
               </p>
            </div>

            <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
               {SERVICES_CARD.map(({ id, title, description, imageUrl, imageAlt }) => (
                  <li key={id} data-reveal>
                     <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-raised">
                        <Image
                           src={imageUrl}
                           alt={imageAlt}
                           fill
                           sizes="(min-width: 1024px) 410px, (min-width: 640px) 50vw, 100vw"
                           className="object-cover"
                        />
                     </div>
                     <h3 className="mt-5 text-xl leading-snug font-semibold text-foreground">{title}</h3>
                     <p className="mt-2 text-[15px] leading-6 text-subtle">{description}</p>
                  </li>
               ))}
            </ul>
         </Container>
      </section>
   );
}
