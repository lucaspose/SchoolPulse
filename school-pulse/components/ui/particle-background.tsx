"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ParticleBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  particleCount?: number
  color?: string
  speed?: number
  className?: string
}

export function ParticleBackground({
  particleCount = 50,
  color = "rgba(255, 255, 255, 0.5)",
  speed = 1,
  className,
  ...props
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * speed * 0.5,
        speedY: (Math.random() - 0.5) * speed * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = color.replace(")", `, ${particle.opacity})`)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [particleCount, color, speed])

  return <canvas ref={canvasRef} className={cn("absolute inset-0 -z-10 pointer-events-none", className)} {...props} />
}
