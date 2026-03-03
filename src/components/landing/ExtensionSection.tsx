import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Download,
  Shield,
  Eye,
  Zap,
  Lock,
  Chrome,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Eye,
    title: "Real-time Detection",
    description:
      "Instantly identifies dark patterns, deceptive UI tricks, and manipulative design as you browse.",
  },
  {
    icon: Zap,
    title: "Lightweight & Fast",
    description:
      "Runs silently in the background with zero noticeable impact on your browsing speed.",
  },
  {
    icon: Lock,
    title: "Privacy Focused",
    description:
      "All analysis happens locally. No browsing data is shared without your explicit consent.",
  },
  {
    icon: Shield,
    title: "Trust Scoring",
    description:
      "Every page gets a trust score so you can make informed decisions at a glance.",
  },
];

export const ExtensionSection = () => {
  return (
    <section id="extension" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Browser Extension
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Your Guardian in the Browser
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The SenseAI extension lives inside your browser and keeps you safe
            from deceptive websites — automatically, effortlessly.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-card to-primary/5 border border-border p-8 sm:p-12"
        >
          {/* Decorative glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            {/* Icon block */}
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 shrink-0">
              <Chrome className="h-10 w-10 text-primary" />
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Ready to browse safely?
              </h3>
              <p className="text-muted-foreground max-w-lg">
                Download the SenseAI extension, follow the quick setup guide, and
                link it to your dashboard — all in under two minutes.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button size="lg" asChild>
                <Link to="/get-extension">
                  <Download className="h-4 w-4 mr-2" />
                  Get Extension
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
