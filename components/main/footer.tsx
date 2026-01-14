import Link from 'next/link'
import { FOOTER_DATA } from '@/constants'

export const Footer = () => {
  return (
    <footer className="relative w-full bg-transparent text-gray-300 px-6 pt-16 pb-8">
      {/* Conteúdo */}
      <div className="max-w-6xl mx-auto">
        {/* Grid */}
        <div
          className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-10
    mb-12
    lg:justify-items-center
  ">
          {FOOTER_DATA.map((column) => (
            <div key={column.title} className="space-y-4">
              {/* Título */}
              <h3 className="text-white font-semibold text-base">{column.title}</h3>

              {/* Links */}
              <ul className="space-y-3">
                {column.data.map(({ icon: Icon, name, link }) => (
                  <li key={`${column.title}-${name}`}>
                    <Link
                      href={link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="
                        group
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-gray-400
                        hover:text-white
                        transition-colors
                      ">
                      {Icon && <Icon className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />}
                      <span>{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Linha divisória */}
        <div className="w-full h-px bg-white/10 mb-6" />

        {/* Copyright */}
        <div className="text-center text-xs sm:text-sm text-gray-400">
          © Leap In Technology {new Date().getFullYear()} Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
