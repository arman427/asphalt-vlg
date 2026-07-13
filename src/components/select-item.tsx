import { ListOrdered } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Data } from "@/constants/feedback-select-data";

interface Props {
   className?: string;
   value?: string;
   onValueChange?: (value: string) => void;
   data: Data[];
}

export function SelectProps({ className, value, onValueChange, data }: Props) {
   return (
      <Select value={value} onValueChange={onValueChange}>
         <SelectTrigger className="h-11 w-full min-w-0 px-3 flex items-center justify-between border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all [&>span]:truncate [&>span]:min-w-0" data-radix-select-trigger>
            <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
               <ListOrdered className="text-gray-400 shrink-0" size={18} />
               <SelectValue placeholder="Выбрать" />
            </div>
         </SelectTrigger>

         <SelectContent
            data-radix-select-content
            side="bottom"
            className="bg-white border-gray-200 max-h-60 overflow-y-auto"
         >
            <SelectGroup>
               {data.map((item) => (
                  <SelectItem key={item.id} value={item.value.toString()}>
                     {item.value}
                  </SelectItem>
               ))}
            </SelectGroup>
         </SelectContent>
      </Select>
   );
}