import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { ExtensionSection } from "@/components/landing/ExtensionSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const location = useLocation();

  // Handle scrolling to a section after navigation (e.g. from /get-extension)
  useEffect(() => {
    const scrollTarget =
      (location.state as { scrollTo?: string } | null)?.scrollTo ||
      window.location.hash.replace("#", "");

    if (scrollTarget) {
      // Wait for DOM sections to render before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);

      // Clear state so back-navigation doesn't re-trigger scroll
      window.history.replaceState({}, document.title);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <ReviewsSection />
      <ExtensionSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
