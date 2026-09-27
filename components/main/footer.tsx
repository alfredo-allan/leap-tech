import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FOOTER_DATA } from '@/constants'

export const Footer = () => {
  return (
    <footer className="relative w-full bg-transparent text-gray-300 px-4 sm:px-6 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 mb-12 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          {/* Título */}
          <div className="space-y-1">
            <h3 className="text-white font-semibold text-lg">Conecte-se comigo</h3>
            <p className="text-sm text-gray-400">Acompanhe meus projetos e trajetória profissional.</p>
          </div>

          {/* Redes */}
          <ul className="flex flex-col gap-3 w-full sm:w-auto sm:flex-row">
            {FOOTER_DATA.map(({ icon: Icon, name, handle, link }) => (
              <li key={name}>
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${name} de ${handle} (abre em nova aba)`}
                  className="
                    group flex items-center gap-3 w-full sm:w-auto
                    px-4 py-3 rounded-xl
                    border border-white/10 bg-white/[0.03]
                    hover:border-purple-500/40 hover:bg-white/[0.06]
                    transition-colors
                  ">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                    <Icon className="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors" />
                  </span>
                  <span className="flex flex-col text-left">
                    <span className="text-sm font-medium text-white">{name}</span>
                    <span className="text-xs text-gray-400">{handle}</span>
                  </span>
                  <ArrowUpRight className="ml-auto sm:ml-4 w-4 h-4 text-gray-500 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Linha divisória */}
        <div className="w-full h-px bg-white/10 mb-6" />

        {/* Copyright */}
        <div className="text-center text-xs sm:text-sm text-gray-400">
          © Leap In Technology {new Date().getFullYear()}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
