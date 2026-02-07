interface WaveDividerProps {
  className?: string;
  fill?: string;
  flip?: boolean;
}

export function WaveDivider({
  className = "",
  fill = "var(--color-background)",
  flip = false,
}: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block w-full ${flip ? "rotate-180" : ""} ${className}`}
      style={{ height: "clamp(40px, 5vw, 80px)" }}
      aria-hidden="true"
    >
      <path
        d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
        fill={fill}
      />
    </svg>
  );
}
