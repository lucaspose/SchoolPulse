import type React from "react"
import { cn } from "@/lib/utils"

interface NeonTextProps {
  children: React.ReactNode
  color?: string
  glowColor?: string
  intensity?: "subtle" | "medium" | "strong"
  className?: string
  as?: React.ElementType
}

export function NeonText({
  children,
  color = "text-primary",
  glowColor = "text-primary",
  intensity = "medium",
  className,
  as: Component = "span",
  ...props
}: NeonTextProps) {
  const intensityMap = {
    subtle: "text-shadow-sm",
    medium: "text-shadow-md",
    strong: "text-shadow-lg",
  }

  return (
    <Component
      className={cn(
        color,
        "font-bold tracking-wider",
        {
          "text-shadow-sm": intensity === "subtle",
          "text-shadow-md": intensity === "medium",
          "text-shadow-lg": intensity === "strong",
        },
        className,
      )}
      style={{
        textShadow: `0 0 5px ${glowColor}, 0 0 10px ${glowColor}, 0 0 15px ${glowColor}`,
      }}
      {...props}
    >
      {children}
    </Component>
  )
}
