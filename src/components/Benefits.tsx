import { Container } from "./container";
import { SectionHeading } from "./SectionHeading";
import { BENEFITS_CARD_DATA } from "@/constants/benefits-card-data";

export function Benefits() {
   return (
      <section aria-labelledby="benefits-title" className="bg-raised py-20 md:py-28">
         <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
               <SectionHeading id="benefits-title" eyebrow="Подход" title="Считаем точно, укладываем по технологии" />
            </div>

            <ul className="divide-y divide-foreground/12 border-y border-foreground/12 lg:col-span-8">
               {BENEFITS_CARD_DATA.map(({ id, title, description, icon: Icon }) => (
                  <li
                     key={id}
                     data-reveal
                     className="grid grid-cols-[48px_1fr] items-start gap-x-5 gap-y-2 py-8 md:grid-cols-[48px_minmax(0,1fr)_minmax(0,1.3fr)] md:gap-x-8"
                  >
                     <span className="row-span-2 flex size-12 items-center justify-center rounded-lg border border-border bg-card text-subtle md:row-span-1">
                        <Icon size={20} strokeWidth={1.5} />
                     </span>
                     <h3 className="pt-2.5 text-xl leading-7 font-semibold text-foreground">{title}</h3>
                     <p className="text-[17px] leading-7 text-subtle md:pt-2.5">{description}</p>
                  </li>
               ))}
            </ul>
         </Container>
      </section>
   );
}
