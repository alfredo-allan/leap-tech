'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ExternalLink,
  MousePointerClick,
  Smartphone,
  Monitor,
  Sparkles,
  ArrowRight,
  Hand,
  Code2,
  ChevronLeft,
  ChevronRight,
  ChevronsRight
} from 'lucide-react'
import Image from 'next/image'
import ParallaxCards from '@/components/sub/parallax-cards'
import DeviceMockup from '@/components/sub/device-mockup'
import { TEMPLATES } from '@/constants/templates'

const G = ({ children }: { children: React.ReactNode }) => (
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">{children}</span>
)

const STEPS = ['Teste o site ao vivo', 'Escolha o modelo', 'Personalizamos com a sua marca']

const TechChips = ({ tech, center = false }: { tech: readonly string[]; center?: boolean }) => (
  <ul className={`flex flex-wrap gap-2 ${center ? 'justify-center' : ''}`}>
    {tech.map((t) => (
      <li key={t} className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs text-gray-300">
        {t}
      </li>
    ))}
  </ul>
)

const CategoryPill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-medium text-purple-300">
    <Sparkles className="w-3.5 h-3.5" />
    {children}
  </span>
)

/* ------------------------------------------------------------------ */
/* Desktop                                                             */
/* ------------------------------------------------------------------ */
const DesktopShowcase = () => {
  const [active, setActive] = useState(0)
  const template = TEMPLATES[active]
  const multiple = TEMPLATES.length > 1

  return (
    <div className="hidden lg:grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 xl:gap-20 items-center">
      {/* Informações do template ativo */}
      <div className="space-y-6 min-w-0">
        <div key={template.id} className="animate-fade-up space-y-6">
          <div className="flex items-center gap-3">
            <CategoryPill>{template.category}</CategoryPill>
            {multiple && (
              <span className="text-xs tracking-wider text-gray-500">
                <span className="text-white">{String(active + 1).padStart(2, '0')}</span> / {String(TEMPLATES.length).padStart(2, '0')}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl xl:text-4xl font-bold text-white leading-tight">{template.name}</h3>
            <p className="text-gray-400 leading-relaxed">{template.description}</p>
          </div>

          <TechChips tech={template.tech} />

          {/* Como funciona */}
          <ol className="grid grid-cols-3 gap-2">
            {STEPS.map((step, i) => (
              <li key={step} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <span className="block text-xs font-semibold mb-1">
                  <G>0{i + 1}</G>
                </span>
                <span className="text-xs text-gray-300 leading-snug">{step}</span>
              </li>
            ))}
          </ol>

          {/* CTAs */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <a
                href={template.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white
                  bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_30px_-6px_rgba(139,92,246,0.7)]
                  hover:shadow-[0_0_40px_-4px_rgba(34,211,238,0.7)] transition-shadow">
                <Monitor className="w-4 h-4" />
                Testar ao vivo
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contato"
                className="button-primary group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white border border-purple-500/30">
                Quero um projeto assim
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <p className="text-xs text-gray-500">
              Abre o site real em uma nova aba — navegue, clique e veja como ele funciona no seu próprio dispositivo.
            </p>
          </div>

        </div>

        {/* Seletor com miniaturas — fica fora do bloco animado para não perder o foco ao trocar */}
        {multiple && (
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActive((active - 1 + TEMPLATES.length) % TEMPLATES.length)}
              aria-label="Template anterior"
              className="shrink-0 w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] text-white flex items-center justify-center hover:border-purple-500/50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2 overflow-x-auto scrollbar-hidden py-1 px-0.5">
              {TEMPLATES.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(i)}
                  title={t.name}
                  aria-label={`Ver template ${t.name}`}
                  aria-pressed={active === i}
                  className={`relative shrink-0 w-16 h-10 rounded-md overflow-hidden border transition-all duration-300 ${active === i
                    ? 'border-purple-400 ring-2 ring-purple-500/40 opacity-100'
                    : 'border-white/10 opacity-50 hover:opacity-90'
                    }`}>
                  <Image src={t.desktopImage} alt="" fill sizes="64px" className="object-cover object-left-top" />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setActive((active + 1) % TEMPLATES.length)}
              aria-label="Próximo template"
              className="shrink-0 w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] text-white flex items-center justify-center hover:border-purple-500/50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Cards com parallax */}
      <ParallaxCards
        items={TEMPLATES.map((t) => ({ id: t.id, image: t.desktopImage, alt: `Template ${t.name}`, url: t.url }))}
        activeIndex={active}
        onActiveChange={setActive}
        hoverLabel="Abrir e testar ao vivo"
        frontDecorations={
          <>
            {/* Online */}
            <span className="absolute -top-4 -left-5 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#0b0b1a]/90 backdrop-blur text-xs text-white shadow-xl">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              Site no ar
            </span>

            {/* Tecnologia principal (só quando conhecida) */}
            {template.stack && (
              <span className="absolute left-[-28px] bottom-[22%] flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-[#0b0b1a]/90 backdrop-blur text-xs text-gray-300 shadow-xl">
                <span className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white">
                  <Code2 className="w-4 h-4" />
                </span>
                <span>
                  <span className="block text-white font-medium">{template.stack}</span>
                  <span className="text-[10px] text-gray-500">stack principal</span>
                </span>
              </span>
            )}

            {/* Chamada para clique */}
            <span className="absolute -bottom-5 right-8 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_10px_30px_-6px_rgba(139,92,246,0.8)]">
              <MousePointerClick className="w-4 h-4" />
              Clique e teste ao vivo
            </span>
          </>
        }
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile — um aparelho para cada template                             */
/* ------------------------------------------------------------------ */
const MobileCarousel = () => {
  const [active, setActive] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [nudge, setNudge] = useState(false)

  const rowRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const programmaticScroll = useRef(false)
  const programmaticTimer = useRef<ReturnType<typeof setTimeout>>()
  const scrollFrame = useRef<number>()

  const total = TEMPLATES.length
  const template = TEMPLATES[active]
  const multiple = total > 1

  /** Centraliza o slide dentro da fileira sem mexer no scroll vertical da página */
  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(total - 1, index))
      setActive(next)
      setHasInteracted(true)
      setNudge(false)

      const row = rowRef.current
      const slide = slideRefs.current[next]
      if (!row || !slide) return
      programmaticScroll.current = true
      clearTimeout(programmaticTimer.current)
      programmaticTimer.current = setTimeout(() => (programmaticScroll.current = false), 650)
      row.scrollTo({ left: slide.offsetLeft - (row.clientWidth - slide.offsetWidth) / 2, behavior: 'smooth' })
    },
    [total]
  )

  /** O slide mais próximo do centro vira o ativo */
  const handleScroll = () => {
    if (programmaticScroll.current) return
    if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current)
    scrollFrame.current = requestAnimationFrame(() => {
      const row = rowRef.current
      if (!row) return
      setHasInteracted(true)
      setNudge(false)
      const center = row.scrollLeft + row.clientWidth / 2
      let closest = 0
      let min = Infinity
      slideRefs.current.forEach((slide, i) => {
        if (!slide) return
        const d = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center)
        if (d < min) {
          min = d
          closest = i
        }
      })
      setActive(closest)
    })
  }

  /* "Espiada" animada na primeira vez que o carrossel aparece */
  useEffect(() => {
    const row = rowRef.current
    if (!row || !multiple) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNudge(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(row)
    return () => observer.disconnect()
  }, [multiple])

  useEffect(
    () => () => {
      clearTimeout(programmaticTimer.current)
      if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current)
    },
    []
  )

  return (
    <div className="lg:hidden">
      {/* Cabeçalho do carrossel */}
      {multiple && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium tracking-wider text-gray-400">
            <span className="text-white">{String(active + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </span>
          <span
            aria-hidden={hasInteracted}
            className={`flex items-center gap-1 text-xs text-purple-300 transition-opacity duration-500 ${hasInteracted ? 'opacity-0' : 'opacity-100'}`}>
            Deslize para ver mais
            <ChevronsRight className="w-4 h-4 animate-hint-x" />
          </span>
        </div>
      )}

      {/* Fileira de celulares */}
      <div
        ref={rowRef}
        onScroll={handleScroll}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Templates"
        className="-mx-4 sm:-mx-6 px-[14vw] overflow-x-auto snap-x snap-mandatory scrollbar-hidden">
        <div
          onAnimationEnd={() => setNudge(false)}
          className={`flex w-max ${nudge && !hasInteracted ? 'animate-swipe-nudge' : ''}`}>
          {TEMPLATES.map((t, i) => {
            const isActive = active === i
            return (
              <article
                key={t.id}
                ref={(el) => {
                  slideRefs.current[i] = el
                }}
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${total}: ${t.name}`}
                onClick={(e) => {
                  // Toque num celular lateral traz ele para o centro em vez de abrir o site
                  if (!isActive) {
                    e.preventDefault()
                    goTo(i)
                  }
                }}
                className={`shrink-0 w-[72vw] max-w-[320px] snap-center flex flex-col items-center text-center transition-all duration-500
                  ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.88]'}`}>
                <div className="mb-1 space-y-2">
                  <CategoryPill>{t.category}</CategoryPill>
                  {/* Altura fixa de 2 linhas: mantém os celulares alinhados entre os slides */}
                  <h3 className="min-h-[3.5rem] flex items-center justify-center text-xl font-bold text-white leading-tight">{t.name}</h3>
                </div>

                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`Abrir o template ${t.name} no seu celular (nova aba)`}
                  className="relative block py-6 outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 rounded-[3rem]">
                  <DeviceMockup
                    image={t.mobileImage}
                    alt={`Template ${t.name} no celular`}
                    scale={0.85}
                    autoAnimate={isActive}
                    parallaxStrength={8}
                    rotateStrength={4}
                    screenColor={t.screenColor}
                    screenTheme={t.screenTheme}
                    glowColor={t.accent}
                    priority={i === 0}
                  />

                  {/* Selo "toque para testar" */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 bottom-1 z-10 flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold text-white
                      bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_10px_30px_-6px_rgba(139,92,246,0.9)] transition-opacity duration-500
                      ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="absolute inset-0 rounded-full bg-purple-500/40 animate-ping" aria-hidden />
                    <Hand className="relative w-4 h-4" />
                    <span className="relative">Toque para testar</span>
                  </span>
                </a>
              </article>
            )
          })}
        </div>
      </div>

      {/* Controles */}
      {multiple && (
        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Template anterior"
            className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-white flex items-center justify-center transition-opacity active:scale-95 disabled:opacity-30">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {TEMPLATES.map((t, i) => (
              <button key={t.id} type="button" onClick={() => goTo(i)} aria-label={`Ir para ${t.name}`} className="p-1">
                <span
                  className={`block h-2 rounded-full transition-all duration-500 ${active === i ? 'w-6 bg-gradient-to-r from-purple-500 to-cyan-500' : 'w-2 bg-white/25'}`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === total - 1}
            aria-label="Próximo template"
            className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-white flex items-center justify-center transition-opacity active:scale-95 disabled:opacity-30">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Detalhes do template em foco */}
      <div key={template.id} className="animate-fade-up mt-6 flex flex-col items-center text-center" aria-live="polite">
        <p className="text-sm text-gray-400 leading-relaxed max-w-sm">{template.description}</p>

        <div className="mt-4">
          <TechChips tech={template.tech} center />
        </div>

        <div className="mt-6 w-full max-w-sm space-y-3">
          <a
            href={template.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full text-sm font-semibold text-white
              bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_30px_-6px_rgba(139,92,246,0.7)] active:scale-[0.98] transition-transform">
            <Smartphone className="w-4 h-4" />
            Testar no meu celular
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-xs text-gray-500">Abre o site real — navegue como um cliente faria.</p>
          <a
            href="#contato"
            className="button-primary flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full text-sm font-semibold text-white border border-purple-500/30">
            Quero um projeto assim
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
export default function TemplatesShowcase() {
  return (
    <section id="templates" className="scroll-mt-16 w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 sm:mb-6 Welcome-box mx-auto">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-sm font-semibold tracking-wider">
              TEMPLATES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight px-4">
            Projetos prontos para a <G>sua marca</G>
          </h2>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
            Modelos reais, construídos com as tecnologias que usamos. Teste no seu dispositivo, escolha o que combina com o seu negócio
            e nós personalizamos com a sua identidade.
          </p>
        </div>

        <DesktopShowcase />

        <MobileCarousel />
      </div>
    </section>
  )
}
