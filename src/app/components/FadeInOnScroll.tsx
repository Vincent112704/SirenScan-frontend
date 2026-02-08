import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeInOnScroll({ children, delay = 0, className }: FadeInOnScrollProps) {
  const ref = useRef(null);
  // Trigger exactly when it hits the bottom (0px) and only needs 10% visibility (amount: 0.1)
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 15 }} // Reduced from 40 to 15 for snappiness
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98], // "Premium" ease-out curve
        delay,
      }}
      style={{ willChange: "transform, opacity" }} // Pre-loads onto GPU
    >
      {children}
    </motion.div>
  );
}