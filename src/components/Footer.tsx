import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/constants/header-link-data";
import { HEADER_DROPDOWN_DATA } from "@/constants/header-dropdown-data";
import { LEGAL, SITE } from "@/constants/site";

const linkClass = "transition-colors duration-150 hover:text-chalk";
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
   const companyLinks = NAV_LINKS.filter((item) => item.id !== "prices");

   return (
      <footer className="bg-asphalt text-[15px] text-chalk-subtle">
         <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
               <Logo tone="dark" />
               <p className="mt-5 max-w-xs leading-6">Асфальтирование и благоустройство в Волгограде и области</p>
            </div>

            <nav aria-labelledby="footer-company" className="lg:col-span-2">
               <h2 id="footer-company" className="text-sm text-chalk-faint">
                  Компания
               </h2>
               <ul className="mt-4 grid gap-2.5">
                  {companyLinks.map((item) => (
                     <li key={item.id}>
                        <Link href={item.href} className={linkClass}>
                           {item.title}
                        </Link>
                     </li>
                  ))}
               </ul>
            </nav>

            <nav aria-labelledby="footer-prices" className="lg:col-span-3">
               <h2 id="footer-prices" className="text-sm text-chalk-faint">
                  Цены
               </h2>
               <ul className="mt-4 grid gap-2.5">
                  {HEADER_DROPDOWN_DATA.map((item) => (
                     <li key={item.id}>
                        <Link href={item.href} className={linkClass}>
                           {item.title}
                        </Link>
                     </li>
                  ))}
               </ul>
            </nav>

            <div className="lg:col-span-3">
               <h2 className="text-sm text-chalk-faint">Связь</h2>
               <ul className="mt-4 grid gap-2.5">
                  <li>
                     <a href={SITE.phoneHref} className={`${linkClass} font-mono tabular-nums`}>
                        {SITE.phone}
                     </a>
                  </li>
                  <li>
                     <a href={SITE.emailHref} className={`${linkClass} break-all`}>
                        {SITE.email}
                     </a>
                  </li>
                  <li>{SITE.region}</li>
                  <li>{SITE.hours}</li>
               </ul>
            </div>
         </Container>

         <Container>
            {/* Отступы под плавающие кнопки связи, чтобы они не перекрывали ссылки */}
            <div className="flex flex-col gap-3 border-t border-asphalt-line pt-6 pb-36 text-sm text-chalk-faint md:flex-row md:items-center md:justify-between md:pr-20 md:pb-6">
               <p>© {CURRENT_YEAR} «Асфальт» — пет-проект, не действующая компания</p>
               <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  <li>
                     <Link href={LEGAL.policy} className={linkClass}>
                        Политика конфиденциальности
                     </Link>
                  </li>
                  <li>
                     <Link href={LEGAL.consent} className={linkClass}>
                        Согласие на обработку данных
                     </Link>
                  </li>
               </ul>
            </div>
         </Container>
      </footer>
   );
}
