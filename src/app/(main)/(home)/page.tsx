import { About } from "@/components/About";
import { Benefits } from "@/components/Benefits";
import { Contacts } from "@/components/Contacts";
import { FeedBack } from "@/components/FeedBack";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";

export default function HomePage() {
   return (
      <div className="">
         <About />
         <Services />
         <Benefits />
         <Process />
         <FeedBack />
         <Projects />
         <Contacts />
      </div>
   );
}