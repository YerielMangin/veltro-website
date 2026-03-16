import { cn } from "@/lib/utils";

interface VeltroLogoProps {
  className?: string;
  size?: number;
  /** "currentColor" follows text color, or pass an explicit hex */
  color?: string;
}

/**
 * Inline SVG of the Veltro icon mark.
 * Uses currentColor by default so it adapts to light/dark themes.
 */
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
      {/* Main diagonal */}
      <path d="M449 88L90 447" fill="none" stroke={color} strokeLinecap="round" strokeWidth="78" />
      {/* Bent chevron */}
      <path d="M90 88L180 178L90 268" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="78" />
      {/* Secondary diagonal */}
      <path d="M450 259L249 460" fill="none" stroke={color} strokeLinecap="round" strokeWidth="78" />
      {/* Dot */}
      <path d="M451 432L434 449" fill="none" stroke={color} strokeLinecap="round" strokeWidth="78" />
    </svg>
  );
}

/**
 * Circular thumbnail variant — white strokes on black circle.
 * Best for favicons, social avatars, small UI spots.
 */
export function VeltroLogoThumbnail({ className, size = 32 }: Omit<VeltroLogoProps, "color">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <circle cx="128" cy="128" r="124" fill="#000000" />
      <g fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="33">
        <path d="M199.8 56.2L56.2 199.8" />
        <path d="M56.2 56.2L92.2 92.2L56.2 128.2" />
        <path d="M200.2 124.6L119.8 205" />
        <path d="M200.6 193.8L193.8 200.6" />
      </g>
    </svg>
  );
}
