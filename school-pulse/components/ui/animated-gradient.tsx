"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  intensity?: "subtle" | "medium" | "strong"
  speed?: "slow" | "medium" | "fast"
  className?: string
}

export function AnimatedGradient({
  children,
  intensity = "medium",
  speed = "medium",
  className,
  ...props
}: AnimatedGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)

  const intensityMap = {
    subtle: "opacity-20",
    medium: "opacity-30",
    strong: "opacity-40",
  }

  const speedMap = {
    slow: "animate-gradient-slow",
    medium: "animate-gradient",
    fast: "animate-gradient-fast",
  }

  useEffect(() => {
    if (!containerRef.current || !gradientRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = containerRef.current!.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      // Move gradient slightly based on mouse position
      gradientRef.current!.style.transform = `translate(${x * 10 - 5}px, ${y * 10 - 5}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)} {...props}>
      <div
        ref={gradientRef}
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 blur-3xl transition-transform duration-500 ease-out",
          intensityMap[intensity],
          speedMap[speed],
        )}
        style={{ backgroundSize: "200% 200%" }}
      />
      {children}
    </div>
  )
}
