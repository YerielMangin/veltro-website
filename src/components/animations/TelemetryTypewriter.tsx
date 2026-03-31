"use client";

import { useState, useEffect, useRef } from "react";

const messages = [
  "Team sync: 3 blockers resolved",
  "Inspection #247 — submitted for review",
  "Corridor B lights — scheduled for Thursday",
  "Priority shift: elevator cert moved to Q2",
  "Sarah K. closed 4 work orders today",
  "Asset #1021 — maintenance window confirmed",
  "HVAC unit 3F — parts ordered, ETA 48h",
  "Weekly report generated — 94% SLA compliance",
];

export function TelemetryTypewriter() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const msgIdx = useRef(0);
  const charIdx = useRef(0);
  const feedRef = useRef<HTMLDivElement>(null);
  const pauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let active = true;

    const typeInterval = setInterval(() => {
      if (!active) return;
      const msg = messages[msgIdx.current % messages.length];

      if (charIdx.current < msg.length) {
        charIdx.current++;
        setCurrentText(msg.slice(0, charIdx.current));
      } else {
        clearInterval(typeInterval);
        pauseTimeout.current = setTimeout(() => {
          if (!active) return;
          setLines((prev) => {
            const next = [...prev, msg];
            return next.slice(-5);
          });
          setCurrentText("");
          charIdx.current = 0;
          msgIdx.current++;
        }, 1200);
      }
    }, 55);

    return () => {
      active = false;
      clearInterval(typeInterval);
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    };
  }, [lines]);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [lines, currentText]);

  return (
    <div className="flex h-[24rem] flex-col overflow-hidden rounded-[2rem] border border-cream-300 bg-cream-50 p-8 shadow-sm md:h-[28rem]">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse-slow rounded-full bg-green-500" />
        <span className="font-mono text-xs text-charcoal/50">Live Feed</span>
      </div>
      <h3 className="mt-4 font-heading text-xl font-bold">
        One shared place for your team
      </h3>
      <p className="mt-1 font-body text-sm text-charcoal/60">
        See priorities, progress, and blockers together.
      </p>
      <div
        ref={feedRef}
        className="mt-6 flex-1 overflow-hidden rounded-xl border border-cream-300 bg-charcoal/[0.03] p-4 font-mono text-xs leading-relaxed"
      >
        {lines.map((line, i) => (
          <div key={i} className="py-0.5 text-charcoal/40">
            <span className="mr-2 text-moss/50">&rsaquo;</span>
            {line}
          </div>
        ))}
        {currentText && (
          <div className="py-0.5 text-charcoal">
            <span className="mr-2 text-moss">&rsaquo;</span>
            {currentText}
            <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-blink bg-clay align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
