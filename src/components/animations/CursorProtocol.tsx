"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const days = ["S", "M", "T", "W", "T", "F", "S"];

export function CursorProtocol() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<SVGSVGElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const saveRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cursorRef.current) return;

    const ctx = gsap.context(() => {
      const cursor = cursorRef.current!;
      const targetCell = cellRefs.current[3]; // Wednesday
      const saveBtn = saveRef.current;
      if (!targetCell || !saveBtn) return;

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      gsap.set(cursor, { x: -30, y: 20, opacity: 0 });

      tl.to(cursor, { opacity: 1, duration: 0.3 });

      tl.to(cursor, {
        x: targetCell.offsetLeft + targetCell.offsetWidth / 2 - 8,
        y: targetCell.offsetTop + targetCell.offsetHeight / 2 - 8,
        duration: 0.8,
        ease: "power2.inOut",
      });

      tl.to(cursor, { scale: 0.85, duration: 0.1 }).to(cursor, {
        scale: 1,
        duration: 0.15,
      });

      tl.to(targetCell, {
        backgroundColor: "#CC5833",
        color: "#F2F0E9",
        duration: 0.2,
      });

      tl.to(cursor, {
        x: saveBtn.offsetLeft + saveBtn.offsetWidth / 2 - 8,
        y: saveBtn.offsetTop + saveBtn.offsetHeight / 2 - 8,
        duration: 0.6,
        ease: "power2.inOut",
      });

      tl.to(cursor, { scale: 0.85, duration: 0.1 }).to(cursor, {
        scale: 1,
        duration: 0.15,
      });
      tl.to(saveBtn, {
        backgroundColor: "#2E4036",
        color: "#F2F0E9",
        duration: 0.15,
      });
      tl.to(saveBtn, {
        backgroundColor: "transparent",
        color: "#1A1A1A",
        duration: 0.3,
        delay: 0.3,
      });

      tl.to(cursor, { opacity: 0, duration: 0.4 });

      tl.to(
        targetCell,
        {
          backgroundColor: "transparent",
          color: "#1A1A1A",
          duration: 0.3,
        },
        "<"
      );
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex h-[24rem] flex-col overflow-hidden rounded-[2rem] border border-cream-300 bg-cream-50 p-8 shadow-sm md:h-[28rem]">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-moss/10 px-3 py-1 font-mono text-xs text-moss">
        Protocol
      </span>
      <h3 className="mt-4 font-heading text-xl font-bold">
        Turn findings into action
      </h3>
      <p className="mt-1 font-body text-sm text-charcoal/60">
        Visibility on what happens next.
      </p>
      <div ref={containerRef} className="relative mt-6 flex-1">
        <div className="mb-2 grid grid-cols-7 gap-2">
          {days.map((d, i) => (
            <span
              key={i}
              className="text-center font-mono text-xs text-charcoal/40"
            >
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((_, i) => (
            <div
              key={i}
              ref={(el) => { cellRefs.current[i] = el; }}
              className="flex aspect-square items-center justify-center rounded-xl border border-cream-300 font-mono text-xs transition-colors"
            />
          ))}
        </div>

        <button
          ref={saveRef}
          className="mt-4 rounded-full border border-charcoal/20 px-4 py-2 font-heading text-xs font-semibold transition-colors"
        >
          Save
        </button>

        <svg
          ref={cursorRef}
          className="pointer-events-none absolute left-0 top-0"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M1 1L1 12L4.5 8.5L8 14L10 13L6.5 7L11 7L1 1Z"
            fill="#1A1A1A"
            stroke="#F2F0E9"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </div>
  );
}
