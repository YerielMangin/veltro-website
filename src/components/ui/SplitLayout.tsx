import { cn } from "@/lib/utils";

interface SplitLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  ratio?: "even" | "wide-left" | "wide-right";
}

function SplitLayout({
  className,
  reverse = false,
  ratio = "wide-left",
  children,
  ...props
}: SplitLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-12 lg:gap-24",
        ratio === "even" && "lg:grid-cols-2",
        ratio === "wide-left" && "lg:grid-cols-[1.2fr_1fr]",
        ratio === "wide-right" && "lg:grid-cols-[1fr_1.2fr]",
        reverse && "lg:[&>:first-child]:order-2 lg:[&>:last-child]:order-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { SplitLayout };
