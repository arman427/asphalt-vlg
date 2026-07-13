import { LucideIcon, Mail, MapPin, Phone } from "lucide-react";

interface Contacts_Data {
   id: number;
   icon: LucideIcon;
   title: string;
   text: string;
   href?: string;
}

export const CONTACTS_DATA: Contacts_Data[] = [
   {
      id: 1,
      icon: Mail,
      title: "E-Mail",
      text: "babayananuta11@gmail.com",
      href: "mailto:babayananuta11@gmail.com"
   },
   {
      id: 2,
      icon: Phone,
      title: "Телефон",
      text: "+7 (961) 059 92-62",
      href: "tel:+79610599262"
   },
   {
      id: 3,
      icon: MapPin,
      title: "Адрес",
      text: "Россия, г. Волгоград"
   }
] as const;