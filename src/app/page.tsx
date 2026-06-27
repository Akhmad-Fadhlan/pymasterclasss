import { Navbar } from "@/components/landing-page/Navbar";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { Partners } from "@/components/landing-page/Partners";
import { Features } from "@/components/landing-page/Features";
import { LearningPath } from "@/components/landing-page/LearningPath";
import { ProjectShowcase } from "@/components/landing-page/ProjectShowcase";
import { StatsBanner } from "@/components/landing-page/StatsBanner";
import { Pricing } from "@/components/landing-page/Pricing";
import { Testimonial } from "@/components/landing-page/Testimonial";
import { FAQ } from "@/components/landing-page/FAQ";
import { Footer } from "@/components/landing-page/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <Partners />
        <Features />
        <LearningPath />
        <ProjectShowcase />
        <StatsBanner />
        <Pricing />
        <Testimonial />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

