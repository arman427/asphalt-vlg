import { Clock, LucideIcon, Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "./site";

interface Contacts_Data {
   id: number;
   icon: LucideIcon;
   title: string;
   text: string;
   href?: string;
   mono?: boolean;
}

export const CONTACTS_DATA: Contacts_Data[] = [
   { id: 1, icon: Phone, title: "Телефон", text: SITE.phone, href: SITE.phoneHref, mono: true },
   { id: 2, icon: Mail, title: "E-mail", text: SITE.email, href: SITE.emailHref },
   { id: 3, icon: MapPin, title: "Где работаем", text: SITE.region },
   { id: 4, icon: Clock, title: "Режим работы", text: SITE.hours },
];
