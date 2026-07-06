interface Header_Dropdown_Data {
   id: number;
   title: string;
   href: string;
}

export const HEADER_DROPDOWN_DATA: Header_Dropdown_Data[] = [
   {
      id: 1,
      title: "Асфальтирование — укладка асфальта",
      href: "/tseni/asfaltirovanie-ykladka-asfalta"
   },
   {
      id: 2,
      title: "Устройство основания для асфальтирования",
      href: "/tseni/ystroistvo-ocnovaniya"
   },
   {
      id: 3,
      title: "Земляные работы",
      href: "/tseni/zemlyanie-raboti"
   },
   {
      id: 4,
      title: "Демонтажные работы",
      href: "/tseni/demontaznie-raboti"
   },
   {
      id: 5,
      title: "Благоустройство",
      href: "/tseni/blagoystroistvo"
   },
] as const;