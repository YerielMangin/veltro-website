import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "cream" | "charcoal" | "moss" | "white";
  size?: "md" | "lg" | "xl";
  container?: boolean;
}

function Section({
  className,
  variant = "cream",
  size = "lg",
  container = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        size === "md" && "py-16 md:py-24",
        size === "lg" && "py-24 md:py-32",
        size === "xl" && "py-32 md:py-40 lg:py-48",
        variant === "cream" && "bg-cream text-charcoal",
        variant === "charcoal" && "bg-charcoal text-cream",
        variant === "moss" && "bg-moss text-cream",
        variant === "white" && "bg-white text-charcoal",
        className
      )}
      {...props}
    >
      {container ? (
        <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-24">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

export { Section };
