import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PricePage } from "@/components/PricePage";
import { getPriceCategory, PRICE_CATEGORIES } from "@/constants/prices-data";

// Только пять страниц из прайса, остальные адреса — 404
export const dynamicParams = false;

export function generateStaticParams() {
   return PRICE_CATEGORIES.map((category) => ({ slug: category.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { slug } = await params;
   const category = getPriceCategory(slug);
   if (!category) return {};

   return {
      title: `${category.title}: цены в Волгограде`,
      description: category.description,
   };
}

export default async function PricesPage({ params }: Props) {
   const { slug } = await params;
   const category = getPriceCategory(slug);
   if (!category) notFound();

   return <PricePage category={category} />;
}
