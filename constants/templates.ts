/**
 * Vitrine de templates.
 * Para adicionar um novo template, basta incluir um objeto aqui e colocar
 * as capas em /public/ViewTemplates.
 *  - desktopImage: print 16:9 (ex.: 1920x1080)
 *  - mobileImage:  print de celular (~ 450x975, proporção de iPhone)
 */
export interface Template {
  id: string
  name: string
  category: string
  description: string
  desktopImage: string
  mobileImage: string
  url: string
  tech: readonly string[]
  /** Cor de destaque do template (glow atrás dos mockups) */
  accent: string
  /** Cor de fundo do topo do site (barra de status do celular) */
  screenColor: string
}

export const TEMPLATES: readonly Template[] = [
  {
    id: 'dentist',
    name: 'Clínica & Consultório',
    category: 'Saúde e Estética',
    description:
      'Site institucional elegante para médicos, dentistas e clínicas de estética. Apresentação do profissional, tratamentos, jornada do paciente e agendamento de consultas.',
    desktopImage: '/ViewTemplates/pageDentist_1desktop.png',
    mobileImage: '/ViewTemplates/pageDentist_1mobile.png',
    url: 'https://drshaniaesha.vercel.app/',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Responsivo'],
    accent: '#3b82f6',
    screenColor: '#06142f'
  }
] as const
