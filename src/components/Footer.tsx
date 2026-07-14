import { NAV_LINKS } from "@/constants/header-link-data";
import { HEADER_DROPDOWN_DATA } from "@/constants/header-dropdown-data";

interface Props {
   className?: string
}

export function Footer({ className }: Props) {
   const NAV = NAV_LINKS.filter((item) => item.title !== "Цены");

   return (
      <div className="bg-[#1C1C1C] mt-50">
         <div className="max-w-330 px-10 mx-auto py-10 text-[#FFFFFFA6]">
            <div className="grid gap-6 mg:grid-cols-2 lg:grid-cols-3">
               <div>
                  <h4 className="text-[20px] font-semibold mb-3 text-accent font-title">Компания</h4>
                  <nav>
                     <ul className="grid gap-2">
                        {NAV.map((item) => (
                           <li className="text-[17px] font-light duration-100 active:text-accent md:hover:text-accent md:transition-colors" key={item.id}><a href={item.href}>{item.title}</a></li>
                        ))}
                     </ul>
                  </nav>
               </div>
               <div>
                  <h4 className="text-[20px] font-semibold mb-3 text-accent font-title">Цены</h4>
                  <nav>
                     <ul className="grid gap-2">
                        {HEADER_DROPDOWN_DATA.map((item) => (
                           <li className="text-[17px] font-light duration-100 active:text-accent md:hover:text-accent md:transition-colors" key={item.id}><a href={item.href}>{item.title}</a></li>
                        ))}
                     </ul>
                  </nav>
               </div>
               <div>
                  <h4 className="text-[20px] font-semibold mb-3 text-accent font-title">Связь с нами</h4>
                  <div className="grid gap-2">
                     <a href="tel:+79610599262" className="block text-[17px] font-light duration-100 active:text-accent md:hover:text-accent md:transition-colors">+7 (961) 059 92-62</a>
                     <a href="mailto:babayananuta11@gmail.com" className="text-[17px] font-light duration-100 active:text-accent md:hover:text-accent md:transition-colors">babayananuta11@gmail.com</a>
                     <p className="text-[17px] font-light duration-100 active:text-accent md:hover:text-accent md:transition-colors">Адрес: г. Волгоград, улица Пушкина офис 777</p>
                     <p className="text-[17px] font-light duration-100 active:text-accent md:hover:text-accent md:transition-colors">Режим работы: 8:00-23:00 (воскресенье - выходной)</p>
                  </div>
               </div>
            </div>
            <div className="w-full h-px bg-background/10 my-7" />
            <div className="flex items-center justify-between">
               <p>@ 2026 - Все права защищены.</p>
               <p>Политика конфиденциальности</p>
            </div>
         </div>
      </div>
   );
}