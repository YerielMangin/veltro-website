import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "clay" | "moss" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium",
        variant === "default" && "bg-cream-300 text-charcoal",
        variant === "clay" && "bg-clay text-cream",
        variant === "moss" && "bg-moss/10 text-moss",
        variant === "outline" && "border border-cream-300 text-charcoal/60",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
