import { cn } from "@/lib/utils";

/** Одноцветная иконка из SVG-файла: красится цветом текста (currentColor) */
export function MaskIcon({ src, className }: { src: string; className?: string }) {
   return (
      <span
         aria-hidden
         className={cn("inline-block size-5 shrink-0 bg-current", className)}
         style={{
            mask: `url(${src}) no-repeat center / contain`,
            WebkitMask: `url(${src}) no-repeat center / contain`,
         }}
      />
   );
}
