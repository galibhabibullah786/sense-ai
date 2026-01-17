import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TrustScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const getScoreColor = (score: number) => {
  if (score >= 70) return { color: "hsl(152, 76%, 40%)", label: "Safe" };
  if (score >= 40) return { color: "hsl(38, 92%, 50%)", label: "Caution" };
  return { color: "hsl(0, 84%, 60%)", label: "Risk" };
};

export const TrustScoreGauge = ({
  score,
  size = "md",
  label = "Trust Score",
  className,
}: TrustScoreGaugeProps) => {
  const { color, label: statusLabel } = getScoreColor(score);
  const circumference = 2 * Math.PI * 45;
  const progress = (score / 100) * circumference;

  const sizeConfig = {
    sm: { width: 120, fontSize: "text-2xl", labelSize: "text-xs" },
    md: { width: 180, fontSize: "text-4xl", labelSize: "text-sm" },
    lg: { width: 240, fontSize: "text-5xl", labelSize: "text-base" },
  };

  const config = sizeConfig[size];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: config.width, height: config.width }}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={cn("font-bold tabular-nums", config.fontSize)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {score}
          </motion.span>
          <span className={cn("text-muted-foreground font-medium", config.labelSize)}>
            {statusLabel}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-muted-foreground text-sm font-medium">{label}</span>
      )}
    </div>
  );
};
