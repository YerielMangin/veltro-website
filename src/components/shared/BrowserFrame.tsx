import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  children?: React.ReactNode;
  className?: string;
  url?: string;
}

function BrowserFrame({ children, className, url = "app.getveltro.com" }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        /* Outer shell — Double-Bezel */
        "rounded-2xl border border-border/50 bg-muted/30 p-px shadow-[var(--shadow-soft-lg)]",
        className
      )}
    >
      {/* Inner frame */}
      <div className="overflow-hidden rounded-[calc(1rem-1px)] bg-card">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
          </div>
          <div className="ml-4 flex-1">
            <div className="mx-auto max-w-sm rounded-md bg-muted/60 px-3 py-1">
              <span className="font-mono text-[11px] text-muted-foreground">{url}</span>
            </div>
          </div>
        </div>
        {/* Content area */}
        <div className="aspect-[16/10] bg-muted/20">
          {children || (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
              <div className="h-3 w-48 rounded-full bg-muted/60" />
              <div className="h-2 w-32 rounded-full bg-muted/40" />
              <div className="mt-4 grid w-full max-w-lg grid-cols-3 gap-3">
                <div className="h-20 rounded-lg bg-muted/40" />
                <div className="h-20 rounded-lg bg-muted/40" />
                <div className="h-20 rounded-lg bg-muted/40" />
              </div>
              <div className="mt-2 h-32 w-full max-w-lg rounded-lg bg-muted/30" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { BrowserFrame };
