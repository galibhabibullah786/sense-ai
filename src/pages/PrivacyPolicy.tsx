import { Link } from "react-router-dom";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { Footer } from "@/components/landing/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col">
    <LandingNavbar />
    <main className="flex-1 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-muted-foreground">Last updated: January 2026</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-4">We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">We use the information we collect to provide, maintain, and improve our services, and to protect you and our users.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
          <p className="text-muted-foreground mb-4">We implement appropriate security measures to protect your personal information against unauthorized access.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
