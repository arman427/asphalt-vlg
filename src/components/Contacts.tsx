"use client";

import { CONTACTS_DATA } from "@/constants/contacts-data";
import { CONTACTS_SOCIAL_DATA } from "@/constants/contacts-social-data";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendContactForm } from "@/server-actions/sendContactForm";
import { isValidPhoneNumber } from "libphonenumber-js";
import { IMaskInput } from "react-imask";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";

interface Props {
   className?: string
}

const schema = z.object({
   name: z.string().min(2, "Минимум 2 символа"),
   phone: z.string().refine(
      (val) => isValidPhoneNumber(val, "RU"),
      { message: "Введите корректный номер телефона" }
   ),
   email: z.email("Введите корректный e-mail"),
   message: z.string().max(120, "Максимум 120 символов"),
   honeypot: z.any().optional(),
});

export type FormData = z.infer<typeof schema>;

export function Contacts({ className }: Props) {
   const [loading, setLoading] = useState(false);
   const [isAnimate, setIsAnimate] = useState(false);

   const handleTouch = () => {
      setIsAnimate(true);
      setTimeout(() => {
         setIsAnimate(false);
      }, 500);
   };

   const form = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         name: "",
         phone: "",
         email: "",
         message: "",
      },
   });

   const onSubmit = async (data: FormData) => {
      if (data.honeypot) {
         return;
      }
      setLoading(true)
      document.body.style.overflow = "hidden";
      try {
         const result = await sendContactForm(data);
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
         form.reset();
      }
   };

   return (
      <>
         <div className="mt-30 max-w-330 mx-auto relative" id="contacti">
            <h1 className="uppercase text-2xl lg:text-3xl xl:text-4xl font-semibold font-title tracking-wider text-center mb-10">
               Контакты
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mt-10">
               <div className="h-full px-5 flex flex-col justify-between">
                  <h2 className="text-3xl lg:text-4xl font-semibold font-title mb-6 lg:mb-8">
                     Связаться с нами
                  </h2>

                  <p className="max-w-full lg:max-w-[480px] mb-6 leading-relaxed text-foreground/85">
                     Укладываем асфальт по ГОСТу в Волгограде и области. Работаем с частными
                     лицами, бизнесом и госзаказами. Гарантия на покрытие от 3 лет.
                  </p>

                  <div className="flex flex-col gap-6 mb-5">
                     <div className="w-full lg:w-[80%] h-px bg-foreground/10" />

                     <div className="grid gap-5">
                        {CONTACTS_DATA.map(({ id, icon: Icon, title, text, href }) => {
                           const Tag = href ? "a" : "div";

                           return (
                              <Tag
                                 key={id}
                                 href={href}
                                 className="flex items-start gap-3"
                              >
                                 <div className="bg-[#f3af41] flex items-center justify-center min-w-12 w-12 h-12 lg:w-14 lg:h-14 rounded-full text-white">
                                    <Icon size={20} />
                                 </div>

                                 <div>
                                    <h4 className="text-[#db9a39] text-lg lg:text-[22px] font-title font-semibold">
                                       {title}
                                    </h4>

                                    <p className="text-sm lg:text-base text-foreground/85 break-words">
                                       {text}
                                    </p>
                                 </div>
                              </Tag>
                           );
                        })}
                     </div>

                     <div className="w-full lg:w-[80%] h-px bg-foreground/10" />
                  </div>

                  <div className="flex items-center gap-3">
                     {CONTACTS_SOCIAL_DATA.map((icon) => (
                        <a
                           href={icon.href}
                           key={icon.id}
                           className="text-accent"
                           target="_blank"
                        >
                           <div
                              className="w-9 h-9 lg:w-10 lg:h-10 bg-current"
                              style={{
                                 mask: `url(${icon.iconUrl}) no-repeat center / contain`,
                                 WebkitMask: `url(${icon.iconUrl}) no-repeat center / contain`,
                              }}
                           />
                        </a>
                     ))}
                  </div>
               </div>

               <div className="p-5 sm:p-8 lg:p-10 pb-5 shadow-[0px_0px_20px_rgba(0,0,0,0.05)] rounded-3xl lg:rounded-tr-[90px]">
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="flex flex-col h-full"
                  >
                     <div className="grid gap-8 lg:gap-10 mb-8 lg:mb-10">
                        <div className="flex flex-col gap-1 relative">
                           <Input label="Имя" {...form.register("name")} />
                           {form.formState.errors.name && (
                              <span className="absolute -bottom-5 left-0 text-accent text-xs">
                                 {form.formState.errors.name.message}
                              </span>
                           )}
                        </div>

                        <div className="flex flex-col gap-1 relative">
                           <div className="relative w-full pt-4">
                              <IMaskInput
                                 mask="+{7} (000) 000-00-00"
                                 lazy={false}
                                 onAccept={(value) =>
                                    form.setValue("phone", String(value), {
                                       shouldValidate: true,
                                    })
                                 }
                                 placeholder=" "
                                 className="peer h-8 w-full border-b border-input bg-transparent px-0 py-4 text-base outline-none transition-all"
                              />

                              <label className="absolute left-0 top-5 text-base text-muted-foreground transition-all duration-200 origin-top-left pointer-events-none peer-focus:-translate-y-5 peer-focus:scale-85 peer-focus:text-ring peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-85">
                                 Телефон
                              </label>

                              <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-foreground/60 transition-transform duration-200 peer-focus:scale-x-100" />
                           </div>

                           {form.formState.errors.phone && (
                              <span className="absolute -bottom-5 left-0 text-accent text-xs">
                                 {form.formState.errors.phone.message}
                              </span>
                           )}
                        </div>

                        <div className="flex flex-col gap-1 relative">
                           <Input label="E-Mail" {...form.register("email")} />
                           {form.formState.errors.email && (
                              <span className="absolute -bottom-5 left-0 text-accent text-xs">
                                 {form.formState.errors.email.message}
                              </span>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-col gap-1 relative mb-4">
                        <Textarea label="Сообщение" {...form.register("message")} />
                        {form.formState.errors.message && (
                           <span className="absolute -bottom-5 left-0 text-accent text-xs">
                              {form.formState.errors.message.message}
                           </span>
                        )}
                     </div>

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
                        {...form.register("honeypot")}
                     />
                     <p className="text-xs text-center mb-6">Нажимая на кнопку вы даете согласие на <span className="text-accent font-medium">обработку Ваших персональных данных</span></p>
                     <button
                        type="submit"
                        onTouchStart={handleTouch}
                        className="w-full flex items-center justify-center bg-accent h-14 cursor-pointer font-title font-medium relative group overflow-hidden disabled:opacity-60"
                     >
                        <span className={`relative z-10 duration-400 ease-in-out group-hover:text-background ${isAnimate ? 'text-background' : ''}`}>
                           {loading ? <Spinner /> : <span>Отправить</span>}
                        </span>

                        <div className={`absolute w-full h-full bg-foreground transition-all duration-500 -left-full top-0 group-hover:left-0 ${isAnimate ? 'left-0' : ''}`} />
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
}