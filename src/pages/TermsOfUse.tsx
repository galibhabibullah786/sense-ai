import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { Footer } from "@/components/landing/Footer";

const TermsOfUse = () => (
  <div className="min-h-screen flex flex-col">
    <LandingNavbar />
    <main className="flex-1 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-muted-foreground">Last updated: January 2026</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. General Terms</h2>
          <p className="text-muted-foreground mb-4">These terms govern your use of TrustAnalyzer and all related services.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Permitted Use</h2>
          <p className="text-muted-foreground mb-4">You may use our service for personal, non-commercial security analysis purposes.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Restrictions</h2>
          <p className="text-muted-foreground mb-4">You may not reverse engineer, modify, or distribute our software without permission.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsOfUse;
