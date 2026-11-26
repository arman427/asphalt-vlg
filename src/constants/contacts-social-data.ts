import { SITE } from "./site";

interface Contacts_Social {
   id: number;
   label: string;
   iconUrl: string;
   href: string;
}

export const CONTACTS_SOCIAL_DATA: Contacts_Social[] = [
   { id: 1, label: "Telegram", iconUrl: "/telegram.svg", href: SITE.telegram },
   { id: 2, label: "WhatsApp", iconUrl: "/whatsapp.svg", href: SITE.whatsapp },
   { id: 3, label: "TikTok", iconUrl: "/tiktok.svg", href: SITE.tiktok },
];
