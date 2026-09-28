'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode, type TouchEvent } from 'react'
import { Palette, Target, Figma, Code2, Flag, Paintbrush, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import Image from 'next/image'

interface Service {
  id: number
  icon: JSX.Element
  title: string
  description: string
  /** Ícone de identificação exibido no canto superior direito do painel */
  badge: JSX.Element
  heading: ReactNode
  text: ReactNode
  avatarSrc: string
  avatarAlt: string
}

/** Texto com o gradiente da marca */
const G = ({ children, strong = false }: { children: ReactNode; strong?: boolean }) => (
  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 ${strong ? 'font-semibold' : ''}`}>
    {children}
  </span>
)

const services: Service[] = [
  {
    id: 0,
    icon: <Palette className="w-5 h-5" />,
    title: 'Branding',
    description: 'Construir identidades visuais lindas que ressoem com a essência da sua marca.',
    badge: <Flag className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
    heading: (
      <>
        Do <G>logo</G> à <G>marca</G> que as pessoas reconhecem
      </>
    ),
    text: (
      <>
        Criamos ou melhoramos o visual do seu negócio para transmitir <G strong>confiança</G> e profissionalismo.
      </>
    ),
    avatarSrc: '/avatar/avatar-branding.png',
    avatarAlt: 'Branding Avatar'
  },
  {
    id: 1,
    icon: <Target className="w-5 h-5" />,
    title: 'Social Media',
    description: 'Ampliar e fortalecer sua marca, criando estratégias que engajam e convertem.',
    badge: <Target className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />,
    heading: (
      <>
        Sua empresa mais ativa nas <G>redes sociais</G>
      </>
    ),
    text: <>Conteúdos organizados para atrair clientes e fortalecer sua presença online.</>,
    avatarSrc: '/avatar/avatar-social.png',
    avatarAlt: 'Social Avatar'
  },
  {
    id: 2,
    icon: <Figma className="w-5 h-5" />,
    title: 'Design UI UX',
    description: 'Sites com uma experiência de usuário intuitiva e com alto desempenho.',
    badge: <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />,
    heading: (
      <>
        Um visual que <G>chama atenção</G> e vende mais
      </>
    ),
    text: <>Design simples, bonito e pensado para converter visitantes em clientes.</>,
    avatarSrc: '/avatar/avatar-design.png',
    avatarAlt: 'Design Avatar'
  },
  {
    id: 3,
    icon: <Code2 className="w-5 h-5" />,
    title: 'Desenvolvimento',
    description: 'Sites, aplicações e sistemas rápidos, seguros e fáceis de usar.',
    badge: <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />,
    heading: (
      <>
        Sites e sistemas <G>feitos sob medida</G>
      </>
    ),
    text: (
      <>
        Criamos <G strong>soluções em programação</G> para organizar processos e facilitar o dia a dia do seu negócio.
      </>
    ),
    avatarSrc: '/avatar/avatar-dev.png',
    avatarAlt: 'Dev Avatar'
  }
]

const SWIPE_THRESHOLD = 50

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [nudge, setNudge] = useState(false)

  const rowRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const programmaticScroll = useRef(false)
  const programmaticTimer = useRef<ReturnType<typeof setTimeout>>()
  const scrollFrame = useRef<number>()
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const total = services.length
  const isLast = activeService === total - 1

  const isCarousel = () => {
    const row = rowRef.current
    return !!row && row.scrollWidth > row.clientWidth + 1
  }

  /** Centraliza (no mobile) o card correspondente sem mexer no scroll vertical da página */
  const scrollCardIntoView = useCallback((index: number) => {
    const row = rowRef.current
    const card = cardRefs.current[index]
    if (!row || !card || !(row.scrollWidth > row.clientWidth + 1)) return

    const paddingLeft = parseFloat(getComputedStyle(row).paddingLeft) || 0
    programmaticScroll.current = true
    clearTimeout(programmaticTimer.current)
    programmaticTimer.current = setTimeout(() => (programmaticScroll.current = false), 600)
    row.scrollTo({ left: card.offsetLeft - paddingLeft, behavior: 'smooth' })
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(total - 1, index))
      setActiveService(next)
      setHasInteracted(true)
      setNudge(false)
      scrollCardIntoView(next)
    },
    [total, scrollCardIntoView]
  )

  /** Quando o usuário desliza os cards, o card mais próximo do início vira o ativo */
  const handleRowScroll = () => {
    if (programmaticScroll.current || !isCarousel()) return
    if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current)

    scrollFrame.current = requestAnimationFrame(() => {
      const row = rowRef.current
      if (!row) return
      setHasInteracted(true)
      setNudge(false)

      const maxScroll = row.scrollWidth - row.clientWidth
      if (row.scrollLeft >= maxScroll - 4) {
        setActiveService(total - 1)
        return
      }

      const paddingLeft = parseFloat(getComputedStyle(row).paddingLeft) || 0
      let closest = 0
      let minDistance = Infinity
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const distance = Math.abs(card.offsetLeft - paddingLeft - row.scrollLeft)
        if (distance < minDistance) {
          minDistance = distance
          closest = i
        }
      })
      setActiveService(closest)
    })
  }

  /** Swipe no painel visual (mobile) */
  const handleTouchStart = (e: TouchEvent) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStart.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStart.current.x
    const dy = t.clientY - touchStart.current.y
    touchStart.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
    goTo(dx < 0 ? activeService + 1 : activeService - 1)
  }

  /** Navegação por teclado entre as abas */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      goTo(activeService + 1)
      cardRefs.current[Math.min(total - 1, activeService + 1)]?.focus()
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      goTo(activeService - 1)
      cardRefs.current[Math.max(0, activeService - 1)]?.focus()
    }
  }

  /** Pequena "espiada" animada no carrossel quando ele aparece na tela pela primeira vez */
  useEffect(() => {
    const row = rowRef.current
    if (!row || hasInteracted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isCarousel()) {
          setNudge(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(row)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    () => () => {
      clearTimeout(programmaticTimer.current)
      if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current)
    },
    []
  )

  return (
    <section className="w-full min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-14 items-start">
          {/* ===== Cards (carrossel no mobile, lista no desktop) ===== */}
          <div className="relative min-w-0">
            {/* Cabeçalho do carrossel — só no mobile */}
            <div className="flex items-center justify-between mb-3 lg:hidden">
              <span className="text-xs font-medium tracking-wider text-gray-400">
                <span className="text-white">{String(activeService + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
              </span>
              <span
                className={`flex items-center gap-1 text-xs text-purple-300 transition-opacity duration-500 ${
                  hasInteracted ? 'opacity-0' : 'opacity-100'
                }`}
                aria-hidden={hasInteracted}>
                Deslize para ver mais
                <ChevronsRight className="w-4 h-4 animate-hint-x" />
              </span>
            </div>

            <div
              ref={rowRef}
              onScroll={handleRowScroll}
              onKeyDown={handleKeyDown}
              role="tablist"
              aria-label="Serviços"
              aria-orientation="horizontal"
              className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 scrollbar-hidden
                lg:mx-0 lg:px-0 lg:overflow-visible lg:snap-none">
              <div
                onAnimationEnd={() => setNudge(false)}
                className={`flex gap-3 w-max lg:w-full lg:flex-col lg:gap-2 ${nudge ? 'animate-swipe-nudge' : ''}`}>
                {services.map((service, i) => {
                  const active = activeService === service.id
                  return (
                    <button
                      key={service.id}
                      ref={(el) => {
                        cardRefs.current[i] = el
                      }}
                      id={`service-tab-${service.id}`}
                      role="tab"
                      aria-selected={active}
                      aria-controls={`service-panel-${service.id}`}
                      tabIndex={active ? 0 : -1}
                      onClick={() => goTo(service.id)}
                      className={`relative shrink-0 snap-start w-[78vw] max-w-[340px] sm:w-[360px] sm:max-w-none lg:w-full
                        text-left p-4 rounded-xl border transition-all duration-500 outline-none
                        focus-visible:ring-2 focus-visible:ring-purple-500/60
                        lg:hover:scale-[1.02] lg:hover:translate-x-1
                        ${
                          active
                            ? 'bg-white/[0.08] border-purple-500/50 shadow-[0_0_24px_-8px_rgba(168,85,247,0.55)]'
                            : 'bg-white/[0.02] border-white/10'
                        }`}>
                      <div className="flex gap-3 items-start">
                        <div
                          className={`p-2 rounded-md transition-colors duration-500 ${
                            active ? 'text-purple-300 bg-purple-500/15' : 'text-purple-400'
                          }`}>
                          {service.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white">{service.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-400">{service.description}</p>
                        </div>
                      </div>

                      {/* Barra de ativo (mobile) */}
                      <span
                        className={`lg:hidden absolute left-4 right-4 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-purple-500 to-cyan-500
                          origin-left transition-transform duration-500 ${active ? 'scale-x-100' : 'scale-x-0'}`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Fade na borda direita indicando que há mais conteúdo — só no mobile */}
            <div
              className={`pointer-events-none absolute right-[-16px] sm:right-[-24px] bottom-0 h-[calc(100%-2rem)] w-12
                bg-gradient-to-l from-[#030014] to-transparent lg:hidden transition-opacity duration-300 ${
                  isLast ? 'opacity-0' : 'opacity-100'
                }`}
            />
          </div>

          {/* ===== Painel visual ===== */}
          <div className="min-w-0">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative h-[380px] sm:h-[440px] lg:h-[620px] rounded-3xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-white/5 overflow-hidden touch-pan-y">
              {services.map((service, i) => {
                const active = activeService === service.id
                const position = active
                  ? 'opacity-100 translate-x-0'
                  : i < activeService
                    ? 'opacity-0 -translate-x-10 lg:translate-x-0'
                    : 'opacity-0 translate-x-10 lg:translate-x-0'

                return (
                  <div
                    key={service.id}
                    id={`service-panel-${service.id}`}
                    role="tabpanel"
                    aria-labelledby={`service-tab-${service.id}`}
                    aria-hidden={!active}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${position} ${active ? '' : 'pointer-events-none'}`}>
                    {/* Ícone de identificação — canto superior direito, dentro do card */}
                    <div className="absolute top-5 right-5 sm:top-8 sm:right-8 lg:top-10 lg:right-10 z-20">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                        {service.badge}
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="relative z-10 h-full flex items-center justify-center px-6 pb-20 sm:px-10 lg:px-16 lg:pb-0">
                      <div className="max-w-md w-full text-center sm:text-left">
                        <h3 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-3 leading-tight">{service.heading}</h3>
                        <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">{service.text}</p>
                      </div>
                    </div>

                    {/* Avatar */}
                    <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-10">
                      <Image
                        src={service.avatarSrc}
                        alt={service.avatarAlt}
                        width={128}
                        height={128}
                        className="w-24 sm:w-28 lg:w-32 h-auto"
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Controles do carrossel — só no mobile */}
            <div className="mt-4 flex items-center justify-between lg:hidden">
              <button
                type="button"
                onClick={() => goTo(activeService - 1)}
                disabled={activeService === 0}
                aria-label="Serviço anterior"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-white flex items-center justify-center
                  transition-opacity active:scale-95 disabled:opacity-30">
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => goTo(service.id)}
                    aria-label={`Ir para ${service.title}`}
                    className="p-1">
                    <span
                      className={`block h-2 rounded-full transition-all duration-500 ${
                        activeService === service.id ? 'w-6 bg-gradient-to-r from-purple-500 to-cyan-500' : 'w-2 bg-white/25'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(activeService + 1)}
                disabled={isLast}
                aria-label="Próximo serviço"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-white flex items-center justify-center
                  transition-opacity active:scale-95 disabled:opacity-30">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
