"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Card, type CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InteractiveCardProps extends CardProps {
  maxRotation?: number
  glowColor?: string
  glowIntensity?: "subtle" | "medium" | "strong"
  interactive?: boolean
}

export function InteractiveCard({
  children,
  className,
  maxRotation = 10,
  glowColor = "rgba(132, 90, 223, 0.5)",
  glowIntensity = "medium",
  interactive = true,
  ...props
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
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

    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Calculate rotation based on mouse position
    const rotateX = (y / (rect.height / 2)) * -maxRotation
    const rotateY = (x / (rect.width / 2)) * maxRotation

    setRotation({ x: rotateX, y: rotateY })
    setGlowPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotation({ x: 0, y: 0 })
  }

  return (
    <Card
      ref={cardRef}
      className={cn("relative overflow-hidden transition-all duration-300", interactive && "transform-gpu", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          interactive && isHovering
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            : "none",
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
