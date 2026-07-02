import { About } from "@/components/About";
import { Benefits } from "@/components/Benefits";
import { Header } from "@/components/Header";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";

export default function HomePage() {
   return (
      <div className="">
         <Header />
         <About />
         <Services />
         <Benefits />
         <Process />
      </div>
   );
}