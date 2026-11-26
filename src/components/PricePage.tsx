import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "./container";
import { PageHeader } from "./PageHeader";
import { EstimateButton } from "./estimate/EstimateButton";
import { buttonVariants } from "./ui/button";
import { formatPrice, PRICE_CATEGORIES, PriceCategory, priceHref, PriceRow } from "@/constants/prices-data";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

function PriceValue({ row, className }: { row: PriceRow; className?: string }) {
   return (
      <span className={cn("font-mono text-[15px] leading-6 text-foreground tabular-nums", className)}>
         {row.from && <span className="text-faint">от </span>}
         {formatPrice(row.price)}
         <span className="text-faint"> ₽/{row.unit}</span>
      </span>
   );
}

export function PricePage({ category }: { category: PriceCategory }) {
   return (
      <article>
         <PageHeader
            title={category.heading}
            crumbs={[{ label: "Главная", href: "/" }, { label: "Цены" }, { label: category.title }]}
         />

         <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-8">
               <div className="grid max-w-[68ch] gap-4 text-[17px] leading-7 text-subtle">
                  {category.intro.map((paragraph) => (
                     <p key={paragraph}>{paragraph}</p>
                  ))}
               </div>

               <ul className="mt-10 grid gap-4 md:grid-cols-3">
                  {category.advantages.map((advantage) => (
                     <li key={advantage.title} className="rounded-xl border border-border bg-card p-5">
                        <span className="flex size-8 items-center justify-center rounded-md bg-raised text-subtle">
                           <Check size={16} strokeWidth={1.75} />
                        </span>
                        <h2 className="mt-4 text-[17px] leading-6 font-semibold text-foreground">{advantage.title}</h2>
                        <p className="mt-2 text-[15px] leading-6 text-subtle">{advantage.text}</p>
                     </li>
                  ))}
               </ul>

               <section aria-labelledby="price-table-title" className="mt-14 md:mt-16">
                  <div className="flex items-end justify-between gap-4">
                     <h2 id="price-table-title" className="font-display text-[32px] leading-[1.05] md:text-4xl">
                        Цены
                     </h2>
                     <p className="text-sm text-faint">за единицу работ</p>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                     <table className="w-full text-left">
                        <thead className="border-b border-border bg-raised/50">
                           <tr className="text-[13px] text-faint">
                              <th scope="col" className="px-4 py-3 font-normal sm:px-5">
                                 Вид работ
                              </th>
                              <th scope="col" className="hidden px-5 py-3 text-right font-normal sm:table-cell">
                                 Цена
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                           {category.rows.map((row) => (
                              <tr key={row.name} className="transition-colors duration-150 hover:bg-raised/40">
                                 <td className="px-4 py-4 align-top text-[15px] leading-6 text-foreground sm:px-5">
                                    {row.name}
                                    {/* На узком экране цена встаёт под название, чтобы не сжимать текст */}
                                    <PriceValue row={row} className="mt-1 block sm:hidden" />
                                 </td>
                                 <td className="hidden px-5 py-4 text-right align-top whitespace-nowrap sm:table-cell">
                                    <PriceValue row={row} />
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-faint">
                     Цены не окончательные: точную стоимость считаем после замера объекта
                  </p>
               </section>
            </div>

            <aside className="lg:col-span-4">
               <div className="grid gap-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
                  <nav aria-labelledby="price-nav-title" className="rounded-xl border border-border bg-card p-1.5">
                     <p id="price-nav-title" className="px-3 pt-2 pb-1 text-[13px] text-faint">
                        Виды работ
                     </p>
                     <ul className="grid gap-0.5">
                        {PRICE_CATEGORIES.map((item) => {
                           const isCurrent = item.slug === category.slug;
                           return (
                              <li key={item.slug}>
                                 <Link
                                    href={priceHref(item.slug)}
                                    aria-current={isCurrent ? "page" : undefined}
                                    className="flex min-h-11 items-center rounded-lg px-3 py-2 text-[15px] leading-5 text-subtle transition-colors duration-150 hover:bg-raised hover:text-foreground aria-[current=page]:bg-raised aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                                 >
                                    {item.title}
                                 </Link>
                              </li>
                           );
                        })}
                     </ul>
                  </nav>

                  <div className="rounded-xl bg-asphalt p-6 text-chalk">
                     <p className="font-display text-[28px] leading-[1.05]">Точная смета за 24 часа</p>
                     <p className="mt-3 text-[15px] leading-6 text-chalk-subtle">
                        Замерим объект и посчитаем стоимость без скрытых платежей
                     </p>
                     <EstimateButton size="lg" className="mt-6 w-full" />
                     <a
                        href={SITE.phoneHref}
                        className={buttonVariants({
                           variant: "outline-dark",
                           size: "lg",
                           className: "mt-3 w-full font-mono text-[15px] tabular-nums",
                        })}
                     >
                        {SITE.phone}
                     </a>
                  </div>
               </div>
            </aside>
         </Container>
      </article>
   );
}
