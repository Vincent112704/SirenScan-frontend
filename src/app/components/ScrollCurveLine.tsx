import { useEffect, useRef } from 'react';

export const ScrollCurveLine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    const drawCurve = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      const startElem = document.getElementById('features');
      const endElem = document.getElementById('cta-section');
      
      if (!startElem || !endElem) return;

      const currentScroll = window.scrollY;
      const startPos = startElem.offsetTop; 
      const endPos = endElem.offsetTop + (endElem.offsetHeight / 0.2);

      if (currentScroll < startPos) return;

      const scrollProgress = Math.max(0, Math.min((currentScroll - startPos) / (endPos - startPos), 1));

      const t = scrollProgress;
      const cp1x = width / 2 - 250;
      const cp1y = height * 0.3;
      const cp2x = width / 2 + 250;
      const cp2y = height * 0.7;

      const x = Math.pow(1 - t, 3) * (width / 2) + 3 * Math.pow(1 - t, 2) * t * cp1x + 3 * (1 - t) * Math.pow(t, 2) * cp2x + Math.pow(t, 3) * (width / 2);
      const y = Math.pow(1 - t, 3) * 0 + 3 * Math.pow(1 - t, 2) * t * cp1y + 3 * (1 - t) * Math.pow(t, 2) * cp2y + Math.pow(t, 3) * height;

      // 1. DIMMED BACKGROUND PATH
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width / 2, height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'; 
      ctx.lineWidth = 2;
      ctx.stroke();

      // 2. THE ACTIVE LINE
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      const segments = 150;
      for (let i = 1; i <= segments * t; i++) {
        const sT = i / segments;
        const sX = Math.pow(1 - sT, 3) * (width / 2) + 3 * Math.pow(1 - sT, 2) * sT * cp1x + 3 * (1 - sT) * Math.pow(sT, 2) * cp2x + Math.pow(sT, 3) * (width / 2);
        const sY = Math.pow(1 - sT, 3) * 0 + 3 * Math.pow(1 - sT, 2) * sT * cp1y + 3 * (1 - sT) * Math.pow(sT, 2) * cp2y + Math.pow(sT, 3) * height;
        ctx.lineTo(sX, sY);
      }
      ctx.shadowBlur = 0; // No line shadow to keep it clean
      ctx.strokeStyle = '#ff4d2e';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 3. SINGLE LAYER UNIFORM GLOW
      // We use ONLY 2 stops to ensure a single smooth transition without "rings"
      const glowRadius = 150;
      const orangeGlow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
      
      orangeGlow.addColorStop(0, 'rgba(255, 77, 46, 0.8)'); // Solid Orange
      orangeGlow.addColorStop(1, 'rgba(255, 77, 46, 0)');   // Smooth fade to nothing
      
      ctx.fillStyle = orangeGlow;
      ctx.beginPath();
      ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleScroll = () => requestAnimationFrame(drawCurve);
    const handleResize = () => {
      updateCanvas();
      drawCurve();
    };

    updateCanvas();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-1">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};