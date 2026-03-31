"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ScanningLaser() {
  const ref = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!ref.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        attr: { y1: 380, y2: 380 },
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  const dots: React.ReactNode[] = [];
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 14; c++) {
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={30 + c * 26}
          cy={30 + r * 38}
          r="2"
          fill="currentColor"
          opacity="0.2"
        />
      );
    }
  }

  return (
    <svg
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-20"
      viewBox="0 0 400 400"
    >
      {dots}
      <line
        ref={lineRef}
        x1="0"
        y1="20"
        x2="400"
        y2="20"
        stroke="#CC5833"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}
