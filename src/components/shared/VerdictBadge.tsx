import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, ShieldAlert } from "lucide-react";

interface VerdictBadgeProps {
  verdict: "safe" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const verdictConfig = {
  safe: {
    label: "Safe",
    icon: Shield,
    className: "bg-trust-safe/10 text-trust-safe border-trust-safe/30",
  },
  warning: {
    label: "Warning",
    icon: AlertTriangle,
    className: "bg-trust-warning/10 text-trust-warning border-trust-warning/30",
  },
  danger: {
    label: "Danger",
    icon: ShieldAlert,
    className: "bg-trust-danger/10 text-trust-danger border-trust-danger/30",
  },
};

export const VerdictBadge = ({
  verdict,
  size = "md",
  className,
}: VerdictBadgeProps) => {
  const config = verdictConfig[verdict];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border",
        sizeClasses[size],
        config.className,
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
};
