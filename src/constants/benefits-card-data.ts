import { BadgeCheck, Calculator, LucideIcon, Settings2 } from "lucide-react";

export interface Benefits_card {
   id: number;
   title: string;
   icon: LucideIcon;
   imageUrl: string;
   description: string;
}

export const BENEFITS_CARD_DATA: Benefits_card[] = [
   {
      id: 1,
      title: "БЫСТРЫЙ РАСЧЁТ\nСТОИМОСТИ",
      icon: Calculator,
      imageUrl: "/benefits_img_1.png",
      description: "Оперативный замер объекта и точная смета в течение 24 часов без скрытых платежей и задержек"
   },
   {
      id: 2,
      title: "ТОЧНО ПОДОБРАННАЯ\nТЕХНОЛОГИЯ",
      icon: Settings2,
      imageUrl: "/benefits_img_2.png",
      description: "Индивидуальный подбор состава асфальта и технологии укладки под особенности вашего объекта"
   },
   {
      id: 3,
      title: "КОНТРОЛЬ КАЧЕСТВА\nНА ВСЕХ ЭТАПАХ",
      icon: BadgeCheck,
      imageUrl: "/benefits_img_3.png",
      description: "Постоянный надзор за уплотнением, толщиной и качеством покрытия на каждом этапе работ"
   },
];