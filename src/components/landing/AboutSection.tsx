import { motion } from "framer-motion";
import { Shield, Eye, Lock, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Real-time Protection",
    description:
      "Analyze websites instantly as you browse. Get trust scores before you interact with any site.",
  },
  {
    icon: Eye,
    title: "Privacy Insights",
    description:
      "Detect tracking cookies, fingerprinting techniques, and data collection practices.",
  },
  {
    icon: Lock,
    title: "Security Analysis",
    description:
      "Examine SSL certificates, security headers, and potential vulnerabilities.",
  },
  {
    icon: Zap,
    title: "AI Explanations",
    description:
      "Get clear, human-readable explanations of security findings powered by advanced AI.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            About SenseAI
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Your Personal Web Security Guard
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            SenseAI is a comprehensive web security tool that analyzes websites 
            in real-time, giving you the confidence to browse safely and protect your 
            personal data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
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
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
