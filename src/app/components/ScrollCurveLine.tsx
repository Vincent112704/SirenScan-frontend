import { useEffect, useRef, useState } from "react";

export const ScrollCurveLine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const startElem = document.getElementById("how-it-works");
      const cards = document.querySelectorAll(".home_feature_item_card");

      if (startElem && cards.length >= 3) {
        const description = startElem.querySelector("p");
        const startOffset = description
          ? description.offsetTop + description.offsetHeight + 5
          : 200;

        const top = startElem.offsetTop + startOffset;

        const thirdCard = cards[2] as HTMLElement;
        const thirdCardRect = thirdCard.getBoundingClientRect();
        const endPointY =
          thirdCardRect.top + window.scrollY + thirdCardRect.height / 2;

        const height = endPointY - top;
        setDimensions({ top, height });
      }
    };

    updateDimensions();
    const timer = setTimeout(updateDimensions, 400);
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.height <= 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasScale = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = dimensions.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const drawCurve = () => {
      const width = window.innerWidth;
      const height = dimensions.height;
      ctx.clearRect(0, 0, width, height);

      const currentScroll = window.scrollY;

      const relativeScroll =
        currentScroll - (dimensions.top - window.innerHeight);
      const scrollProgress = Math.max(
        0,
        Math.min(
          relativeScroll / (dimensions.height + window.innerHeight * 0.5),
          1,
        ),
      );

      const t = scrollProgress;
      const centerX = width / 2;
      const curveIntensity = width > 1024 ? 850 : width > 768 ? 500 : 150;

      const cp1x = centerX - curveIntensity;
      const cp1y = height * 0.25;
      const cp2x = centerX + curveIntensity;
      const cp2y = height * 0.75;

      const getPath = (T: number) => ({
        x:
          Math.pow(1 - T, 3) * centerX +
          3 * Math.pow(1 - T, 2) * T * cp1x +
          3 * (1 - T) * Math.pow(T, 2) * cp2x +
          Math.pow(T, 3) * centerX,
        y:
          Math.pow(1 - T, 3) * 0 +
          3 * Math.pow(1 - T, 2) * T * cp1y +
          3 * (1 - T) * Math.pow(T, 2) * cp2y +
          Math.pow(T, 3.5) * height,
      });

      const head = getPath(t);
      const headAbsY = dimensions.top + head.y;

      // ── CARD BORDER LOGIC ──────────────────────────────────────────────
const howItWorksSection = document.getElementById("how-it-works");
if (howItWorksSection) {
  const cards = howItWorksSection.querySelectorAll(
    ".home_feature_item_card",
  );

  cards.forEach((card, index) => {
    const cardElem = card as HTMLElement;
    const cardRect = cardElem.getBoundingClientRect();
    const cardTopAbs = cardRect.top + window.scrollY;
    const cardBottomAbs = cardTopAbs + cardRect.height;
    const cardCenterX = cardRect.left + cardRect.width / 2;

    let shouldHighlight = false; // Renamed variable for clarity

    if (index === 0) {
      shouldHighlight =
        headAbsY >= cardTopAbs - 20 && headAbsY <= cardBottomAbs + 20;
    } else if (index === 1) {
      shouldHighlight =
        headAbsY >= cardTopAbs - 20 && headAbsY <= cardBottomAbs + 20;
    } else {
      // ── THIRD CARD: HEAVY DELAY ──
      const isHorizontallyClose = Math.abs(head.x - centerX) < 100;
      shouldHighlight =
        headAbsY >= cardTopAbs + 250 &&
        headAbsY <= cardBottomAbs + 100 &&
        isHorizontallyClose;
    }

    if (t <= 0.01) shouldHighlight = false;

    // Force highlight at the very end
    if (t >= 0.99 && index === 2) shouldHighlight = true;

    // Toggle the new border class instead of the glow class
    cardElem.classList.toggle("card-active-border", shouldHighlight);
  });
}

      // ── DRAWING PATHS ───────────────────────────────────────────────
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      for (let i = 0; i <= 100; i++) {
        const p = getPath(i / 100);
        ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(255, 77, 46, 0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.shadowBlur = 60;
      ctx.shadowColor = "#ff4d2e";
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      for (let i = 0; i <= 100; i++) {
        const segmentT = (i / 100) * t;
        const p = getPath(segmentT);
        ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "#ff4d2e";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.restore();

      if (t > 0 && t <= 1) {
        ctx.save();
        const gradient = ctx.createRadialGradient(
          head.x,
          head.y,
          0,
          head.x,
          head.y,
          80,
        );
        gradient.addColorStop(0, "rgba(255, 77, 46, 0.8)");
        gradient.addColorStop(1, "rgba(255, 77, 46, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 80, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    updateCanvasScale();
    const handleScroll = () => requestAnimationFrame(drawCurve);
    window.addEventListener("scroll", handleScroll);
    drawCurve();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dimensions]);

  return (
    <div
      className="absolute left-0 w-full pointer-events-none z-0"
      style={{ top: `${dimensions.top}px`, height: `${dimensions.height}px` }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
