'use client'

import { useEffect, useRef } from 'react'

interface LogoCanvasProps {
  src: string
  width: number
  height: number
  className?: string
  /** ms per full gradient cycle, default 4000 */
  speed?: number
  /** gradient base opacity 0-1, default 0.88 */
  intensity?: number
}

interface Sparkle {
  x: number
  y: number
  r: number
  life: number   // 0 → 1
  speed: number
  color: string
}

/**
 * Renders an image on canvas with a premium animated effect:
 * - Rotating 6-stop vibrant gradient (cyan → blue → violet → gold)
 * - Breathing intensity (sine-wave pulse)
 * - Soft glow shadow behind the logo
 * - Secondary counter-rotating accent gradient for depth
 * - Two shine sweeps (fast/narrow + slow/wide)
 * - Sparkle particles that appear & fade within the logo
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

    // Sparkle color palette
    const sparkColors = ['#00e5ff', '#60a5fa', '#a78bfa', '#fbbf24', '#f0f9ff']
    const sparkles: Sparkle[] = []
    let lastSparkleTs = 0

    img.onload = () => {
      const draw = (ts: number) => {
        ctx.clearRect(0, 0, width, height)

        const phase = (Date.now() % speed) / speed   // 0 → 1
        const angle = phase * Math.PI * 2

        // Breathing: intensity pulses subtly like a heartbeat
        const breathe = Math.sin(phase * Math.PI * 2) * 0.07
        const alpha = Math.max(0.72, Math.min(0.98, intensity + breathe))

        const cx = width * 0.5
        const cy = height * 0.5
        const rMax = Math.max(width, height) * 0.92

        // ── 1. Soft glow behind the logo (color shifts with phase)
        ctx.save()
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 0.38
        ctx.shadowBlur = 24
        ctx.shadowColor = `hsla(${185 + phase * 90}, 100%, 60%, 0.85)`
        ctx.drawImage(img, 0, 0, width, height)
        ctx.restore()

        // ── 2. Logo base — clean, full opacity
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
        ctx.drawImage(img, 0, 0, width, height)

        // ── 3. Primary rotating 6-stop gradient (vibrant tech palette)
        const grad = ctx.createLinearGradient(
          cx + Math.cos(angle) * rMax, cy + Math.sin(angle) * rMax,
          cx - Math.cos(angle) * rMax, cy - Math.sin(angle) * rMax,
        )
        grad.addColorStop(0,    `hsla(185, 100%, 52%, ${alpha})`)  // electric cyan
        grad.addColorStop(0.18, `hsla(200, 100%, 58%, ${alpha})`)  // sky blue
        grad.addColorStop(0.38, `hsla(225,  90%, 62%, ${alpha})`)  // cornflower
        grad.addColorStop(0.58, `hsla(258,  82%, 64%, ${alpha})`)  // violet
        grad.addColorStop(0.78, `hsla(38,   95%, 58%, ${alpha})`)  // amber-gold
        grad.addColorStop(1,    `hsla(185, 100%, 52%, ${alpha})`)  // loop back

        ctx.globalCompositeOperation = 'source-atop'
        ctx.globalAlpha = 1
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)

        // ── 4. Secondary counter-rotating accent gradient (adds depth + richness)
        const angle2 = -phase * Math.PI * 1.35
        const rSec = rMax * 0.72
        const grad2 = ctx.createLinearGradient(
          cx + Math.cos(angle2) * rSec, cy + Math.sin(angle2) * rSec,
          cx - Math.cos(angle2) * rSec, cy - Math.sin(angle2) * rSec,
        )
        grad2.addColorStop(0,   'hsla(195, 100%, 75%, 0.20)')
        grad2.addColorStop(0.5, 'hsla(282, 100%, 72%, 0.12)')
        grad2.addColorStop(1,   'hsla(195, 100%, 75%, 0.20)')

        ctx.globalCompositeOperation = 'source-atop'
        ctx.fillStyle = grad2
        ctx.fillRect(0, 0, width, height)

        // ── 5. Shine sweep 1 — fast, narrow, bright
        const sx1 = phase * (width + 260) - 130
        const sh1 = ctx.createLinearGradient(sx1 - 42, 0, sx1 + 42, height * 0.75)
        sh1.addColorStop(0,   'rgba(255,255,255,0)')
        sh1.addColorStop(0.5, 'rgba(255,255,255,0.32)')
        sh1.addColorStop(1,   'rgba(255,255,255,0)')

        ctx.globalCompositeOperation = 'source-atop'
        ctx.fillStyle = sh1
        ctx.fillRect(0, 0, width, height)

        // ── 6. Shine sweep 2 — slow, wide, cool-toned
        const phase2 = ((Date.now() * 0.52) % speed) / speed
        const sx2 = phase2 * (width + 520) - 260
        const sh2 = ctx.createLinearGradient(sx2 - 115, 0, sx2 + 115, height)
        sh2.addColorStop(0,   'rgba(170,240,255,0)')
        sh2.addColorStop(0.5, 'rgba(170,240,255,0.14)')
        sh2.addColorStop(1,   'rgba(170,240,255,0)')

        ctx.globalCompositeOperation = 'source-atop'
        ctx.fillStyle = sh2
        ctx.fillRect(0, 0, width, height)

        // ── 7. Sparkle particles — glints within logo area
        if (ts - lastSparkleTs > 115 && sparkles.length < 14) {
          sparkles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 3.2 + 1.2,
            life: 0,
            speed: 0.007 + Math.random() * 0.013,
            color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
          })
          lastSparkleTs = ts
        }

        for (let i = sparkles.length - 1; i >= 0; i--) {
          const s = sparkles[i]
          s.life += s.speed
          if (s.life >= 1) { sparkles.splice(i, 1); continue }

          const opa = Math.sin(s.life * Math.PI) * 0.88
          const rg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 2.8)
          rg.addColorStop(0, s.color)
          rg.addColorStop(1, 'rgba(0,0,0,0)')

          ctx.globalCompositeOperation = 'source-atop'
          ctx.globalAlpha = opa
          ctx.fillStyle = rg
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 2.8, 0, Math.PI * 2)
          ctx.fill()
        }

        // ── 8. Reset composite state
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1

        rafRef.current = requestAnimationFrame(draw)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    img.onerror = () => {
      ctx.fillStyle = '#00d4ff'
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
