import { Container } from "./container";
import { SectionHeading } from "./SectionHeading";

const FACTS = [
   { value: "10 лет", label: "асфальтируем в Волгограде и области" },
   { value: "24 часа", label: "на замер объекта и точную смету" },
   { value: "от 3 лет", label: "гарантия на уложенное покрытие" },
];

export function About() {
   return (
      <section id="o-nas" aria-labelledby="about-title" className="py-20 md:py-28">
         <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
               <SectionHeading id="about-title" eyebrow="О компании" title="Асфальтирование любой сложности" />
               <p className="mt-6 max-w-md text-lg leading-7 text-foreground">
                  Берём на себя все задачи по благоустройству и асфальтированию в Волгограде, с чёткими сроками и
                  контролем качества
               </p>
            </div>

            <div data-reveal className="grid max-w-[65ch] gap-5 text-[17px] leading-7 text-subtle lg:col-span-6 lg:col-start-7 lg:pt-10">
               <p>
                  Мы занимаемся асфальтированием в Волгограде и области уже много лет, выполняя проекты любой сложности —
                  от частных дворов до коммерческих площадок и подъездных дорог. За это время мы сформировали команду
                  опытных специалистов и оснастили её современной техникой, что позволяет соблюдать сроки даже на крупных
                  объектах. В работе используем только качественные материалы от проверенных поставщиков, поэтому
                  покрытие служит долго и выдерживает нагрузки нашего климата — от летнего зноя до зимних перепадов
                  температуры.
               </p>
               <p>
                  Каждый этап работ — от подготовки основания до укладки и трамбовки асфальта — контролируется на
                  соответствие технологии. Мы ценим прозрачность в общении с клиентами: заранее рассчитываем стоимость,
                  фиксируем её в договоре и не меняем условия по ходу работы. За годы работы мы реализовали десятки
                  проектов в Волгограде, и многие клиенты обращаются к нам повторно или рекомендуют нас знакомым. Для нас важно не просто залить асфальт, а сделать так, чтобы покрытие
                  радовало вас долгие годы.
               </p>
            </div>
         </Container>

         <Container className="mt-16 md:mt-20">
            <dl className="grid border-t border-border sm:grid-cols-3">
               {FACTS.map(({ value, label }) => (
                  <div
                     key={value}
                     data-reveal
                     className="flex flex-col-reverse gap-2 border-b border-border py-6 sm:border-b-0 sm:border-l sm:py-8 sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
                  >
                     <dt className="text-[15px] leading-6 text-subtle">{label}</dt>
                     <dd className="font-display text-5xl leading-none text-foreground tabular-nums md:text-6xl">{value}</dd>
                  </div>
               ))}
            </dl>
         </Container>
      </section>
   );
}
