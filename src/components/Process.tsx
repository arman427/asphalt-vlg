import { cn } from "@/lib/utils";
import { Container } from "./container";
import { PROCESS_DATA } from "@/constants/process-data";

interface Props {
   className?: string
}

export function Process({ className }: Props) {
   return (
      <div className="bg-accent py-20" id="etapy">
         <Container className={cn("", className)}>
            <h1 className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider text-center mb-10">
               Этапы работы
            </h1>

            {/* relative — чтобы разместить fade-оверлей поверх грида */}
            <div className="relative">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {PROCESS_DATA.map((item, index) => {
                     const isLast = index === PROCESS_DATA.length - 1;

                     return (
                        <div
                           key={index}
                           className={cn(
                              "w-full p-8 border-dashed border-white/40",
                              // mobile: 1 колонка — только border-b, кроме последнего
                              !isLast ? "border-b" : "border-b-0",
                              // sm: 2 колонки
                              index % 2 === 0 ? "sm:border-r" : "sm:border-r-0",
                              index < PROCESS_DATA.length - 2 ? "sm:border-b" : "sm:border-b-0",
                              // lg: 3 колонки (твоя исходная логика)
                              index % 3 !== 2 ? "lg:border-r" : "lg:border-r-0",
                              index < 3 ? "lg:border-b" : "lg:border-b-0",
                           )}
                        >
                           <div className="max-w-130">
                              <div className="relative">
                                 <span
                                    className="absolute left-0 -top-10 sm:-top-12 lg:-top-16 xl:-top-20 text-6xl sm:text-7xl lg:text-8xl font-title leading-none text-white/70 pointer-events-none select-none [mask-image:linear-gradient(to_bottom,black_35%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_bottom,black_35%,transparent_85%)]"
                                 >
                                    0{index + 1}
                                 </span>

                                 <h4 className="uppercase text-lg sm:text-xl lg:text-2xl xl:text-3xl mt-10 sm:mt-12 lg:mt-16 xl:mt-20 mb-2 font-medium tracking-tighter">
                                    {item.title}
                                 </h4>
                              </div>
                              <p className="text-black/70 leading-relaxed text-sm sm:text-base">
                                 {item.text}
                              </p>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </Container>
      </div>
   );
}