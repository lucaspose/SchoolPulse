"use client"

import type React from "react"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Card, type CardProps } from "@/components/ui/card"

interface GlowCardProps extends CardProps {
  glowColor?: string
  glowIntensity?: "subtle" | "medium" | "strong"
  interactive?: boolean
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(132, 90, 223, 0.5)",
  glowIntensity = "medium",
  interactive = true,
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const intensityMap = {
    subtle: "0 0 15px",
    medium: "0 0 25px",
    strong: "0 0 35px",
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setGlowPosition({ x, y })
  }

  return (
    <Card
      ref={cardRef}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        interactive && "hover:shadow-lg hover:-translate-y-1",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        boxShadow: isHovering ? `${intensityMap[glowIntensity]} ${glowColor}` : "",
      }}
      {...props}
    >
      {interactive && isHovering && (
        <div
          className="absolute pointer-events-none opacity-70 blur-xl transition-opacity duration-300"
          style={{
            background: glowColor,
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            left: `${glowPosition.x - 75}px`,
            top: `${glowPosition.y - 75}px`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </Card>
  )
}
