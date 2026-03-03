import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Chrome,
  Shield,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Puzzle,
  Link2,
  MousePointer,
  Eye,
  CheckCircle,
  Monitor,
  Settings,
} from "lucide-react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Extension metadata ────────────────────────────────────────────────────────
// Update EXTENSION_VERSION and EXTENSION_DOWNLOAD_URL when releasing new builds.
// See docs/extension-release.md for the full release workflow.
const EXTENSION_VERSION = "1.0.0";
const EXTENSION_DOWNLOAD_URL = "/downloads/sense-ai-extension-latest.zip";
const CHROME_WEBSTORE_URL = ""; // Set when published to Chrome Web Store

// ── Tutorial Steps ────────────────────────────────────────────────────────────
const tutorialSteps = [
  {
    id: 1,
    icon: Download,
    title: "Download the Extension",
    description:
      "Click the download button above to get the latest SenseAI extension package. The file will be saved as a .zip archive to your Downloads folder.",
    preview: {
      type: "illustration" as const,
      content: "download",
    },
  },
  {
    id: 2,
    icon: Puzzle,
    title: "Open Chrome Extensions",
    description:
      'Navigate to chrome://extensions in your browser\'s address bar. Enable "Developer mode" using the toggle in the top-right corner of the page.',
    preview: {
      type: "illustration" as const,
      content: "extensions-page",
    },
  },
  {
    id: 3,
    icon: Monitor,
    title: "Load the Extension",
    description:
      'Click "Load unpacked" and select the extracted extension folder. SenseAI will appear in your extensions list with the shield icon.',
    preview: {
      type: "illustration" as const,
      content: "load-unpacked",
    },
  },
  {
    id: 4,
    icon: Settings,
    title: "Pin to Toolbar",
    description:
      "Click the puzzle-piece icon in Chrome's toolbar, then click the pin icon next to SenseAI. This keeps the extension easily accessible.",
    preview: {
      type: "illustration" as const,
      content: "pin-extension",
    },
  },
  {
    id: 5,
    icon: Link2,
    title: "Link Your Account",
    description:
      'Open the SenseAI popup and click "Link Account." Enter the code from your dashboard\'s Link Extension page to sync your browsing analysis data.',
    preview: {
      type: "illustration" as const,
      content: "link-account",
    },
  },
  {
    id: 6,
    icon: Eye,
    title: "Start Browsing Safely",
    description:
      "Visit any website and click the SenseAI icon to see a real-time trust score, signal breakdown, and AI-powered explanation. Blocked sites will be intercepted automatically.",
    preview: {
      type: "illustration" as const,
      content: "trust-analysis",
    },
  },
];

