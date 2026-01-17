import { motion } from "framer-motion";
import { Download, MousePointer, BarChart3, Shield } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Download,
    title: "Install the Extension",
    description:
      "Add TrustAnalyzer to your browser with one click. Available for Chrome, Firefox, and Edge.",
  },
  {
    number: "02",
    icon: MousePointer,
    title: "Browse Normally",
    description:
      "Continue browsing the web as you always do. TrustAnalyzer works silently in the background.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Get Instant Analysis",
    description:
      "See real-time trust scores and security insights for every website you visit.",
  },
  {
    number: "04",
    icon: Shield,
    title: "Stay Protected",
    description:
      "Make informed decisions about which sites to trust with your data and attention.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Simple Setup, Powerful Protection
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started in minutes and enjoy peace of mind while browsing.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Step number with icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-card border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
