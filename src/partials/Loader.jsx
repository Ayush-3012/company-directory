import { Spiral } from "ldrs/react";
import "ldrs/react/Spiral.css";

const Loader = () => {
  return (
    <div
      className="
      flex justify-center items-center h-screen w-full
      bg-[#0A0F1B]
      relative
    "
    >
      {/* Glow Background Aura */}
      <div
        className="
        absolute w-72 h-72 rounded-full 
        bg-emerald-500/10 blur-3xl
        animate-pulse
      "
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-emerald-400 gap-6">
        {/* LDR Spiral Loader */}
        <div className="drop-shadow-[0_0_25px_rgba(16,185,129,0.6)]">
          <Spiral size="160" speed="0.9" color="#10B981" />
        </div>

        {/* Loading Text */}
        <p
          className="
          text-3xl font-mono font-semibold
          tracking-widest
          text-emerald-400 
          drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]
          animate-pulse
        "
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
