import { Hero } from "@/components/main/hero";
import { Skills } from "@/components/main/skills";
import ServicesInteractiveSection from "@/components/main/ServicesInteractiveSection";
import SkillsSticky from "@/components/main/SkillsStickScrollComponent";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <ServicesInteractiveSection />
        <SkillsSticky />
      </div>
    </main>
  );
}
