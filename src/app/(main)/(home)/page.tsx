import { About } from "@/components/About";
import { Benefits } from "@/components/Benefits";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";

export default function HomePage() {
   return (
      <div className="">
         <About />
         <Services />
         <Benefits />
         <Process />
      </div>
   );
}