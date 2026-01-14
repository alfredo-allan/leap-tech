import { Rocket, Users, Layers, CheckCircle } from 'lucide-react'

export default function InstitutionalLeapSection() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Título principal */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Um <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">salto na tecnologia</span> feito
            por pessoas reais
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg">
            A <span className="text-white font-semibold">Leap in Technology</span> nasceu da união entre visão, estratégia e código.
            Transformamos ideias em soluções que funcionam no mundo real.
          </p>
        </div>

        {/* Bloco institucional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Origem */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>

            <h3 className="text-white font-semibold text-lg">Nossa origem</h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              A Leap surgiu da parceria entre um{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-medium">designer</span>, um{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-medium">vendedor</span> e um{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-medium">programador</span>.
              Cada solução nasce do equilíbrio entre estética, negócio e tecnologia.
            </p>
          </div>

          {/* Soluções */}
          <div
            className="
    relative
    rounded-2xl
    bg-white/[0.04]
    border border-white/10
    backdrop-blur-md
    p-6 sm:p-7 lg:p-8
    space-y-6
  ">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div
                className="
        w-12 h-12
        rounded-xl
        bg-gradient-to-br from-purple-500/20 to-cyan-500/20
        flex items-center justify-center
        flex-shrink-0
      ">
                <Layers className="w-6 h-6 text-purple-400" />
              </div>

              <h3 className="text-white font-semibold text-lg sm:text-xl leading-tight">
                Soluções que entregam{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">resultado</span>
              </h3>
            </div>

            {/* Lista */}
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Sistemas de <span className="text-white font-medium">ponto de vendas</span> e{' '}
                  <span className="text-white font-medium">controle de estoque</span>
                </p>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Aplicativos para <span className="text-white font-medium">gerenciamento de barbearias</span>
                </p>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Sistemas de <span className="text-white font-medium">gestão de estacionamentos</span>
                </p>
              </li>
            </ul>
          </div>

          {/* Criativo + gráfico */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-purple-400" />
            </div>

            <h3 className="text-white font-semibold text-lg">Além do digital</h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              Também atuamos com <span className="text-white">diagramação de livros</span>,{' '}
              <span className="text-white">vetorização de imagens</span> e produção de materiais gráficos como{' '}
              <span className="text-white">flyers, caixas e identidade visual</span>, conectando o físico ao digital.
            </p>
          </div>
        </div>

        {/* Frase de impacto */}
        <div className="text-center pt-6">
          <p className="text-gray-300 text-sm sm:text-base">
            Não entregamos apenas sistemas ou designs.
            <br />
            Entregamos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-semibold">
              soluções que acompanham o crescimento do seu negócio
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
