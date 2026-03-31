"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const chips = [
  { label: "Planning", icon: "01" },
  { label: "Execution", icon: "02" },
  { label: "Follow-through", icon: "03" },
];

export function DiagnosticShuffler() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        next.push(next.shift()!);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const cards = containerRef.current!.querySelectorAll(".shuffle-chip");
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: i * 56,
          scale: 1 - i * 0.04,
          opacity: 1 - i * 0.15,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      });
    }, containerRef.current);
    return () => ctx.revert();
  }, [order]);

  return (
    <div className="flex h-[24rem] flex-col overflow-hidden rounded-[2rem] border border-cream-300 bg-cream-50 p-8 shadow-sm md:h-[28rem]">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-moss/10 px-3 py-1 font-mono text-xs text-moss">
        Diagnostic
      </span>
      <h3 className="mt-4 font-heading text-xl font-bold">Keep work moving</h3>
      <p className="mt-1 font-body text-sm text-charcoal/60">
        A clear flow from planning to follow-through.
      </p>
      <div ref={containerRef} className="relative mt-6 flex-1">
        {order.map((chipIdx, posIdx) => (
          <div
            key={chips[chipIdx].label}
            className="shuffle-chip absolute left-0 right-0 mx-auto flex w-[85%] items-center gap-4 rounded-xl border border-cream-300 bg-white p-4 shadow-md"
            style={{ zIndex: 3 - posIdx }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-moss/10 font-mono text-xs font-medium text-moss">
              {chips[chipIdx].icon}
            </span>
            <span className="font-heading text-sm font-semibold">
              {chips[chipIdx].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
