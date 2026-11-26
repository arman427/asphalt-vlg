import Link from "next/link";
import { ReactNode } from "react";
import { Container } from "./container";
import { PageHeader } from "./PageHeader";
import { LEGAL } from "@/constants/site";

interface Props {
   title: string;
   children: ReactNode;
}

const DOCUMENTS = [
   { href: LEGAL.policy, label: "Политика конфиденциальности" },
   { href: LEGAL.consent, label: "Согласие на обработку персональных данных" },
];

export function LegalPage({ title, children }: Props) {
   return (
      <article>
         <PageHeader title={title} crumbs={[{ label: "Главная", href: "/" }, { label: title }]}>
            <p className="mt-4 text-sm text-faint">Редакция от {LEGAL.updated}</p>
         </PageHeader>

         <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
            <div className="legal-prose lg:col-span-8">{children}</div>

            <aside className="lg:col-span-4">
               <nav
                  aria-labelledby="legal-nav-title"
                  className="rounded-xl border border-border bg-card p-1.5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]"
               >
                  <p id="legal-nav-title" className="px-3 pt-2 pb-1 text-[13px] text-faint">
                     Документы
                  </p>
                  <ul className="grid gap-0.5">
                     {DOCUMENTS.map((doc) => (
                        <li key={doc.href}>
                           <Link
                              href={doc.href}
                              aria-current={doc.label === title ? "page" : undefined}
                              className="flex min-h-11 items-center rounded-lg px-3 py-2 text-[15px] leading-5 text-subtle transition-colors duration-150 hover:bg-raised hover:text-foreground aria-[current=page]:bg-raised aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                           >
                              {doc.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </nav>
            </aside>
         </Container>
      </article>
   );
}
