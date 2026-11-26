import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { Container } from "./container";

interface Crumb {
   label: string;
   href?: string;
}

interface Props {
   crumbs: Crumb[];
   title: string;
   children?: ReactNode;
}

/** Шапка внутренней страницы: хлебные крошки и заголовок */
export function PageHeader({ crumbs, title, children }: Props) {
   return (
      <header className="border-b border-border bg-raised/60">
         <Container className="py-12 md:py-16">
            <nav aria-label="Хлебные крошки">
               <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-faint">
                  {crumbs.map((crumb, index) => (
                     <Fragment key={crumb.label}>
                        {index > 0 && <li aria-hidden>/</li>}
                        <li>
                           {crumb.href ? (
                              <Link href={crumb.href} className="transition-colors duration-150 hover:text-foreground">
                                 {crumb.label}
                              </Link>
                           ) : (
                              <span aria-current="page" className="text-subtle">
                                 {crumb.label}
                              </span>
                           )}
                        </li>
                     </Fragment>
                  ))}
               </ol>
            </nav>
            <h1 className="mt-6 max-w-4xl font-display text-[40px] leading-[1.04] text-balance md:text-6xl">{title}</h1>
            {children}
         </Container>
      </header>
   );
}
