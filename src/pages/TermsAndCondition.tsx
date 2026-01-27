import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { Footer } from "@/components/landing/Footer";

const TermsAndCondition = () => (
  <div className="min-h-screen flex flex-col">
    <LandingNavbar />
    <main className="flex-1 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        <div className="prose prose-lg dark:prose-invert">
          <p className="text-muted-foreground">Last updated: January 2026</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground mb-4">By accessing and using SenseAI, you accept and agree to be bound by these terms.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Service</h2>
          <p className="text-muted-foreground mb-4">You agree to use our service only for lawful purposes and in accordance with these terms.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Responsibilities</h2>
          <p className="text-muted-foreground mb-4">You are responsible for maintaining the confidentiality of your account credentials.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsAndCondition;
