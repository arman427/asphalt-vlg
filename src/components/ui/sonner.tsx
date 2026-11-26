"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
   return (
      <Sonner
         theme="light"
         className="toaster group"
         icons={{
            success: <CircleCheckIcon className="size-4" strokeWidth={1.75} />,
            info: <InfoIcon className="size-4" strokeWidth={1.75} />,
            warning: <TriangleAlertIcon className="size-4" strokeWidth={1.75} />,
            error: <OctagonXIcon className="size-4" strokeWidth={1.75} />,
            loading: <Loader2Icon className="size-4 animate-spin" />,
         }}
         style={
            {
               "--normal-bg": "var(--card)",
               "--normal-text": "var(--foreground)",
               "--normal-border": "var(--border)",
               "--border-radius": "var(--radius)",
            } as React.CSSProperties
         }
         toastOptions={{
            classNames: {
               toast: "font-sans",
               description: "!text-subtle",
            },
         }}
         {...props}
      />
   )
}

export { Toaster }
