function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[50]"
      style={{
        opacity: 0.05,
        backgroundImage: "url(/images/noise-texture.png)",
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
}

export { NoiseOverlay };
