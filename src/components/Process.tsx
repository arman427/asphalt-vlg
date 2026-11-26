import { Container } from "./container";
import { SectionHeading } from "./SectionHeading";
import { PROCESS_DATA } from "@/constants/process-data";

/** Этапы работы — дорога на асфальте: шаги соединены пунктиром разметки */
export function Process() {
   return (
      <section id="etapy" aria-labelledby="process-title" className="bg-asphalt py-20 text-chalk md:py-28">
         <Container>
            <SectionHeading id="process-title" tone="dark" eyebrow="Этапы работы" title="От заявки до сдачи объекта" />

            <ol className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-6 lg:gap-6">
               {PROCESS_DATA.map((step, index) => {
                  const isLast = index === PROCESS_DATA.length - 1;

                  return (
                     <li key={step.title} data-reveal className="relative grid grid-cols-[40px_1fr] gap-x-5 lg:block">
                        {!isLast && (
                           <>
                              {/* Разметка до следующего шага: вертикально на телефоне, горизонтально на десктопе */}
                              <span aria-hidden className="road-line-y absolute top-12 -bottom-8 left-[18px] w-1 lg:hidden" />
                              <span aria-hidden className="road-line-x absolute top-[18px] -right-2 left-14 hidden h-1 lg:block" />
                           </>
                        )}
                        <span className="relative flex size-10 items-center justify-center rounded-md border border-asphalt-line bg-asphalt-raised font-mono text-sm text-brand tabular-nums">
                           {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="pb-2 lg:mt-6 lg:pb-0">
                           <h3 className="pt-2 text-lg leading-snug font-semibold text-chalk lg:pt-0">{step.title}</h3>
                           <p className="mt-2 text-[15px] leading-6 text-chalk-subtle">{step.text}</p>
                        </div>
                     </li>
                  );
               })}
            </ol>
         </Container>
      </section>
   );
}