// ── Step Preview Illustration ─────────────────────────────────────────────────
function StepPreview({ content }: { content: string }) {
  const illustrations: Record<string, React.ReactNode> = {
    download: (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Download className="h-10 w-10 text-primary" />
        </div>
        <div className="w-64 h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
        <p className="text-sm text-muted-foreground font-mono">
          sense-ai-extension-v{EXTENSION_VERSION}.zip
        </p>
      </div>
    ),
    "extensions-page": (
      <div className="bg-card/50 rounded-lg border border-border p-4 mx-4">
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 bg-muted rounded px-3 py-1 text-xs font-mono text-muted-foreground">
            chrome://extensions
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold">Extensions</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Developer mode</span>
            <div className="w-9 h-5 bg-primary rounded-full relative">
              <div className="w-4 h-4 bg-background rounded-full absolute right-0.5 top-0.5" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1.5 bg-primary/10 text-primary text-xs rounded font-medium">
            Load unpacked
          </div>
          <div className="px-3 py-1.5 bg-muted text-xs rounded text-muted-foreground">
            Pack extension
          </div>
        </div>
      </div>
    ),
    "load-unpacked": (
      <div className="bg-card/50 rounded-lg border border-border p-4 mx-4">
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">SenseAI - Trust Analysis</p>
            <p className="text-xs text-muted-foreground">v{EXTENSION_VERSION} • Enabled</p>
          </div>
          <CheckCircle className="h-5 w-5 text-trust-safe shrink-0" />
        </div>
      </div>
    ),
    "pin-extension": (
      <div className="flex items-center gap-2 bg-card/50 rounded-lg border border-border p-4 mx-4">
        <div className="flex items-center gap-1 px-3 py-2 bg-muted rounded-lg">
          <Puzzle className="h-4 w-4 text-muted-foreground" />
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg flex-1">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium">SenseAI</span>
          <div className="ml-auto w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    ),
    "link-account": (
      <div className="bg-card/50 rounded-lg border border-border p-4 mx-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Link2 className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-semibold mb-2">Enter Link Code</p>
          <div className="bg-muted rounded-lg p-3 mb-3 font-mono text-lg tracking-widest text-center">
            TRUST-XXXXXX
          </div>
          <div className="inline-flex px-4 py-1.5 bg-primary text-primary-foreground text-xs rounded-lg font-medium">
            Link Account
          </div>
        </div>
      </div>
    ),
    "trust-analysis": (
      <div className="bg-card/50 rounded-lg border border-border p-4 mx-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-trust-safe/10 flex items-center justify-center">
            <Shield className="h-4 w-4 text-trust-safe" />
          </div>
          <div>
            <p className="text-sm font-semibold">example.com</p>
            <p className="text-xs text-trust-safe font-medium">Trust Score: 87 — Safe</p>
          </div>
        </div>
        <div className="space-y-1.5">
          {[
            { label: "SSL/TLS", score: 100, color: "bg-trust-safe" },
            { label: "Headers", score: 75, color: "bg-trust-safe" },
            { label: "Cookies", score: 80, color: "bg-trust-safe" },
            { label: "Trackers", score: 60, color: "bg-trust-warning" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-16">{s.label}</span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full", s.color)} style={{ width: `${s.score}%` }} />
              </div>
              <span className="text-xs font-mono w-7 text-right">{s.score}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-[200px] flex items-center justify-center">
      {illustrations[content] ?? (
        <div className="w-48 h-32 bg-muted rounded-lg animate-pulse" />
      )}
    </div>
  );
}

// ── Main Page Component ───────────────────────────────────────────────────────
const GetExtension = () => {
  const [activeStep, setActiveStep] = useState(0);

  const goToStep = (index: number) => {
    if (index >= 0 && index < tutorialSteps.length) {
      setActiveStep(index);
    }
  };

  const downloadUrl = CHROME_WEBSTORE_URL || EXTENSION_DOWNLOAD_URL;
  const isWebStore = !!CHROME_WEBSTORE_URL;

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
            >
              <Chrome className="h-4 w-4" />
              <span className="text-sm font-medium">
                Chrome / Chromium Extension • v{EXTENSION_VERSION}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            >
              Get the{" "}
              <span className="text-gradient">SenseAI Extension</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-white/70 max-w-xl mx-auto mb-10"
            >
              Real-time trust scores, dark-pattern blocking, and AI explanations — directly in your browser toolbar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="h-14 px-8 text-base shadow-glow gap-2"
                asChild
              >
                <a href={downloadUrl} download={!isWebStore}>
                  <Download className="h-5 w-5" />
                  {isWebStore ? "Add to Chrome" : "Download Extension"}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base border-white/20 text-white hover:bg-white/10"
                onClick={() =>
                  document
                    .getElementById("tutorial")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <MousePointer className="h-5 w-5 mr-2" />
                Installation Guide
              </Button>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/50"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-trust-safe" />
                <span>Chrome / Edge / Brave</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-trust-safe" />
                <span>Manifest V3</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-trust-safe" />
                <span>Open Source</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tutorial Carousel */}
      <section id="tutorial" className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Installation Guide
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
              Up & Running in Minutes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Follow these steps to install and configure the SenseAI browser extension.
            </p>
          </motion.div>

          {/* Carousel */}
          <div className="max-w-4xl mx-auto">
            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {tutorialSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                    activeStep === index
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <span className="hidden sm:inline">Step {step.id}</span>
                  <span className="sm:hidden">{step.id}</span>
                </button>
              ))}
            </div>

            {/* Carousel content */}
            <div className="relative bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-0"
                >
                  {/* Text */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      {(() => {
                        const Icon = tutorialSteps[activeStep].icon;
                        return <Icon className="h-7 w-7 text-primary" />;
                      })()}
                    </div>
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                      Step {tutorialSteps[activeStep].id} of {tutorialSteps.length}
                    </span>
                    <h3 className="text-2xl font-bold mb-4">
                      {tutorialSteps[activeStep].title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {tutorialSteps[activeStep].description}
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="bg-muted/30 border-t md:border-t-0 md:border-l border-border flex items-center justify-center p-8">
                    <StepPreview
                      content={tutorialSteps[activeStep].preview.content}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between px-8 py-4 border-t border-border bg-muted/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToStep(activeStep - 1)}
                  disabled={activeStep === 0}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {activeStep + 1} / {tutorialSteps.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToStep(activeStep + 1)}
                  disabled={activeStep === tutorialSteps.length - 1}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Extension Features
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
              What You Get
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Real-time Trust Scores",
                desc: "Instant 0-100 trust score for every website, displayed directly in the extension popup.",
              },
              {
                icon: Eye,
                title: "Signal Breakdown",
                desc: "Detailed analysis of cookies, trackers, fingerprinting, security headers, and SSL/TLS.",
              },
              {
                title: "AI Explanations",
                icon: MousePointer,
                desc: "Natural-language explanations of why a site is safe or dangerous, powered by LLM analysis.",
              },
              {
                icon: Shield,
                title: "Dark Pattern Blocking",
                desc: "Automatically blocks navigation to known phishing, scam, and dark-pattern domains.",
              },
              {
                icon: Link2,
                title: "Account Sync",
                desc: "Link your extension to your SenseAI dashboard to sync sessions, reports, and whitelists.",
              },
              {
                icon: Monitor,
                title: "Lightweight & Private",
                desc: "Under 200KB. All analysis data stays between your browser and your SenseAI backend.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Browse Safely?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download the extension and create a free account to get started.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base shadow-glow gap-2" asChild>
                <a href={downloadUrl} download={!isWebStore}>
                  <Download className="h-5 w-5" />
                  Download Extension
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base" asChild>
                <Link to="/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetExtension;
