import { PRICE_CATEGORIES, priceHref } from "./prices-data";

interface Header_Dropdown_Data {
   id: number;
   title: string;
   href: string;
}

export const HEADER_DROPDOWN_DATA: Header_Dropdown_Data[] = PRICE_CATEGORIES.map((category, index) => ({
   id: index + 1,
   title: category.title,
   href: priceHref(category.slug),
}));
