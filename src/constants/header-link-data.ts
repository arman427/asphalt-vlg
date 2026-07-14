export interface NavItem {
   id: string;
   title: string;
   href: string;
}

export const NAV_LINKS: NavItem[] = [
   { id: 'main', title: 'Главная', href: '/' },
   { id: 'about', title: 'О нас', href: '/#o-nas' },
   { id: 'services', title: 'Услуги', href: '/#yslygi' },
   { id: 'etapy', title: 'Этапы работы', href: '/#etapy' },
   { id: 'prices', title: 'Цены', href: '/#prices' },
   { id: 'portfolio', title: 'Наши работы', href: '/#nashi-raboti' },
   { id: 'contacts', title: 'Контакты', href: '/#contacti' },
];