import { useEffect, useRef, useState, useCallback } from "react";

export const ScrollCurveLine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ top: 0, height: 0 });

  // Cache card DOM elements and their layout positions (updated on resize only)
  const cachedCardsRef = useRef<HTMLElement[]>([]);
  const cachedCardLayoutRef = useRef<
    { top: number; bottom: number; centerX: number }[]
  >([]);

  const cacheCardPositions = useCallback(() => {
    const section = document.getElementById("how-it-works");
    if (!section) return;
    const cards = section.querySelectorAll(".home_feature_item_card");
    const cached: HTMLElement[] = [];
    const layouts: { top: number; bottom: number; centerX: number }[] = [];

    cards.forEach((card) => {
      const el = card as HTMLElement;
      cached.push(el);
      const rect = el.getBoundingClientRect();
      const topAbs = rect.top + window.scrollY;
      layouts.push({
        top: topAbs,
        bottom: topAbs + rect.height,
        centerX: rect.left + rect.width / 2,
      });
    });

    cachedCardsRef.current = cached;
    cachedCardLayoutRef.current = layouts;
  }, []);

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

      // Cache card positions whenever dimensions update
      cacheCardPositions();
    };

    updateDimensions();
    const timer = setTimeout(updateDimensions, 400);
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, [cacheCardPositions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.height <= 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pre-render the glow into an offscreen canvas to avoid per-frame shadowBlur
    const glowCanvas = document.createElement("canvas");
    const glowCtx = glowCanvas.getContext("2d");

    const updateCanvasScale = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = dimensions.height * dpr;
      ctx.scale(dpr, dpr);

      // Size offscreen glow canvas to match
      glowCanvas.width = canvas.width;
      glowCanvas.height = canvas.height;
      if (glowCtx) glowCtx.scale(dpr, dpr);
    };

    // Track previous highlight state to avoid unnecessary DOM writes
    const prevHighlight = [false, false, false];
    let rafScheduled = false;

    const drawCurve = () => {
      rafScheduled = false;
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

      // ── CARD BORDER LOGIC (cached positions, no getBoundingClientRect) ──
      const cards = cachedCardsRef.current;
      const layouts = cachedCardLayoutRef.current;

      for (let index = 0; index < cards.length && index < 3; index++) {
        const layout = layouts[index];
        if (!layout) continue;

        let shouldHighlight = false;

        if (index === 0) {
          shouldHighlight =
            headAbsY >= layout.top - 20 && headAbsY <= layout.bottom + 20;
        } else if (index === 1) {
          shouldHighlight =
            headAbsY >= layout.top - 20 && headAbsY <= layout.bottom + 20;
        } else {
          // ── THIRD CARD: HEAVY DELAY ──
          const isHorizontallyClose = Math.abs(head.x - centerX) < 100;
          shouldHighlight =
            headAbsY >= layout.top + 250 &&
            headAbsY <= layout.bottom + 100 &&
            isHorizontallyClose;
        }

        if (t <= 0.01) shouldHighlight = false;

        // Force highlight at the very end
        if (t >= 0.99 && index === 2) shouldHighlight = true;

        // Only touch DOM when highlight state actually changes
        if (prevHighlight[index] !== shouldHighlight) {
          prevHighlight[index] = shouldHighlight;
          cards[index].classList.toggle("card-active-border", shouldHighlight);
        }
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

      // Draw glowing line into offscreen canvas, composite onto main canvas
      if (glowCtx) {
        glowCtx.clearRect(0, 0, width, height);
        glowCtx.save();
        glowCtx.shadowBlur = 60;
        glowCtx.shadowColor = "#ff4d2e";
        glowCtx.beginPath();
        glowCtx.moveTo(centerX, 0);
        for (let i = 0; i <= 100; i++) {
          const segmentT = (i / 100) * t;
          const p = getPath(segmentT);
          glowCtx.lineTo(p.x, p.y);
        }
        glowCtx.strokeStyle = "#ff4d2e";
        glowCtx.lineWidth = 1.5;
        glowCtx.lineCap = "round";
        glowCtx.lineJoin = "round";
        glowCtx.stroke();
        glowCtx.restore();

        // Composite the pre-rendered glow onto the main canvas
        ctx.drawImage(glowCanvas, 0, 0, width, height);
      }

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
    // Deduplicate RAF calls — only schedule one per frame
    const handleScroll = () => {
      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(drawCurve);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
