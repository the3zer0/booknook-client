import { Reveal } from "@/components/ui/reveal";
import { Hero } from "@/components/home/hero";
import { NewArrivals } from "@/components/home/new-arrivals";
import { ExtraSections } from "@/components/home/extra-sections";
export default function Home() {
  return (
    <>
      <Reveal>
        <Hero />
      </Reveal>
      <Reveal>
        <NewArrivals />
      </Reveal>
      <Reveal>
        <ExtraSections />
      </Reveal>
    </>
  );
}
