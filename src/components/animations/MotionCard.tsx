"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
}

function MotionCard({ children, className }: MotionCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-border/50 bg-muted/30 p-px shadow-[var(--shadow-card)]",
        className
      )}
      whileHover={{
        y: -4,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
    >
      <div className="h-full rounded-[calc(1rem-1px)] bg-card p-6">
        {children}
      </div>
    </motion.div>
  );
}

export { MotionCard };
