"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MousePointer2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- 1. DiagnosticShuffler ---
const diagnosticItems = [
  { id: 1, label: "// signal.detected", value: "Asset 0842-A", status: "Active" },
  { id: 2, label: "// protocol.initiated", value: "Inspection 02", status: "Pending" },
  { id: 3, label: "// finding.resolved", value: "Work Order 91", status: "Complete" },
];

function DiagnosticShuffler() {
  const [items, setItems] = useState(diagnosticItems);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const newArr = [...prev];
        const last = newArr.pop();
        if (last) newArr.unshift(last);
        return newArr;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative h-64 w-full overflow-hidden">
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-cream-300 bg-white p-4 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: `translateY(${index * 10}px) scale(${1 - index * 0.05})`,
              opacity: 1 - index * 0.3,
              zIndex: 10 - index,
            }}
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/30">
                {item.label}
              </p>
              <p className="font-heading text-sm font-bold text-charcoal">
                {item.value}
              </p>
            </div>
            <div className="rounded-full bg-moss/10 px-3 py-1 font-mono text-[10px] text-moss">
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 2. TelemetryTypewriter ---
function TelemetryTypewriter() {
  const [text, setText] = useState("");
  const fullText = "Analyzing operational rhythm... Signals synchronized. Velocity optimal. 24 assets monitored. 0 incidents detected. All systems nominal.";
  const index = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index.current < fullText.length) {
        setText((prev) => prev + fullText[index.current]);
        index.current++;
      } else {
        setTimeout(() => {
          setText("");
          index.current = 0;
        }, 3000);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text === ""]);

  return (
    <div className="rounded-xl bg-charcoal p-6 font-mono text-xs leading-relaxed text-clay shadow-inner">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-clay" />
        <span className="uppercase tracking-widest opacity-50">Live telemetry feed</span>
      </div>
      <p className="min-h-[100px]">
        {text}
        <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-clay align-middle" />
      </p>
    </div>
  );
}

// --- 3. CursorProtocolScheduler ---
function CursorProtocolScheduler() {
  const cursorRef = useRef<SVGSVGElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const saveBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // Move to a cell
      tl.to(cursorRef.current, {
        x: 80,
        y: 60,
        duration: 1.2,
        ease: "power2.inOut",
      })
      // Click animation
      .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
      .to(cellsRef.current[2], { backgroundColor: "#CC5833", color: "#F2F0E9", duration: 0.2 }, "-=0.1")
      .to(cursorRef.current, { scale: 1, duration: 0.1 })
      // Move to save
      .to(cursorRef.current, {
        x: 180,
        y: 140,
        duration: 1.0,
        ease: "power2.inOut",
        delay: 0.5
      })
      .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
      .to(saveBtnRef.current, { scale: 0.95, duration: 0.1 })
      .to(saveBtnRef.current, { scale: 1, duration: 0.1 })
      .to(cursorRef.current, { scale: 1, duration: 0.1 })
      // Fade out
      .to([cursorRef.current, cellsRef.current[2]], { opacity: 0.3, duration: 0.5, delay: 0.5 })
      .set(cellsRef.current[2], { backgroundColor: "transparent", color: "inherit" })
      .set([cursorRef.current, cellsRef.current[2]], { opacity: 1 });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative rounded-xl border border-cream-300 bg-cream-50 p-6">
      <div className="grid grid-cols-7 gap-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div
            key={i}
            ref={(el) => {
              cellsRef.current[i] = el;
            }}
            className="flex h-10 items-center justify-center rounded-lg border border-cream-200 font-mono text-[10px]"
          >
            {day}
          </div>
        ))}
      </div>
      <div
        ref={saveBtnRef}
        className="mt-6 flex h-10 items-center justify-center rounded-full bg-moss font-heading text-[10px] font-bold uppercase tracking-widest text-cream"
      >
        Execute Protocol
      </div>

      <MousePointer2
        ref={cursorRef as any}
        size={20}
        className="absolute left-4 top-4 z-20 text-clay"
      />
    </div>
  );
}

export function InteractiveFeatures() {
  return (
    <section className="bg-cream px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Card 1 */}
          <div className="flex flex-col">
            <DiagnosticShuffler />
            <div className="mt-8">
              <h3 className="font-heading text-xl font-bold">Connected Flow</h3>
              <p className="mt-2 font-body text-sm text-charcoal/60">
                Signals aren't isolated. They're steps. Capture everything, 
                direct it to the right person, and reflect on the outcome.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col">
            <TelemetryTypewriter />
            <div className="mt-8">
              <h3 className="font-heading text-xl font-bold">Real-time Visibility</h3>
              <p className="mt-2 font-body text-sm text-charcoal/60">
                Stop guessing. Know exactly what's happening across your 
                infrastructure with a live pulse of every asset and action.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col">
            <CursorProtocolScheduler />
            <div className="mt-8">
              <h3 className="font-heading text-xl font-bold">Precision Control</h3>
              <p className="mt-2 font-body text-sm text-charcoal/60">
                Design the rhythm of your operation. Schedule exactly when 
                and how work gets done with clinical accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
