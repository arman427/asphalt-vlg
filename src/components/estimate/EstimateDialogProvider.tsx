"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EstimateForm } from "@/components/forms/EstimateForm";

interface EstimateDialogContextValue {
   open: () => void;
}

const EstimateDialogContext = createContext<EstimateDialogContextValue | null>(null);

export function EstimateDialogProvider({ children }: { children: ReactNode }) {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <EstimateDialogContext.Provider value={{ open: () => setIsOpen(true) }}>
         {children}
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-2xl">
               <DialogHeader className="pr-10">
                  <DialogTitle className="font-display text-[32px] leading-[1.05]">Расчёт стоимости</DialogTitle>
                  <DialogDescription>Заполните форму — перезвоним, уточним детали и пришлём смету</DialogDescription>
               </DialogHeader>
               <EstimateForm onSuccess={() => setIsOpen(false)} />
            </DialogContent>
         </Dialog>
      </EstimateDialogContext.Provider>
   );
}

export function useEstimateDialog() {
   const context = useContext(EstimateDialogContext);
   if (!context) {
      throw new Error("useEstimateDialog должен вызываться внутри EstimateDialogProvider");
   }
   return context;
}
