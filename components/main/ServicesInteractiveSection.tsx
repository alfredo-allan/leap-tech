'use client'

import { useState } from 'react'
import { Palette, Target, Figma, Code2, Flag, Paintbrush } from 'lucide-react'
import Image from 'next/image'

interface Service {
  id: number
  icon: JSX.Element
  title: string
  description: string
  avatarSrc: string
  visual: JSX.Element
}

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0)

  const services: Service[] = [
    {
      id: 0,
      icon: <Palette className="w-5 h-5" />,
      title: 'Branding',
      description: 'Construir identidades visuais lindas que ressoem com a essência da sua marca.',
      avatarSrc: '/avatar/avatar-branding.png',
      visual: (
        <div className="relative w-full h-full flex items-center justify-center px-4" id="about-me">
          <div className="relative z-10 max-w-md w-full text-center sm:text-left top-[-40px]">
            <div className="mb-4 flex justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                <Flag className="w-6 h-6 text-purple-400" />
              </div>
            </div>

            <h3 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-3 leading-tight">
              Do <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">logo</span> à{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">marca</span> que as pessoas
              reconhecem
            </h3>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
              Criamos ou melhoramos o visual do seu negócio para transmitir{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold">confiança</span> e
              profissionalismo.
            </p>
          </div>

          <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-12">
            <Image src="/avatar/avatar-branding.png" alt="Branding Avatar" width={128} height={128} className="w-24 sm:w-32 h-auto" />
          </div>
        </div>
      )
    },

    {
      id: 1,
      icon: <Target className="w-5 h-5" />,
      title: 'Social Media',
      description: 'Ampliar e fortalecer sua marca, criando estratégias que engajam e convertem.',
      avatarSrc: '/avatar/avatar-social.png',
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-cyan-400" />
              </div>
            </div>

            <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-2">
              Sua empresa mais ativa nas{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">redes sociais</span>
            </h3>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
              Conteúdos organizados para atrair clientes e fortalecer sua presença online.
            </p>
          </div>

          <div className="absolute bottom-2 sm:bottom-4 right-4 sm:right-8">
            <Image src="/avatar/avatar-social.png" alt="Social Avatar" width={112} height={112} className="w-20 sm:w-28 h-auto" />
          </div>
        </div>
      )
    },

    {
      id: 2,
      icon: <Figma className="w-5 h-5" />,
      title: 'Design UI UX',
      description: 'Sites com uma experiência de usuário intuitiva e com alto desempenho.',
      avatarSrc: '/avatar/avatar-design.png',
      visual: (
       <div className="relative w-full h-full flex items-center justify-center px-4">
  <div className="relative z-10 max-w-md w-full text-center sm:text-left top-[-40px] space-y-3">
    {/* Ícone de design / paint */}
    <div className="flex justify-center sm:justify-start">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
        <Paintbrush className="w-5 h-5 text-cyan-400" />
      </div>
    </div>

    <h3 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">
      Um visual que{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
        chama atenção
      </span>{' '}
      e vende mais
    </h3>

    <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
      Design simples, bonito e pensado para converter visitantes em clientes.
    </p>
  </div>

  <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-12">
    <Image
      src="/avatar/avatar-design.png"
      alt="Design Avatar"
      width={128}
      height={128}
      className="w-24 sm:w-32 h-auto"
    />
  </div>
</div>
      )
    },

    {
      id: 3,
      icon: <Code2 className="w-5 h-5" />,
      title: 'Desenvolvimento',
      description: 'Sites, aplicações e sistemas rápidos, seguros e fáceis de usar.',
      avatarSrc: '/avatar/avatar-dev.png',
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-md text-center space-y-4">
            {/* Ícone de código no topo à esquerda */}
            <div className="flex justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>

            <h3 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl leading-tight">
              Sites e sistemas{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">feitos sob medida</span>
            </h3>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
              Criamos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold">
                soluções em programação
              </span>{' '}
              para organizar processos e facilitar o dia a dia do seu negócio.
            </p>
          </div>

          <div className="absolute bottom-2 sm:bottom-4 right-4 sm:right-8">
            <Image src="/avatar/avatar-dev.png" alt="Dev Avatar" width={112} height={112} className="w-20 sm:w-28 h-auto" />
          </div>
        </div>
      )
    }
  ]

  return (
    <section className="w-full min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-start">
          {/* Cards */}
          <div className="space-y-2">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-500
                lg:hover:scale-[1.02] lg:hover:translate-x-1
                ${
                  activeService === service.id ? 'bg-white/[0.08] border border-purple-500/40' : 'bg-white/[0.02] border border-white/10'
                }`}>
                <div className="flex gap-3 items-start">
                  <div className="p-2 rounded-md text-purple-400">{service.icon}</div>
                  <div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{service.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Visual */}
          <div className="relative h-[420px] lg:h-[620px] rounded-3xl bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-white/5 overflow-hidden">
            {services.map((service) => (
              <div
                key={service.id}
                className={`absolute inset-0 transition-all duration-500 ${activeService === service.id ? 'opacity-100' : 'opacity-0'}`}>
                {service.visual}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
