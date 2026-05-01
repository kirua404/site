import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AppsSection } from "@/components/AppsSection";
import { ModulesSection } from "@/components/ModulesSection";
import { WhySection } from "@/components/WhySection";
import { AboutSection } from "@/components/AboutSection";
import { PricingSection } from "@/components/PricingSection";
import { QuoteSection } from "@/components/QuoteSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollSection } from "@/components/ScrollSection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "CMX Technologie — Solutions de gestion scolaire au Congo" },
      { name: "description", content: "SchoolFinance Manager & EduManager : deux applications congolaises tout-en-un pour gérer les finances et les notes de votre école, 100% hors-ligne, par de jeunes entrepreneurs du Congo." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ScrollSection animation="fade-up">
        <AppsSection />
      </ScrollSection>
      <ScrollSection animation="fade-up" delay={100}>
        <ModulesSection />
      </ScrollSection>
      <ScrollSection animation="fade-left">
        <AboutSection />
      </ScrollSection>
      <ScrollSection animation="fade-right">
        <WhySection />
      </ScrollSection>
      <ScrollSection animation="scale">
        <PricingSection />
      </ScrollSection>
      <ScrollSection animation="fade-up">
        <QuoteSection />
      </ScrollSection>
      <ScrollSection animation="fade-up">
        <ReviewsSection />
      </ScrollSection>
      <ScrollSection animation="fade-up" delay={100}>
        <FAQSection />
      </ScrollSection>
      <ScrollSection animation="fade-up">
        <ContactSection />
      </ScrollSection>
      <Footer />
    </div>
  );
}
