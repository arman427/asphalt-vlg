import { Container } from "./container";

/** Плашка над шапкой: сайт — пет-проект, а не реальная компания */
export function PetBanner() {
   return (
      <aside aria-label="О проекте" className="bg-asphalt text-chalk-subtle">
         <Container className="flex items-center gap-3 py-2.5 text-[13px] leading-5">
            <span aria-hidden className="road-mark hidden w-7 sm:inline-block" />
            <p>
               <span className="font-medium text-chalk">Пет-проект.</span> Сайт сделан для портфолио: компания и цены
               вымышлены, услуги не оказываются
            </p>
         </Container>
      </aside>
   );
}
