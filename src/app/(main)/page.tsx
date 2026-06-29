import { About } from "@/components/About";
import { Benefits } from "@/components/Benefits";
import { Container } from "@/components/container";
import { Header } from "@/components/Header";
import { Services } from "@/components/Services";

export default function HomePage() {
   return (
      <div className="">
         <Header />
         <About />
         <Services />
         <Benefits />
      </div>
   );
}