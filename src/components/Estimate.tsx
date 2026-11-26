import { Container } from "./container";
import { SectionHeading } from "./SectionHeading";
import { EstimateForm } from "./forms/EstimateForm";
import { SITE } from "@/constants/site";

export function Estimate() {
   return (
      <section id="raschet" aria-labelledby="estimate-title" className="py-20 md:py-28">
         <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5 lg:pr-8">
               <SectionHeading id="estimate-title" eyebrow="Расчёт стоимости" title="Рассчитайте стоимость за 2 минуты" />
               <p className="mt-6 max-w-md text-lg leading-7 text-subtle">
                  Заполните форму — мы перезвоним, уточним детали и пришлём точную смету. Без скрытых платежей и
                  обязательств.
               </p>

               <div className="mt-10 max-w-md border-t border-border pt-6">
                  <p className="text-sm text-faint">Удобнее голосом</p>
                  <a
                     href={SITE.phoneHref}
                     className="mt-1 inline-block font-mono text-2xl text-foreground tabular-nums transition-colors duration-150 hover:text-brand-ink"
                  >
                     {SITE.phone}
                  </a>
                  <p className="mt-1 text-sm text-faint">{SITE.hours}</p>
               </div>
            </div>

            <div className="lg:col-span-7">
               <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_8px_24px_rgb(29_27_24/0.06)] sm:p-8">
                  <EstimateForm />
               </div>
            </div>
         </Container>
      </section>
   );
}
