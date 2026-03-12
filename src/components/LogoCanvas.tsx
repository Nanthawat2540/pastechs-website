'use client'

import { useEffect, useRef } from 'react'

interface LogoCanvasProps {
  src: string
  width: number
  height: number
  className?: string
  /** ms per full gradient cycle, default 4000 */
  speed?: number
  /** gradient opacity 0-1, default 0.88 */
  intensity?: number
}

/**
 * Renders an image on canvas with an animated sweeping gradient (ไล่สี)
 * applied via source-atop compositing — gradient paints only through the logo pixels.
 * Colors cycle: sky-blue → cyan → teal → orange → sky-blue
 */
export default function LogoCanvas({
  src,
  width,
  height,
  className,
  speed = 4000,
  intensity = 0.88,
}: LogoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Retina / high-DPI support
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src

    img.onload = () => {
      const draw = () => {
        ctx.clearRect(0, 0, width, height)

        // 1. Draw original logo
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
        ctx.drawImage(img, 0, 0, width, height)

        // 2. Build animated gradient
        const phase = (Date.now() % speed) / speed          // 0 → 1
        const angle = phase * Math.PI * 2                   // full rotation

        // Gradient origin sweeps diagonally across the logo
        const cx = width * 0.5
        const cy = height * 0.5
        const radius = Math.max(width, height) * 0.75
        const x1 = cx + Math.cos(angle) * radius
        const y1 = cy + Math.sin(angle) * radius
        const x2 = cx - Math.cos(angle) * radius
        const y2 = cy - Math.sin(angle) * radius

        const grad = ctx.createLinearGradient(x1, y1, x2, y2)

        // Brand color stops cycling with phase offset
        const stops: [number, string][] = [
          [0,    `hsla(199, 92%, 39%, ${intensity})`],  // sky-600  #0284c7
          [0.25, `hsla(187, 85%, 42%, ${intensity})`],  // cyan-600 #0891b2
          [0.5,  `hsla(174, 72%, 38%, ${intensity})`],  // teal-600 #0d9488
          [0.75, `hsla(22,  93%, 47%, ${intensity})`],  // orange-600 #ea580c
          [1,    `hsla(199, 92%, 39%, ${intensity})`],  // loop back
        ]

        stops.forEach(([stop, color]) => {
          grad.addColorStop(stop, color)
        })

        // 3. Paint gradient ONLY through existing logo pixels
        ctx.globalCompositeOperation = 'source-atop'
        ctx.globalAlpha = 1
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)

        // 4. Shine sweep — a thin bright diagonal band that travels left→right
        const sweepX = ((phase * (width + 200)) - 100)
        const shine = ctx.createLinearGradient(sweepX - 60, 0, sweepX + 60, height)
        shine.addColorStop(0,   'rgba(255,255,255,0)')
        shine.addColorStop(0.5, 'rgba(255,255,255,0.18)')
        shine.addColorStop(1,   'rgba(255,255,255,0)')
        ctx.globalCompositeOperation = 'source-atop'
        ctx.fillStyle = shine
        ctx.fillRect(0, 0, width, height)

        // 5. Reset
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1

        rafRef.current = requestAnimationFrame(draw)
      }

      draw()
    }

    img.onerror = () => {
      // Fallback: draw placeholder text
      ctx.fillStyle = '#0284c7'
      ctx.font = `bold ${height * 0.4}px Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('PAS', width / 2, height / 2)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [src, width, height, speed, intensity])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      aria-label="PAS Tech Group logo"
    />
  )
}
