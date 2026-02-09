import type { SpringOptions } from "motion/react";
import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface TiltedCardProps {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties["height"];
  containerWidth?: React.CSSProperties["width"];
  imageHeight?: React.CSSProperties["height"];
  imageWidth?: React.CSSProperties["width"];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

// MODIFIED: Higher damping and lower mass for a "premium" smooth feel
const springValues: SpringOptions = {
  damping: 40,   // Increased from 30: stops oscillation faster
  stiffness: 80, // Decreased from 100: smoother, less "snappy" start
  mass: 1,       // Decreased from 2: makes the card feel lighter and more responsive
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "100%",
  imageWidth = "100%",
  scaleOnHover = 1.05, // Subtle scale is usually smoother
  rotateAmplitude = 12,
  showMobileWarning = false,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  
  // Use simple motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the rotation values using springs
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]), springValues);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]), springValues);
  
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  
  // Tooltip tracking
  const tooltipX = useMotionValue(0);
  const tooltipY = useMotionValue(0);

  const handleMouse = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    // Normalize mouse position between -0.5 and 0.5
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(relativeX);
    mouseY.set(relativeY);

    // Update tooltip position
    tooltipX.set(e.clientX - rect.left);
    tooltipY.set(e.clientY - rect.top);
  }, [mouseX, mouseY, tooltipX, tooltipY]);

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:1200px] flex flex-col items-center justify-center bg-transparent"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative [transform-style:preserve-3d] w-full h-full"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        {imageSrc && (
          <motion.img
            src={imageSrc}
            alt={altText}
            className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform"
            style={{ width: "100%", height: "100%" }}
          />
        )}

        {displayOverlayContent && overlayContent && (
          <motion.div 
            className="absolute inset-0 z-[2] will-change-transform"
            style={{ transform: "translateZ(40px)" }} // Use standard inline style for Z-index depth
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] z-[3] hidden sm:block"
          style={{
            x: tooltipX,
            y: tooltipY,
            opacity,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}