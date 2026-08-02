import React, { useState } from "react";
import LazyImage from "./LazyImage";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div 
      className={`relative overflow-hidden border border-border rounded-lg select-none group w-full ${className}`}
      style={{ aspectRatio: "16/9" }}
    >
      {/* Before Image (Background) */}
      <LazyImage
        src={beforeImage}
        alt="Before"
        className="absolute inset-0 w-full h-full pointer-events-none"
        imgClassName="w-full h-full object-cover"
        priority={true}
      />

      {/* After Image (Foreground, Clipped) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <LazyImage
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full pointer-events-none"
          imgClassName="w-full h-full object-cover"
          priority={true}
        />
      </div>

      {/* Slider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center shadow-lg cursor-ew-resize group-hover:scale-110 transition-transform">
          <svg
            className="w-4 h-4 text-neutral-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M8 9l-4 4 4 4m8-8l4 4-4 4"
            />
          </svg>
        </div>
      </div>

      {/* Interactive Range Input overlay */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        aria-label="Before and after comparison slider"
      />
    </div>
  );
}
