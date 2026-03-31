"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PulsingWaveform() {
  const ref = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        repeat: -1,
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-15"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M0,100 L40,100 L50,100 L60,40 L70,160 L80,80 L90,120 L100,100 L140,100 L150,100 L160,40 L170,160 L180,80 L190,120 L200,100 L240,100 L250,100 L260,40 L270,160 L280,80 L290,120 L300,100 L340,100 L350,100 L360,40 L370,160 L380,80 L390,120 L400,100"
        fill="none"
        stroke="#CC5833"
        strokeWidth="2"
      />
    </svg>
  );
}
