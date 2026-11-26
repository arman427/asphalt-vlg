import { Container } from "./container";
import { SectionHeading } from "./SectionHeading";
import { MaskIcon } from "./MaskIcon";
import { ContactForm } from "./forms/ContactForm";
import { CONTACTS_DATA } from "@/constants/contacts-data";
import { CONTACTS_SOCIAL_DATA } from "@/constants/contacts-social-data";
import { cn } from "@/lib/utils";

export function Contacts() {
   return (
      <section id="contacti" aria-labelledby="contacts-title" className="border-t border-border py-20 md:py-28">
         <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5 lg:pr-8">
               <SectionHeading id="contacts-title" eyebrow="Контакты" title="Связаться с нами" />
               <p className="mt-6 max-w-md text-lg leading-7 text-subtle">
                  Укладываем асфальт по ГОСТу в Волгограде и области. Работаем с частными лицами, бизнесом и
                  госзаказами. Гарантия на покрытие от 3 лет.
               </p>

               <dl className="mt-10 grid gap-5">
                  {CONTACTS_DATA.map(({ id, icon: Icon, title, text, href, mono }) => (
                     <div key={id} className="flex items-center gap-4">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-subtle">
                           <Icon size={18} strokeWidth={1.5} />
                        </span>
                        <div className="min-w-0">
                           <dt className="text-sm text-faint">{title}</dt>
                           <dd className={cn("text-[17px] leading-6 break-words text-foreground", mono && "font-mono text-base tabular-nums")}>
                              {href ? (
                                 <a href={href} className="transition-colors duration-150 hover:text-brand-ink">
                                    {text}
                                 </a>
                              ) : (
                                 text
                              )}
                           </dd>
                        </div>
                     </div>
                  ))}
               </dl>

               <ul className="mt-8 flex gap-2" aria-label="Мессенджеры и соцсети">
                  {CONTACTS_SOCIAL_DATA.map(({ id, label, iconUrl, href }) => (
                     <li key={id}>
                        <a
                           href={href}
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label={label}
                           className="flex size-11 items-center justify-center rounded-lg border border-border bg-card text-subtle outline-none transition-colors duration-150 hover:bg-raised hover:text-foreground focus-visible:ring-3 focus-visible:ring-brand/45"
                        >
                           <MaskIcon src={iconUrl} />
                        </a>
                     </li>
                  ))}
               </ul>
            </div>

            <div className="lg:col-span-7">
               <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_8px_24px_rgb(29_27_24/0.06)] sm:p-8">
                  <h3 className="text-xl font-semibold">Написать сообщение</h3>
                  <p className="mt-1 text-[15px] leading-6 text-subtle">Если вопрос не про расчёт — опишите задачу своими словами</p>
                  <div className="mt-6">
                     <ContactForm />
                  </div>
               </div>
            </div>
         </Container>
      </section>
   );
}
