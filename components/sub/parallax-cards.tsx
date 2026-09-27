'use client'

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import Image from 'next/image'
import { Lock, ExternalLink, RotateCw } from 'lucide-react'

export interface ParallaxCardItem {
  id: string
  image: string
  alt: string
  url: string
}

export interface ParallaxCardsProps {
  items: readonly ParallaxCardItem[]
  activeIndex: number
  onActiveChange?: (index: number) => void
  /** Força da perspectiva 3D (px) */
  perspective?: number
  /** Sensibilidade do parallax ao mouse (graus de rotação da cena) */
  mouseSensitivity?: number
  /** Duração da troca de cards (s) */
  animationDuration?: number
  /** Desfoque / escurecimento dos cards ao fundo */
  enableDepthFog?: boolean
  /** Card da frente "puxado" levemente em direção ao cursor */
  enableMagneticAttraction?: boolean
  magneticStrength?: number
  /** Camadas decorativas atrás quando há poucos cards, para manter a profundidade */
  fillDepth?: boolean
  /** Elementos flutuantes sobre o card da frente (ficam em translateZ positivo) */
  frontDecorations?: ReactNode
  /** Texto do overlay no hover do card da frente */
  hoverLabel?: string
  className?: string
}

const MAX_VISIBLE = 3

const hostOf = (url: string) => {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

/** Janela de navegador com o print do site */
const BrowserFrame = ({ item, interactive, hoverLabel }: { item: ParallaxCardItem; interactive: boolean; hoverLabel: string }) => (
  <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0b0b1a] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
    {/* Barra do navegador */}
    <div className="flex items-center gap-3 px-4 h-10 bg-white/[0.04] border-b border-white/10">
      <span className="flex gap-1.5" aria-hidden>
        <i className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <i className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <i className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </span>
      <span className="flex-1 flex justify-center">
        <span className="flex items-center gap-1.5 max-w-[70%] px-3 h-6 rounded-md bg-white/[0.06] text-[11px] text-gray-400 truncate">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          {hostOf(item.url)}
        </span>
      </span>
      <RotateCw className="w-3.5 h-3.5 text-gray-500" aria-hidden />
    </div>

    {/* Print */}
    <div className="relative aspect-[16/9] overflow-hidden group/shot">
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(min-width: 1280px) 640px, 50vw"
        className={`object-cover object-top transition-transform duration-700 ${interactive ? 'group-hover/card:scale-[1.03]' : ''}`}
      />
      {interactive && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#030014]/80 via-[#030014]/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_30px_rgba(139,92,246,0.6)]">
            {hoverLabel}
            <ExternalLink className="w-4 h-4" />
          </span>
        </div>
      )}
    </div>
  </div>
)

/**
 * Cards em camadas 3D com profundidade guiada pelo mouse.
 * A rotação da cena é aplicada via CSS variables (sem re-render a cada movimento).
 */
export default function ParallaxCards({
  items,
  activeIndex,
  onActiveChange,
  perspective = 2500,
  mouseSensitivity = 3,
  animationDuration = 1.2,
  enableDepthFog = true,
  enableMagneticAttraction = true,
  magneticStrength = 14,
  fillDepth = true,
  frontDecorations,
  hoverLabel = 'Abrir site ao vivo',
  className = ''
}: ParallaxCardsProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const total = items.length

  const setVars = (x: number, y: number) => {
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--mx', x.toFixed(3))
    el.style.setProperty('--my', y.toFixed(3))
  }

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setVars(((e.clientX - rect.left) / rect.width) * 2 - 1, ((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  const sceneStyle: CSSProperties = {
    transformStyle: 'preserve-3d',
    transform: `rotateY(calc(var(--mx) * ${mouseSensitivity * 2}deg)) rotateX(calc(var(--my) * ${-mouseSensitivity * 1.6}deg))`,
    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
  }

  /** Posição de cada camada conforme a distância até o card ativo */
  const layerStyle = (depth: number): CSSProperties => ({
    transformStyle: 'preserve-3d',
    transform: `translate3d(${depth * 7}%, ${depth * -9}%, ${depth * -160}px)`,
    transition: `transform ${animationDuration}s cubic-bezier(0.22, 1, 0.36, 1), opacity ${animationDuration}s ease, filter ${animationDuration}s ease`,
    opacity: depth === 0 ? 1 : enableDepthFog ? Math.max(0, 1 - depth * 0.35) : 1,
    filter: depth === 0 || !enableDepthFog ? 'none' : `blur(${depth * 2}px) brightness(${1 - depth * 0.25})`,
    zIndex: MAX_VISIBLE - depth
  })

  const magneticStyle: CSSProperties = enableMagneticAttraction
    ? {
      transformStyle: 'preserve-3d',
      transform: `translate3d(calc(var(--mx) * ${magneticStrength}px), calc(var(--my) * ${magneticStrength}px), 0)`,
      transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
    }
    : { transformStyle: 'preserve-3d' }

  const ghostCount = fillDepth ? Math.max(0, MAX_VISIBLE - total) : 0

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setVars(0, 0)}
      className={`relative w-full ${className}`}
      style={{ perspective, ['--mx' as string]: 0, ['--my' as string]: 0 }}>
      {/* Espaço reservado para os cards de trás (acima e à direita) */}
      <div className="relative pt-[9%] pr-[14%]" style={sceneStyle}>
        {/* Camadas decorativas para manter a profundidade com poucos templates */}
        {Array.from({ length: ghostCount }).map((_, g) => {
          const depth = total + g
          return (
            <div key={`ghost-${g}`} aria-hidden className="absolute inset-0 pt-[9%] pr-[14%] pointer-events-none" style={layerStyle(depth)}>
              <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-purple-500/25 via-slate-900/70 to-cyan-500/25">
                <div className="h-10 border-b border-white/10 bg-white/[0.03]" />
                <div className="aspect-[16/9]" />
              </div>
            </div>
          )
        })}

        {items.map((item, i) => {
          const depth = (i - activeIndex + total) % total
          const isFront = depth === 0
          if (depth >= MAX_VISIBLE) return null

          const layer = layerStyle(depth)

          return (
            <div
              key={item.id}
              className={isFront ? 'relative' : 'absolute inset-0 pt-[9%] pr-[14%]'}
              style={layer}>
              {isFront ? (
                <div style={magneticStyle}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.alt} — abrir o site ao vivo em nova aba`}
                    className="group/card block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70">
                    <BrowserFrame item={item} interactive hoverLabel={hoverLabel} />
                  </a>
                  {/* Elementos flutuando à frente do card */}
                  {frontDecorations && (
                    <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(90px)', transformStyle: 'preserve-3d' }}>
                      {frontDecorations}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onActiveChange?.(i)}
                  aria-label={`Trazer para frente: ${item.alt}`}
                  className="block w-full text-left cursor-pointer">
                  <BrowserFrame item={item} interactive={false} hoverLabel={hoverLabel} />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
