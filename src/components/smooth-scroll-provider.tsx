"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
   useEffect(() => {
      const lenis = new Lenis({
         duration: 1.2,
         easing: (t) => 1 - Math.pow(1 - t, 7),
         smoothWheel: true,
         infinite: false,
         anchors: {
            offset: -100
         }
      });

      function raf(time: number) {
         lenis.raf(time);
         requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
         lenis.destroy();
      };
   }, []);

   return <>{children}</>;
}