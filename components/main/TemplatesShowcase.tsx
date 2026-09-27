'use client'

import { useState } from 'react'
import { ExternalLink, MousePointerClick, Smartphone, Monitor, Sparkles, ArrowRight, Hand, Code2 } from 'lucide-react'
import ParallaxCards from '@/components/sub/parallax-cards'
import DeviceMockup from '@/components/sub/device-mockup'
import { TEMPLATES, type Template } from '@/constants/templates'

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

        {/* Seletor (quando houver mais de um template) */}
        {multiple && (
          <div className="flex gap-2 pt-2">
            {TEMPLATES.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ver template ${t.name}`}
                aria-pressed={active === i}
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${active === i ? 'border-purple-500/50 bg-white/[0.08] text-white' : 'border-white/10 text-gray-400 hover:text-white'
                  }`}>
                {t.name}
              </button>
            ))}
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

            {/* Tecnologia principal */}
            <span className="absolute left-[-28px] bottom-[22%] flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-[#0b0b1a]/90 backdrop-blur text-xs text-gray-300 shadow-xl">
              <span className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white">
                <Code2 className="w-4 h-4" />
              </span>
              <span>
                <span className="block text-white font-medium">{template.tech[0]}</span>
                <span className="text-[10px] text-gray-500">stack principal</span>
              </span>
            </span>

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
const MobileTemplate = ({ template, index }: { template: Template; index: number }) => (
  <article className="flex flex-col items-center text-center">
    <div className="mb-4 space-y-2">
      <CategoryPill>{template.category}</CategoryPill>
      <h3 className="text-2xl font-bold text-white">{template.name}</h3>
    </div>

    {/* Aparelho clicável */}
    <a
      href={template.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir o template ${template.name} no seu celular (nova aba)`}
      className="relative block py-6 outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 rounded-[3rem]">
      <DeviceMockup
        image={template.mobileImage}
        alt={`Template ${template.name} no celular`}
        scale={0.9}
        autoAnimate
        parallaxStrength={8}
        rotateStrength={4}
        screenColor={template.screenColor}
        glowColor={template.accent}
        priority={index === 0}
      />

      {/* Selo "toque para testar" */}
      <span className="absolute left-1/2 -translate-x-1/2 bottom-1 z-10 flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold text-white
        bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_10px_30px_-6px_rgba(139,92,246,0.9)]">
        <span className="absolute inset-0 rounded-full bg-purple-500/40 animate-ping" aria-hidden />
        <Hand className="relative w-4 h-4" />
        <span className="relative">Toque para testar</span>
      </span>
    </a>

    <p className="mt-6 text-sm text-gray-400 leading-relaxed max-w-sm">{template.description}</p>

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
  </article>
)

/* ------------------------------------------------------------------ */
export default function TemplatesShowcase() {
  return (
    <section id="templates" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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

        <div className="lg:hidden space-y-16">
          {TEMPLATES.map((t, i) => (
            <MobileTemplate key={t.id} template={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
