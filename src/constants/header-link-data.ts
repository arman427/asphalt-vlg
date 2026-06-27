export interface NavItem {
   id: string;
   title: string;
   href: string;
}

export const NAV_LINKS: NavItem[] = [
   { id: 'main', title: 'Главная', href: '/' },
   { id: 'services', title: 'Услуги', href: '#services' }, // Можно использовать хэши для лендинга
   { id: 'prices', title: 'Цены', href: '#prices' },
   { id: 'portfolio', title: 'Наши работы', href: '#portfolio' },
   { id: 'about', title: 'О компании', href: '#about' },
   { id: 'contacts', title: 'Контакты', href: '#contacts' },
];