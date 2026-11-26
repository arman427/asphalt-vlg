import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
   className?: string;
   children: ReactNode;
}

export function Container({ className, children }: Props) {
   return <div className={cn("mx-auto w-full max-w-[84rem] px-5 sm:px-8", className)}>{children}</div>;
}
