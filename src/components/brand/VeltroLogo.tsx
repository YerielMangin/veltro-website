import { cn } from "@/lib/utils";

interface VeltroLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export function VeltroLogo({ className, size = 32, color = "currentColor" }: VeltroLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 535 534"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <g>
        <path d="M449 88L90 447" fill="none" stroke={color} strokeLinecap="round" strokeWidth="78" />
      </g>
      <g>
        <path d="M90 88L180 178L90 268" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="78" />
      </g>
      <g>
        <path d="M450 259L249 460" fill="none" stroke={color} strokeLinecap="round" strokeWidth="78" />
      </g>
      <g>
        <path d="M451 432L434 449" fill="none" stroke={color} strokeLinecap="round" strokeWidth="78" />
      </g>
    </svg>
  );
}
