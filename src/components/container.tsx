import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
   className?: string;
   children: ReactNode
}

export function Container({ className, children }: Props) {
   return (
      <div className={cn('mx-auto max-w-[1800px] px-4', className)}>
         {children}
      </div>
   )
};