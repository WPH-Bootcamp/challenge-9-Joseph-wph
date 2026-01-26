const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/image/image-2.svg')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;