import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { Phone } from "lucide-react";
import { Container } from "./container";
import { Eyebrow } from "./SectionHeading";
import { buttonVariants } from "./ui/button";
import { SITE } from "@/constants/site";

const rise = (index: number) => ({ "--rise-index": index }) as CSSProperties;

export function Hero() {
   return (
      <section
         aria-labelledby="hero-title"
         className="relative isolate flex min-h-[calc(100svh-6.5rem)] overflow-hidden bg-asphalt text-chalk"
      >
         <Image
            src="/feedback.png"
            alt="Укладка асфальта на набережной Волгограда, на холме — Родина-мать"
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-[4%_50%] md:object-center"
         />
         {/* Затемнение снизу: заголовок лежит на полосе свежего асфальта */}
         <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--asphalt)_0%,rgb(22_21_19/0.88)_32%,rgb(22_21_19/0.3)_62%,rgb(22_21_19/0)_82%)]"
         />
         <div
            aria-hidden
            className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_right,rgb(22_21_19/0.5),rgb(22_21_19/0)_55%)] md:block"
         />

         <Container className="flex flex-col justify-end pt-48 pb-12 md:pb-20">
            <div className="max-w-3xl">
               <Eyebrow tone="dark" className="hero-rise">
                  {SITE.region}
               </Eyebrow>
               <h1
                  id="hero-title"
                  style={rise(1)}
                  className="hero-rise mt-5 font-display text-[44px] leading-[1.02] text-balance text-chalk sm:text-6xl lg:text-[80px] lg:tracking-[-0.025em]"
               >
                  Асфальт для дворов, дорог и парковок
               </h1>
               <p style={rise(2)} className="hero-rise mt-5 max-w-xl text-lg leading-7 text-chalk-subtle md:text-xl md:leading-8">
                  Своя техника, проверенная технология укладки и гарантия на каждый объект
               </p>
               <div style={rise(3)} className="hero-rise mt-8 flex flex-wrap gap-3">
                  <Link href="#raschet" className={buttonVariants({ size: "lg" })}>
                     Рассчитать стоимость
                  </Link>
                  <a href={SITE.phoneHref} className={buttonVariants({ variant: "outline-dark", size: "lg" })}>
                     <Phone size={18} strokeWidth={1.5} />
                     <span className="font-mono text-[15px] tabular-nums">{SITE.phone}</span>
                  </a>
               </div>
            </div>
         </Container>
      </section>
   );
}
