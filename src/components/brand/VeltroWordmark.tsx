import { VeltroLogo } from "./VeltroLogo";
import { cn } from "@/lib/utils";

interface VeltroWordmarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  tagline?: boolean;
  framed?: boolean;
}

const sizes = {
  sm: { icon: 20, frame: "size-8 rounded-lg", text: "text-sm font-semibold", gap: "gap-2", taglineText: "text-xs" },
  md: { icon: 24, frame: "size-11 rounded-2xl", text: "text-base font-semibold tracking-[-0.02em]", gap: "gap-3", taglineText: "text-sm" },
  lg: { icon: 32, frame: "size-14 rounded-2xl", text: "text-xl font-semibold tracking-[-0.02em]", gap: "gap-4", taglineText: "text-sm font-medium" },
};

export function VeltroWordmark({ className, size = "md", tagline = false, framed = false }: VeltroWordmarkProps) {
  const s = sizes[size];
  return (
    <div className={cn("flex items-center", s.gap, className)}>
      {framed ? (
        <div className={cn("flex items-center justify-center border border-border/60 bg-card shadow-lg backdrop-blur-sm", s.frame)}>
          <VeltroLogo size={s.icon} />
        </div>
      ) : (
        <VeltroLogo size={s.icon} />
      )}
      <div className="min-w-0">
        <p className={cn("truncate text-foreground", s.text)}>Veltro</p>
        {tagline && (
          <p className={cn("truncate text-muted-foreground", s.taglineText)}>Velocity + control</p>
        )}
      </div>
    </div>
  );
}
