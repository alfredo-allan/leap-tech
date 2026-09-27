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
  /** Tecnologia principal (selo no card do desktop). Omita se não for conhecida. */
  stack?: string
  /** Cor de destaque do template (glow atrás dos mockups) */
  accent: string
  /** Cor de fundo do topo do site (barra de status do celular) */
  screenColor: string
  /** Topo do site claro ou escuro — define a cor dos ícones da barra de status */
  screenTheme: 'dark' | 'light'
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
    stack: 'Next.js',
    accent: '#3b82f6',
    screenColor: '#06142f',
    screenTheme: 'dark'
  },
  {
    id: 'lumina-dental',
    name: 'Clínica Odontológica Premium',
    category: 'Odontologia',
    description:
      'Site sofisticado para clínicas odontológicas: tratamentos, especialistas, agendamento online, tema claro e escuro e suporte a dois idiomas. Visual de alto padrão com animações suaves.',
    desktopImage: '/ViewTemplates/pageDentist_2desktop.png',
    mobileImage: '/ViewTemplates/pageDentist_2mobile.png',
    url: 'https://lux-dental-website.vercel.app/',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    stack: 'Next.js',
    accent: '#22d3ee',
    screenColor: '#071818',
    screenTheme: 'dark'
  },
  {
    id: 'laxido-pharma',
    name: 'Portal de Saúde & Farmácia',
    category: 'Saúde e Farmácia',
    description:
      'Portal completo para farmácias, laboratórios e redes de saúde: teleconsulta, busca de médicos, entrega de medicamentos, exames com coleta em casa, depoimentos e blog.',
    desktopImage: '/ViewTemplates/pageMedical_1desktop.png',
    mobileImage: '/ViewTemplates/pageMedical_1mobile.png',
    url: 'https://mohitraj8503.github.io/Laxido-Pharma',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsivo'],
    stack: 'HTML + JS',
    accent: '#6366f1',
    screenColor: '#ffffff',
    screenTheme: 'light'
  },
  {
    id: 'medicare-hospital',
    name: 'Hospital & Centro Médico',
    category: 'Hospitais e Clínicas',
    description:
      'Site completo para hospitais e centros médicos: especialidades, corpo clínico, pacotes de check-up, depoimentos, perguntas frequentes e agendamento de consultas online.',
    desktopImage: '/ViewTemplates/pageMedicalDesktop_3.png',
    mobileImage: '/ViewTemplates/pageMedicalMobile_3.png',
    url: 'https://medicare-hospital1.vercel.app/',
    tech: ['Next.js', 'React', 'Agendamento online', 'Responsivo'],
    stack: 'Next.js',
    accent: '#0ea5e9',
    screenColor: '#f6fafd',
    screenTheme: 'light'
  },
  {
    id: 'laguntza-fisio',
    name: 'Fisioterapia & Reabilitação',
    category: 'Fisioterapia',
    description:
      'Site para clínicas de fisioterapia com vídeo de destaque, apresentação dos serviços e do profissional, dois idiomas e agendamento direto pelo WhatsApp.',
    desktopImage: '/ViewTemplates/pagePhysiotherapistDesktop.png',
    mobileImage: '/ViewTemplates/pagePhysiotherapistMobile.png',
    url: 'https://laguntzafisioterapia.com/es/',
    tech: ['Astro', 'Multi-idioma', 'WhatsApp', 'Responsivo'],
    stack: 'Astro',
    accent: '#4a90a4',
    screenColor: '#f2f2f2',
    screenTheme: 'light'
  },
  {
    id: 'scathon-streetwear',
    name: 'Loja de Moda Streetwear',
    category: 'E-commerce',
    description:
      'Loja virtual com identidade de marca forte: banner de coleção, vitrine de mais vendidos, avaliações de produtos, favoritos, carrinho e tema claro e escuro.',
    desktopImage: '/ViewTemplates/E-commerceScathonDesktop.png',
    mobileImage: '/ViewTemplates/E-commerceScathonMobile.png',
    url: 'https://www.scathon.com.br/',
    tech: ['Next.js', 'Loja virtual', 'Tema escuro', 'Responsivo'],
    stack: 'Next.js',
    accent: '#94a3b8',
    screenColor: '#111111',
    screenTheme: 'dark'
  },
  {
    id: 'cereja-fitness',
    name: 'Loja de Moda Fitness',
    category: 'E-commerce',
    description:
      'Loja virtual para marcas de moda com catálogo por categorias, área do cliente, carrinho de compras e tema claro e escuro, pensada para vender pelo celular.',
    desktopImage: '/ViewTemplates/E-commerceCerejaDesktop.png',
    mobileImage: '/ViewTemplates/E-commerceCerejaMobile.png',
    url: 'https://www.cerejadocemoda.com/',
    tech: ['Loja virtual', 'Catálogo', 'Área do cliente', 'Responsivo'],
    accent: '#ec4899',
    screenColor: '#ffffff',
    screenTheme: 'light'
  }
] as const
