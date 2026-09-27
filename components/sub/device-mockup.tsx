'use client'

import { useEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import Image from 'next/image'

export interface DeviceMockupProps {
  /** Print da tela (proporção de celular). Ignorado se `children` for passado. */
  image?: string
  alt?: string
  children?: ReactNode
  /** Escala do aparelho (0.5 – 1.5) */
  scale?: number
  enableParallax?: boolean
  /** Deslocamento máximo em px */
  parallaxStrength?: number
  enableRotate?: boolean
  /** Rotação máxima em graus */
  rotateStrength?: number
  /** Movimento automático em "8" (útil em telas touch, onde não há hover) */
  autoAnimate?: boolean
  /** Cor da barra de status — use a cor do topo do site para ficar natural */
  screenColor?: string
  /** Cor do brilho atrás do aparelho */
  glowColor?: string
  priority?: boolean
  className?: string
}

/**
 * Mockup de celular 100% em CSS, com parallax + rotação 3D.
 * Os movimentos são aplicados via CSS variables (sem re-render do React).
 */
export default function DeviceMockup({
  image,
  alt = '',
  children,
  scale = 1,
  enableParallax = true,
  parallaxStrength = 15,
  enableRotate = true,
  rotateStrength = 3,
  autoAnimate = false,
  screenColor = '#000',
  glowColor = '#8b5cf6',
  priority = false,
  className = ''
}: DeviceMockupProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const hovering = useRef(false)

  const setVars = (x: number, y: number) => {
    const el = rootRef.current
    if (!el) return
    el.style.setProperty('--dx', x.toFixed(3))
    el.style.setProperty('--dy', y.toFixed(3))
  }

  /* Animação automática em "8" (lemniscata) */
  useEffect(() => {
    if (!autoAnimate) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame: number
    let visible = true
    const el = rootRef.current
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    if (el) observer.observe(el)

    const start = performance.now()
    const tick = (now: number) => {
      if (visible && !hovering.current) {
        const t = (now - start) / 2600
        setVars(Math.sin(t) * 0.8, (Math.sin(2 * t) / 2) * 0.8)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [autoAnimate])

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return
    const rect = e.currentTarget.getBoundingClientRect()
    hovering.current = true
    setVars(((e.clientX - rect.left) / rect.width) * 2 - 1, ((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  const handlePointerLeave = () => {
    hovering.current = false
    if (!autoAnimate) setVars(0, 0)
  }

  const p = enableParallax ? parallaxStrength : 0
  const r = enableRotate ? rotateStrength : 0

  const phoneStyle: CSSProperties = {
    transform: `translate3d(calc(var(--dx) * ${p}px), calc(var(--dy) * ${p}px), 0)
      rotateY(calc(var(--dx) * ${r}deg)) rotateX(calc(var(--dy) * ${-r}deg))`,
    transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
    transformStyle: 'preserve-3d'
  }

  return (
    <div
      ref={rootRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative mx-auto ${className}`}
      style={{ width: 260 * scale, perspective: 1200, ['--dx' as string]: 0, ['--dy' as string]: 0 }}>
      {/* Glow */}
      <div
        aria-hidden
        className="absolute inset-x-[-15%] top-[15%] bottom-[10%] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: `radial-gradient(closest-side, ${glowColor}, transparent)` }}
      />

      <div className="relative" style={phoneStyle}>
        {/* Botões laterais */}
        <span aria-hidden className="absolute -left-[3px] top-[18%] h-8 w-[3px] rounded-l bg-zinc-600" />
        <span aria-hidden className="absolute -left-[3px] top-[27%] h-12 w-[3px] rounded-l bg-zinc-600" />
        <span aria-hidden className="absolute -left-[3px] top-[37%] h-12 w-[3px] rounded-l bg-zinc-600" />
        <span aria-hidden className="absolute -right-[3px] top-[30%] h-16 w-[3px] rounded-r bg-zinc-600" />

        {/* Moldura */}
        <div
          className="relative rounded-[2.9rem] p-[9px] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-700
            shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.12)]">
          {/* Tela */}
          <div className="relative overflow-hidden rounded-[2.35rem] bg-black aspect-[9/19.5] flex flex-col isolate">
            {/* Barra de status */}
            <div
              className="relative z-20 h-9 shrink-0 flex items-center justify-between px-6 text-[10px] font-semibold text-white"
              style={{ backgroundColor: screenColor }}>
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span className="flex items-end gap-[1.5px] h-2.5" aria-hidden>
                  <i className="w-[2.5px] h-1 bg-white rounded-[1px]" />
                  <i className="w-[2.5px] h-1.5 bg-white rounded-[1px]" />
                  <i className="w-[2.5px] h-2 bg-white rounded-[1px]" />
                  <i className="w-[2.5px] h-2.5 bg-white rounded-[1px]" />
                </span>
                <span className="ml-1 w-5 h-2.5 rounded-[3px] border border-white/70 p-[1px]" aria-hidden>
                  <span className="block h-full w-3/4 bg-white rounded-[1px]" />
                </span>
              </span>
            </div>

            {/* Dynamic Island */}
            <span aria-hidden className="absolute z-30 top-2 left-1/2 -translate-x-1/2 w-[76px] h-[22px] rounded-full bg-black" />

            {/* Conteúdo */}
            <div className="relative flex-1 overflow-hidden" style={{ backgroundColor: screenColor }}>
              {children ??
                (image && (
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    priority={priority}
                    sizes={`${Math.round(260 * scale)}px`}
                    className="object-cover object-top scale-[1.03] origin-top"
                  />
                ))}
            </div>

            {/* Reflexo que acompanha o movimento */}
            <div
              aria-hidden
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: 'linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 38%)',
                transform: 'translate3d(calc(var(--dx) * -18px), calc(var(--dy) * -18px), 0)',
                transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            />

            {/* Home indicator */}
            <span aria-hidden className="absolute z-30 bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  )
}
