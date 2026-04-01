"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function PhilosophySection({
  line1 = "Most teams focus on: tracking what happened.",
  line2Part1 = "We focus on:",
  line2Part2 = "driving",
  line2Accent = "what happens next.",
}: {
  line1?: string;
  line2Part1?: string;
  line2Part2?: string;
  line2Accent?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Words = line1.split(" ");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".phil-word",
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 0.25,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".phil-line-1",
            start: "top 70%",
          },
        }
      );

      gsap.set(".phil-line-2 > *", { y: 40, opacity: 0 });
      gsap.to(".phil-line-2 > *", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".phil-line-2",
          start: "top 75%",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, [line1, line2Part1, line2Part2, line2Accent, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-charcoal px-6 py-32 md:px-12 lg:px-24"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-300 to-charcoal opacity-30" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Statement 1 */}
        <p className="phil-line-1 mb-16 font-heading text-2xl font-medium leading-relaxed text-cream/40 md:text-3xl lg:text-4xl">
          {line1Words.map((word, i) => (
            <span key={i} className="phil-word mr-[0.3em] inline-block">
              {word}
            </span>
          ))}
        </p>

        {/* Statement 2 */}
        <div className="phil-line-2">
          <p className="font-display text-4xl italic leading-tight text-cream md:text-5xl lg:text-7xl">
            {line2Part1}
          </p>
          <p className="mt-2 font-display text-4xl italic leading-tight text-cream md:text-5xl lg:text-7xl">
            {line2Part2}{" "}
            <span className="text-clay">{line2Accent}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
