import { cn } from "@/lib/utils";
import { FileQuestion, Search, FolderOpen } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "search" | "folder" | "question";
  action?: ReactNode;
  className?: string;
}

const icons = {
  search: Search,
  folder: FolderOpen,
  question: FileQuestion,
};

export const EmptyState = ({
  title,
  description,
  icon = "folder",
  action,
  className,
}: EmptyStateProps) => {
  const Icon = icons[icon];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      <div className="rounded-full bg-muted p-4 mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
};
