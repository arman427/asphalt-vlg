interface Contacts_Social {
   id: number;
   iconUrl: string;
   href: string;
}

export const CONTACTS_SOCIAL_DATA: Contacts_Social[] = [
   {
      id: 1,
      iconUrl: "/telegram.svg",
      href: "https://t.me/armanhik7",
   },
   {
      id: 2,
      iconUrl: "/whatsapp.svg",
      href: "https://wa.me/79610599262",
   },
   {
      id: 3,
      iconUrl: "/tiktok.svg",
      href: "https://www.tiktok.com/@jsmlss60975",
   }
] as const;