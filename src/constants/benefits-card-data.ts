import { BadgeCheck, Calculator, LucideIcon, Settings2 } from "lucide-react";

export interface Benefits_card {
   id: number;
   title: string;
   icon: LucideIcon;
   description: string;
}

export const BENEFITS_CARD_DATA: Benefits_card[] = [
   {
      id: 1,
      title: "Быстрый расчёт стоимости",
      icon: Calculator,
      description: "Оперативный замер объекта и точная смета в течение 24 часов без скрытых платежей и задержек.",
   },
   {
      id: 2,
      title: "Точно подобранная технология",
      icon: Settings2,
      description: "Индивидуальный подбор состава асфальта и технологии укладки под особенности вашего объекта.",
   },
   {
      id: 3,
      title: "Контроль качества на всех этапах",
      icon: BadgeCheck,
      description: "Постоянный надзор за уплотнением, толщиной и качеством покрытия на каждом этапе работ.",
   },
];
