import Hero from "@/components/hero"
import GreenInfo from "@/components/greeninfo";
import Program from "@/components/program"
import { getNextWeddingDate } from "@/lib/weddingCountdown";
import Gallery from "@/components/gallery";
import Contact from "@/components/contact";
import WeddingDate from "@/components/weddingdate";


export default function Home() {
  const targetDate = getNextWeddingDate(new Date());

  return (
    <main>
      {/* <Test /> */}
      <Hero />
      <GreenInfo />
      <Program targetDateIso={targetDate.toISOString()} />
      <Gallery />
      <Contact />
      <WeddingDate targetDateIso={targetDate.toISOString()} />
      {/*
      
      <WeddingDate targetDateIso={targetDate.toISOString()} /> */}
    </main>
  );
}
