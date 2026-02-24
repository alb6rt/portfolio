"use client";

import { useRef, useEffect, useCallback } from "react";
import styles from "./PiAnimation.module.css";

const BATCH_SIZE = 3;
const MAX_POINTS = 5000;
const FADE_DURATION = 60;
const DOT_RADIUS = 1.5;

// two states/phases
// i.e. drawing or fading
export default function PiAnimation() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    insideCount: 0,
    totalCount: 0,
    points: [],
    phase: "drawing",
    fadeFrame: 0,
    animId: null,
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    const size = canvas.logicalSize || canvas.width;

    if (s.phase === "drawing") {
      // add a batch of points
      for (let i = 0; i < BATCH_SIZE; i++) {
        const x = Math.random();
        const y = Math.random();
        const inside = x * x + y * y <= 1;
        if (inside) s.insideCount++;
        s.totalCount++;
        s.points.push({ x, y, inside });

        // draw dot
        const px = x * size;
        const py = y * size;
        ctx.beginPath();
        ctx.arc(px, py, DOT_RADIUS, 0, Math.PI * 2);
        if (inside) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        } 
        else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        }
        ctx.fill();
      }

      // draw quarter circle
      ctx.clearRect(0, 0, size, 24);
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI / 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pi estimate
      let piEstimate;
      if (s.totalCount > 0) {
        piEstimate = (4 * s.insideCount / s.totalCount).toFixed(6);
      } else {
        piEstimate = "—";
      }
      ctx.font = `500 11px 'Inter', sans-serif`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.textAlign = "right";
      ctx.fillText(`π ≈ ${piEstimate}`, size - 8, 16);

      if (s.totalCount >= MAX_POINTS) {
        s.phase = "fading";
        s.fadeFrame = 0;
      }
    } else if (s.phase === "fading") {
      s.fadeFrame++;

      // fade effect by overlaying dark background
      ctx.fillStyle = `rgba(11, 11, 11, ${0.06})`;
      ctx.fillRect(0, 0, size, size);

      if (s.fadeFrame >= FADE_DURATION) {
        ctx.clearRect(0, 0, size, size);
        s.insideCount = 0;
        s.totalCount = 0;
        s.points = [];
        s.phase = "drawing";
        s.fadeFrame = 0;
      }
    }

    s.animId = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);

      canvas.logicalSize = size;

      // reset state on resize
      const s = stateRef.current;
      s.insideCount = 0;
      s.totalCount = 0;
      s.points = [];
      s.phase = "drawing";
      s.fadeFrame = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement);

    stateRef.current.animId = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      if (stateRef.current.animId) {
        cancelAnimationFrame(stateRef.current.animId);
      }
    };
  }, [draw]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
