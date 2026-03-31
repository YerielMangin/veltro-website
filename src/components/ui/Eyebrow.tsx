import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {}

function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <span
      className={cn(
        "block font-mono text-xs uppercase tracking-[0.3em] opacity-40",
        className
      )}
      {...props}
    >
      // {children}
    </span>
  );
}

export { Eyebrow };
