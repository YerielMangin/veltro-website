import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
}

function Card({ className, variant = "default", children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-cream-300 bg-cream-50 p-8",
        variant === "elevated" && "shadow-sm",
        variant === "interactive" &&
          "shadow-sm transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("mb-4", className)} {...props} />;
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("font-heading text-xl font-bold tracking-tight text-charcoal", className)}
      {...props}
    />
  );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("font-body text-sm leading-relaxed text-charcoal/60", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardTitle, CardDescription };
