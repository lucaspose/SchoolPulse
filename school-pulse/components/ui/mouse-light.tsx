"use client"

import { useEffect, useState } from "react"

interface MouseLightProps {
  color?: string
  size?: number
  blur?: number
  opacity?: number
  delay?: number
  className?: string
}

export function MouseLight({
  color = "rgba(132, 90, 223, 0.4)",
  size = 400,
  blur = 100,
  opacity = 0.5,
  delay = 0.08,
  className,
}: MouseLightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      // Delay the position update for a smoother effect
      setTimeout(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      }, delay * 1000)

      // Show the light if it's not already visible
      if (!isVisible) {
        setIsVisible(true)
      }

      // Hide the light after 2 seconds of inactivity
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsVisible(false)
      }, 2000)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.body.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      clearTimeout(timeoutId)
    }
  }, [delay, isVisible])

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className || ""}`}
      style={{
        left: position.x - size / 2,
        top: position.y - size / 2,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
        transform: "translate3d(0, 0, 0)",
        willChange: "left, top",
      }}
      aria-hidden="true"
    />
  )
}
