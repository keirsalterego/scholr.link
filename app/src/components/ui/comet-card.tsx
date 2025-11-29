"use client";

import React, { useRef, useState } from "react";

interface CometCardProps {
  children: React.ReactNode;
  className?: string;
  rotateIntensity?: number;
  scaleOnHover?: number;
  glareEnabled?: boolean;
}

export function CometCard({
  children,
  className = "",
  rotateIntensity = 15,
  scaleOnHover = 1.02,
  glareEnabled = true,
}: CometCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation based on mouse position
    const rotateY = (mouseX / (rect.width / 2)) * rotateIntensity;
    const rotateX = -(mouseY / (rect.height / 2)) * rotateIntensity;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover})`);

    // Calculate glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("rotateX(0deg) rotateY(0deg) scale(1)");
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`comet-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        perspectiveOrigin: "center center",
      }}
    >
      <div
        className="comet-card-inner"
        style={{
          transformStyle: "preserve-3d",
          transform: transform,
          transition: isHovered 
            ? "transform 0.1s ease-out" 
            : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform",
        }}
      >
        {children}
        
        {/* Glare effect overlay */}
        {glareEnabled && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: isHovered
                ? `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
                : "none",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        )}
      </div>
    </div>
  );
}
