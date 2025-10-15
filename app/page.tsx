import { Hero } from "@/components/main/hero";
import { Skills } from "@/components/main/skills";
import ServicesInteractiveSection from "@/components/main/ServicesInteractiveSection";
import SkillsSticky from "@/components/main/SkillsStickScrollComponent";
import ContactForm from "@/components/main/ContactForm";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <ServicesInteractiveSection />
        <SkillsSticky />
        <ContactForm />
      </div>
    </main>
  );
}
