import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Benefits } from "@/components/Benefits";
import { Process } from "@/components/Process";
import { Estimate } from "@/components/Estimate";
import { Projects } from "@/components/Projects";
import { Contacts } from "@/components/Contacts";

export default function HomePage() {
   return (
      <>
         <Hero />
         <About />
         <Services />
         <Benefits />
         <Process />
         <Estimate />
         <Projects />
         <Contacts />
      </>
   );
}
