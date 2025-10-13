'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal, Cloud, Code2, Rocket, GitBranch, Users } from 'lucide-react';

const SkillsSticky = () => {
    const [activeCard, setActiveCard] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const skills = [
        {
            title: 'Infraestrutura Linux',
            description: 'Domínio completo em sistemas Linux para servidores robustos e seguros. Configuração otimizada, automação de processos e máxima performance para suas aplicações.',
            icon: <Terminal className="w-12 h-12" />,
            gradient: 'from-purple-500 to-cyan-500',
            content: (
                <div className="w-full h-full bg-slate-900 p-6 flex flex-col justify-center">
                    <div className="space-y-2 font-mono text-sm">
                        <div className="text-green-400">$ systemctl status webapp</div>
                        <div className="text-gray-400">● webapp.service - Production App</div>
                        <div className="text-gray-400 pl-4">Active: <span className="text-green-400">active (running)</span></div>
                        <div className="text-cyan-400 mt-4">$ docker ps</div>
                        <div className="text-gray-400">CONTAINER ID   STATUS</div>
                        <div className="text-gray-400">a1b2c3d4e5f6   <span className="text-green-400">Up 45 days</span></div>
                    </div>
                </div>
            )
        },
        {
            title: 'Soluções em Nuvem & Docker',
            description: 'Containerização profissional com Docker, orquestração de microsserviços e deployment em cloud (AWS, Azure). Escalabilidade e disponibilidade garantidas.',
            icon: <Cloud className="w-12 h-12" />,
            gradient: 'from-cyan-500 to-blue-500',
            content: (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 p-6 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="text-6xl">🐳</div>
                        <div className="text-white font-bold text-xl">Docker</div>
                        <div className="flex gap-4 justify-center text-4xl">
                            <span>☁️</span>
                            <span>📦</span>
                            <span>🚀</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Python & Flask',
            description: 'Desenvolvimento backend poderoso com Python e Flask. APIs RESTful robustas, integração com bancos de dados e processamento eficiente de dados em larga escala.',
            icon: <Code2 className="w-12 h-12" />,
            gradient: 'from-blue-500 to-purple-600',
            content: (
                <div className="w-full h-full bg-slate-900 p-6 flex flex-col justify-center">
                    <div className="space-y-2 font-mono text-sm">
                        <div className="text-purple-400">from flask import Flask, jsonify</div>
                        <div className="text-cyan-400 mt-2">app = Flask(__name__)</div>
                        <div className="text-yellow-400 mt-3">{`@app.route('/api/data')`}</div>
                        <div className="text-green-400">def get_data():</div>
                        <div className="text-gray-300 pl-4">return jsonify(success=True)</div>
                        <div className="text-cyan-400 mt-3">app.run(debug=False)</div>
                    </div>
                </div>
            )
        },
        {
            title: 'React & Next.js',
            description: 'Interfaces modernas e performáticas com React e Next.js. SSR, SSG, otimização automática e experiências web de alta qualidade que convertem.',
            icon: <Rocket className="w-12 h-12" />,
            gradient: 'from-purple-600 to-pink-500',
            content: (
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
                    <div className="space-y-4 text-center">
                        <div className="text-5xl">⚛️</div>
                        <div className="text-white font-bold text-xl">React + Next.js</div>
                        <div className="text-gray-400 text-sm">Server Side Rendering</div>
                        <div className="flex gap-3 justify-center">
                            <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-cyan-400 text-xs">Fast</div>
                            <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-purple-400 text-xs">SEO</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Vite, Tailwind & Bootstrap',
            description: 'Performance extrema com Vite, design systems elegantes com Tailwind CSS e Bootstrap. Páginas 100% responsivas, otimizadas e com carregamento ultrarrápido.',
            icon: <Rocket className="w-12 h-12" />,
            gradient: 'from-pink-500 to-orange-500',
            content: (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-cyan-500 p-6 flex flex-col justify-center items-center">
                    <div className="text-white text-center space-y-4">
                        <div className="text-5xl">⚡</div>
                        <div className="font-bold text-2xl">Lightning Fast</div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-sm">Vite</div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-sm">Tailwind</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: 'Git & Metodologias Ágeis',
            description: 'Versionamento profissional com Git, workflows organizados e metodologias ágeis (Scrum, Kanban). Entregas rápidas, código limpo e trabalho colaborativo eficiente.',
            icon: <GitBranch className="w-12 h-12" />,
            gradient: 'from-orange-500 to-red-500',
            content: (
                <div className="w-full h-full bg-slate-900 p-6 flex flex-col justify-center">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="text-green-400 font-mono text-sm">main</div>
                        </div>
                        <div className="flex items-center gap-2 pl-4">
                            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                            <div className="text-cyan-400 font-mono text-sm">develop</div>
                        </div>
                        <div className="flex items-center gap-2 pl-8">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                            <div className="text-purple-400 font-mono text-sm">feature/new-ui</div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-2">
                            <div className="bg-blue-500/20 border border-blue-500/50 rounded px-2 py-1 text-blue-400 text-xs text-center">Scrum</div>
                            <div className="bg-purple-500/20 border border-purple-500/50 rounded px-2 py-1 text-purple-400 text-xs text-center">Kanban</div>
                        </div>
                    </div>
                </div>
            )

        }, {
            title: 'Figma & Design Systems',
            description: 'Prototipagem e design profissional com Figma. Criação de interfaces modernas, consistentes e colaborativas. Aplicação de Design Systems e componentes reutilizáveis para escala.',
            icon: <Users className="w-12 h-12" />,
            gradient: 'from-pink-500 to-violet-500',
            content: (
                <div className="w-full h-full bg-slate-900 p-6 flex flex-col justify-center items-center">
                    <div className="text-center space-y-4">
                        <div className="flex justify-center items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-violet-500 rounded-xl flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">F</span>
                            </div>
                            <div className="text-white font-bold text-xl">Figma</div>
                        </div>

                        <div className="text-gray-400 text-sm font-mono">
                            <div>🎨 Design System Atômico</div>
                            <div>🧩 Componentes Reutilizáveis</div>
                            <div>🤝 Colaboração em Tempo Real</div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-2">
                            <div className="bg-pink-500/20 border border-pink-500/50 rounded px-2 py-1 text-pink-400 text-xs text-center">
                                Prototipagem
                            </div>
                            <div className="bg-violet-500/20 border border-violet-500/50 rounded px-2 py-1 text-violet-400 text-xs text-center">
                                UI/UX
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


    ];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight - container.clientHeight;
            const scrollProgress = scrollTop / scrollHeight;

            const cardIndex = Math.min(
                Math.floor(scrollProgress * skills.length),
                skills.length - 1
            );

            setActiveCard(Math.max(0, cardIndex));
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [skills.length]);

    return (
        <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 sm:mb-6 Welcome-box">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-sm font-semibold tracking-wider">
                            HABILIDADES
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight px-4">
                        Tecnologias que <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">dominamos</span>
                    </h2>
                </div>

                {/* Sticky Scroll Container */}
                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-950/40 backdrop-blur-sm">
                    {/* Dot Pattern Overlay */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}>
                    </div>

                    {/* Top Gradient Fade */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none" />

                    {/* Bottom Gradient Fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={containerRef}
                        className="h-[500px] lg:h-[600px] flex justify-center lg:space-x-10 p-4 sm:p-6 lg:p-8 overflow-y-auto scrollbar-hidden relative"
                    >
                        {/* Left Side - Scrollable Content */}
                        <div className="flex items-start px-2 sm:px-4 w-full lg:w-auto">
                            <div className="max-w-2xl w-full">
                                {skills.map((skill, index) => (
                                    <div key={skill.title + index} className="my-8 sm:my-12 transition-all duration-500">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${skill.gradient} bg-opacity-20 transition-all duration-500 ${activeCard === index ? 'scale-110 opacity-100' : 'opacity-50 scale-90'
                                                }`}>
                                                <div className={`transition-all duration-500 ${activeCard === index ? 'text-white' : 'text-gray-500'
                                                    }`}>
                                                    {skill.icon}
                                                </div>
                                            </div>
                                            <h2 className={`text-xl sm:text-2xl font-bold transition-all duration-500 ${activeCard === index ? 'text-white' : 'text-gray-600'
                                                }`}>
                                                {skill.title}
                                            </h2>
                                        </div>
                                        <p className={`text-base sm:text-lg max-w-xl transition-all duration-500 ${activeCard === index ? 'text-gray-300' : 'text-gray-600'
                                            }`}>
                                            {skill.description}
                                        </p>
                                    </div>
                                ))}
                                <div className="h-40" />
                            </div>
                        </div>

                        {/* Right Side - Sticky Visual */}
                        {/* Right Side - Fixed Visual */}
                        <div className="hidden lg:block">
                            <div className="fixed right-16 top-1/2 -translate-y-1/2 z-20">
                                <div className="w-80 h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 relative">
                                    {skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-all duration-700 ${activeCard === index
                                                ? 'opacity-100 translate-y-0 scale-100'
                                                : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                                                }`}
                                            style={{
                                                background:
                                                    activeCard === index
                                                        ? `linear-gradient(to bottom right, ${index === 0
                                                            ? '#ef008f, #6ec3f4'
                                                            : index === 1
                                                                ? '#6ec3f4, #7038ff'
                                                                : index === 2
                                                                    ? '#7038ff, #8b5cf6'
                                                                    : index === 3
                                                                        ? '#8b5cf6, #ec4899'
                                                                        : index === 4
                                                                            ? '#ec4899, #f97316'
                                                                            : '#f97316, #ef4444'
                                                        })`
                                                        : 'transparent',
                                            }}
                                        >
                                            {skill.content}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSticky;