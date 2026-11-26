import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { PetBanner } from "@/components/PetBanner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EstimateDialogProvider } from "@/components/estimate/EstimateDialogProvider";

// Вариативный шрифт с осью ширины: узкое начертание для заголовков, обычное для текста
const plexSans = IBM_Plex_Sans({
   variable: "--font-plex-sans",
   subsets: ["latin", "cyrillic"],
   axes: ["wdth"],
   display: "swap",
});

const plexMono = IBM_Plex_Mono({
   variable: "--font-plex-mono",
   subsets: ["latin", "cyrillic"],
   weight: ["400", "500"],
   display: "swap",
});

export const metadata: Metadata = {
   title: {
      default: "Асфальтирование в Волгограде — Асфальт",
      template: "%s — Асфальт",
   },
   description:
      "Укладка асфальта для дворов, дорог, парковок и промплощадок в Волгограде и области. Своя техника, смета за 24 часа, гарантия на покрытие от 3 лет.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="ru" className={cn(plexSans.variable, plexMono.variable)}>
         <body className="flex min-h-dvh flex-col">
            <EstimateDialogProvider>
               <PetBanner />
               <Header />
               <main className="flex-1">{children}</main>
               <Footer />
               <FloatingActions />
               <ScrollReveal />
            </EstimateDialogProvider>
            <Toaster position="bottom-center" />
         </body>
      </html>
   );
}
