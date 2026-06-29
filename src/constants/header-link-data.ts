export interface NavItem {
   id: string;
   title: string;
   href: string;
}

export const NAV_LINKS: NavItem[] = [
   { id: 'main', title: 'Главная', href: '/' },
   { id: 'about', title: 'О нас', href: '#about' },
   { id: 'services', title: 'Услуги', href: '#services' },
   { id: 'etapy', title: 'Этапы работы', href: '#etapy' },
   { id: 'prices', title: 'Цены', href: '#prices' },
   { id: 'portfolio', title: 'Наши работы', href: '#portfolio' },
   { id: 'contacts', title: 'Контакты', href: '#contacts' },
];