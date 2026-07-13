import { VisuallyHidden } from "radix-ui";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectProps } from "./select-item";
import {
   FEEDBACK_SELECT_DATA_1,
   FEEDBACK_SELECT_DATA_2,
   FEEDBACK_SELECT_DATA_3,
} from "@/constants/feedback-select-data";
import { Input } from "./ui/input";
import { IMaskInput } from "react-imask";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { sendContactForm } from "@/server-actions/sendContactForm";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

const schema = z.object({
   name: z.string().min(2, "Введите имя"),
   phone: z.string().min(10, "Введите номер телефона"),
   location: z.string({ message: "Выберите тип объекта" }),
   load: z.string({ message: "Выберите нагрузку" }),
   base: z.string({ message: "Выберите основание" }),
   extras: z.object({
      bordur: z.boolean(),
      kanalization: z.boolean(),
      demontaz: z.boolean(),
      vivozGrunta: z.boolean(),
   }),
   honeypot: z.any().optional()
});

export type FeedBackFormData = z.infer<typeof schema>;

const EXTRAS = [
   { name: "bordur", label: "Установка бордюра" },
   { name: "kanalization", label: "Ливневая канализация" },
   { name: "demontaz", label: "Демонтаж покрытия" },
   { name: "vivozGrunta", label: "Вывоз грунта / мусора" },
] as const;


interface Props {
   className?: string;
   open: boolean;
   handleClose: () => void;
}

export function DialogModal({ className, open, handleClose }: Props) {
   const [loading, setLoading] = useState(false);

   const {
      handleSubmit,
      control,
      register,
      reset,
      setValue,
      formState: { errors, isSubmitting },
   } = useForm<FeedBackFormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         name: "",
         phone: "",
         location: "",
         load: "",
         base: "",
         extras: {
            bordur: false,
            kanalization: false,
            demontaz: false,
            vivozGrunta: false,
         },
      },
   });

   const onSubmit = async (data: FeedBackFormData) => {
      if (data.honeypot) {
         return;
      }
      setLoading(true)
      document.body.style.overflow = "hidden";
      try {
         const result = await sendContactForm({
            ...data,
            formTitle: "Расчет стоимости"
         });
         if (result.success) {
            toast.success("Форма успешно отправилась.");
         } else {
            toast.error(result.error || "Попробуйте позже.");
         }
      } catch (error) {
         console.log(error);
         toast.error("Неизвестная ошибка. Попробуйте позже");
      } finally {
         document.body.style.overflow = "";
         setLoading(false);
         reset();
      }
   };

   return (
      <Dialog open={open} onOpenChange={(newOpen) => {
         if (!newOpen) {
            const selectContent = document.querySelector('[role="listbox"]');
            if (selectContent) {
               return;
            }
         }
         handleClose();
      }}>
         <DialogContent
            className="w-[calc(100vw-32px)] max-w-md sm:max-w-2xl border-none max-h-[90dvh] overflow-y-auto"
            aria-describedby={undefined}
         >
            <div className="w-full rounded-2xl p-8 lg:p-8 lg:pb-2">
               <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="flex flex-col gap-1.5 text-foreground">
                        <Input
                           {...register("name")}
                           label="Ваше имя"
                        />
                        {errors.name && (
                           <span className="text-accent text-xs">{errors.name.message}</span>
                        )}
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <div className="relative w-full pt-4">
                           <IMaskInput
                              mask="+{7} (000) 000-00-00"
                              lazy={false}
                              type="tel"
                              id="phone"
                              {...register("phone")}
                              onAccept={(value) => {
                                 setValue("phone", String(value), { shouldValidate: true })
                              }}
                              placeholder=" "
                              className="peer h-8 w-full border-b border-input bg-transparent px-0 py-4 text-base outline-none transition-all md:text-lg text-foreground"
                           />

                           <label
                              htmlFor="phone"
                              className="absolute left-0 top-5 text-base text-muted-foreground transition-all duration-200 ease-out origin-top-left pointer-events-none peer-focus:-translate-y-5 peer-focus:scale-85 peer-focus:text-ring peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-85 md:text-sm"
                           >
                              Ваш телефон
                           </label>

                           <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-foreground/60 transition-transform duration-200 ease-out peer-focus:scale-x-100" />
                        </div>

                        {errors.phone && (
                           <span className="text-accent text-xs">{errors.phone.message}</span>
                        )}
                     </div>
                  </div>


                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-wider">Тип объекта</label>
                        <Controller
                           control={control}
                           name="location"
                           render={({ field }) => (
                              <SelectProps
                                 value={field.value}
                                 onValueChange={field.onChange}
                                 data={FEEDBACK_SELECT_DATA_1}
                              />
                           )}
                        />
                        {errors.location && (
                           <span className="text-accent text-xs">{errors.location.message}</span>
                        )}
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-wider">Нагрузка</label>
                        <Controller
                           control={control}
                           name="load"
                           render={({ field }) => (
                              <SelectProps
                                 value={field.value}
                                 onValueChange={field.onChange}
                                 data={FEEDBACK_SELECT_DATA_2}
                              />
                           )}
                        />
                        {errors.load && (
                           <span className="text-accent text-xs">{errors.load.message}</span>
                        )}
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-wider">Текущее основание</label>
                        <Controller
                           control={control}
                           name="base"
                           render={({ field }) => (
                              <SelectProps
                                 value={field.value}
                                 onValueChange={field.onChange}
                                 data={FEEDBACK_SELECT_DATA_3}
                              />
                           )}
                        />
                        {errors.base && (
                           <span className="text-accent text-xs">{errors.base.message}</span>
                        )}
                     </div>
                  </div>

                  <div className="h-px bg-foreground/10" />

                  <div className="flex flex-col gap-3">
                     <p className="text-xs uppercase tracking-wider">Дополнительно</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {EXTRAS.map(({ name, label }) => (
                           <div key={name} className="flex items-center text-foreground gap-3 group">
                              <Controller
                                 control={control}
                                 name={`extras.${name}`}
                                 render={({ field }) => (
                                    <>
                                       <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                          className="border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                                       />

                                       <span
                                          onClick={() => field.onChange(!field.value)}
                                          className="text-sm cursor-pointer select-none"
                                       >
                                          {label}
                                       </span>
                                    </>
                                 )}
                              />
                           </div>
                        ))}
                     </div>
                  </div>

                  <button
                     type="submit"
                     className="w-full flex items-center justify-center mt-auto bg-accent h-14 cursor-pointer font-title font-medium relative group overflow-hidden disabled:opacity-60"
                  >
                     <span className="relative z-10 group-hover:text-background duration-400 ease-in-out">
                        {
                           loading ? (
                              <Spinner />
                           ) : (
                              <span>Расчитать</span>
                           )
                        }
                     </span>
                     <div className="absolute w-full h-full bg-foreground transition-all duration-500 ease -left-full top-0 group-hover:left-0" />
                  </button>

                  <p className="text-center text-foreground text-xs">
                     Нажимая кнопку, вы соглашаетесь с <span className="text-accent">политикой конфиденциальности</span>
                  </p>

                  <input
                     type="text"
                     tabIndex={-1}
                     autoComplete="off"
                     aria-hidden="true"
                     style={{
                        position: "absolute",
                        left: "-9999px",
                        opacity: 0,
                     }}
                     {...register("honeypot")}
                  />
               </form>
            </div>

            <VisuallyHidden.Root>
               <DialogTitle></DialogTitle>
            </VisuallyHidden.Root>
         </DialogContent>
      </Dialog>

   );
}