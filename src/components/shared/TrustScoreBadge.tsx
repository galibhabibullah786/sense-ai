import { cn } from "@/lib/utils";

interface TrustScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const getScoreColor = (score: number) => {
  if (score >= 70) return "safe";
  if (score >= 40) return "warning";
  return "danger";
};

const getScoreLabel = (score: number) => {
  if (score >= 70) return "Safe";
  if (score >= 40) return "Warning";
  return "Danger";
};

export const TrustScoreBadge = ({
  score,
  size = "md",
  showLabel = false,
  className,
}: TrustScoreBadgeProps) => {
  const color = getScoreColor(score);

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 min-w-[40px]",
    md: "text-sm px-3 py-1 min-w-[50px]",
    lg: "text-base px-4 py-1.5 min-w-[60px]",
  };

  const colorClasses = {
    safe: "bg-trust-safe text-trust-safe-foreground",
    warning: "bg-trust-warning text-trust-warning-foreground",
    danger: "bg-trust-danger text-trust-danger-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold tabular-nums",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    >
      {score}
      {showLabel && <span className="font-medium">• {getScoreLabel(score)}</span>}
    </span>
  );
};
