"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ConcentricCircles() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      ref.current!.querySelectorAll("circle").forEach((c, i) => {
        gsap.to(c, {
          rotation: 360 * (i % 2 === 0 ? 1 : -1),
          duration: 20 - i * 4,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-10"
      viewBox="0 0 400 400"
    >
      {[60, 100, 140, 180, 220].map((r, i) => (
        <circle
          key={i}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray={`${4 + i * 2} ${8 + i * 3}`}
        />
      ))}
    </svg>
  );
}
