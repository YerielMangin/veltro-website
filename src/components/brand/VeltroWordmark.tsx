import { VeltroLogo } from "./VeltroLogo";
import { cn } from "@/lib/utils";

interface VeltroWordmarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: 24, text: "text-lg" },
  md: { icon: 32, text: "text-xl" },
  lg: { icon: 40, text: "text-2xl" },
};

export function VeltroWordmark({ className, size = "md" }: VeltroWordmarkProps) {
  const s = sizes[size];
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <VeltroLogo size={s.icon} />
      <span className={cn("font-bold tracking-tight", s.text)}>Veltro</span>
    </div>
  );
}
