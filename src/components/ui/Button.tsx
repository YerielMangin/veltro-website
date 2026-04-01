import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] active:-translate-y-[1px] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background rounded-full hover:opacity-90",
        secondary:
          "bg-secondary text-secondary-foreground rounded-full border border-border/50 hover:bg-secondary/80",
        ghost:
          "rounded-full hover:bg-muted text-foreground",
        outline:
          "rounded-full border border-border text-foreground hover:bg-muted/50",
        brand:
          "bg-primary text-primary-foreground rounded-full hover:opacity-90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span>{children}</span>
        {icon && (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
            {icon}
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
