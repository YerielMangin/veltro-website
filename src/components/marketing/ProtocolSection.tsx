"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ConcentricCircles } from "@/components/animations/ConcentricCircles";
import { ScanningLaser } from "@/components/animations/ScanningLaser";
import { PulsingWaveform } from "@/components/animations/PulsingWaveform";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    step: "01",
    title: "Identify",
    description: "Surface what matters before it becomes urgent.",
    bg: "bg-cream",
    text: "text-charcoal",
  },
  {
    step: "02",
    title: "Orchestrate",
    description: "Coordinate people, priorities, and timelines in one view.",
    bg: "bg-moss",
    text: "text-cream",
  },
  {
    step: "03",
    title: "Sustain",
    description: "Build habits that keep operations consistent and visible.",
    bg: "bg-charcoal",
    text: "text-cream",
  },
];

const animations = [ConcentricCircles, ScanningLaser, PulsingWaveform];

export function ProtocolSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (i < cards.length - 1 && card) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: `+=${window.innerHeight}`,
            pin: false,
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(card, {
                scale: 1 - progress * 0.08,
                opacity: 1 - progress * 0.7,
              });
            },
          });
        }
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="protocol" ref={sectionRef} className="relative">
      {cards.map((card, i) => {
        const Animation = animations[i];
        return (
          <div
            key={card.step}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden ${card.bg} ${card.text}`}
            style={{ zIndex: i + 1, willChange: "transform, opacity" }}
          >
            {!reducedMotion && <Animation />}
            <div className="relative z-10 max-w-2xl px-6 text-center">
              <span className="font-mono text-sm opacity-50">{card.step}</span>
              <h3 className="mt-4 font-heading text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                {card.title}
              </h3>
              <p className="mx-auto mt-6 max-w-md font-body text-lg opacity-70 md:text-xl">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
