'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
    Terminal,
    Cloud,
    Code2,
    Rocket,
    Zap,
    GitBranch,
    Figma,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
    type LucideIcon
} from 'lucide-react';

interface Skill {
    title: string;
    description: string;
    Icon: LucideIcon;
    gradient: string;
    content: JSX.Element;
}

const skills: Skill[] = [
    {
        title: 'Infraestrutura Linux',
        description: 'Domínio completo em sistemas Linux para servidores robustos e seguros. Configuração otimizada, automação de processos e máxima performance para suas aplicações.',
        Icon: Terminal,
        gradient: 'from-purple-500 to-cyan-500',
        content: (
            <div className="w-full h-full bg-slate-900 p-6 flex flex-col justify-center">
                <div className="space-y-2 font-mono text-xs sm:text-sm">
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
        Icon: Cloud,
        gradient: 'from-cyan-500 to-blue-500',
        content: (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 p-6 flex items-center justify-center">
                <div className="text-center space-y-3">
                    <div className="text-5xl">🐳</div>
                    <div className="text-white font-bold text-xl">Docker</div>
                    <div className="flex gap-4 justify-center text-3xl">
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
        Icon: Code2,
        gradient: 'from-blue-500 to-purple-600',
        content: (
            <div className="w-full h-full bg-slate-900 p-6 flex flex-col justify-center">
                <div className="space-y-1.5 font-mono text-xs sm:text-sm">
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
        Icon: Rocket,
        gradient: 'from-purple-600 to-pink-500',
        content: (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
                <div className="space-y-3 text-center">
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
        Icon: Zap,
        gradient: 'from-pink-500 to-orange-500',
        content: (
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-cyan-500 p-6 flex flex-col justify-center items-center">
                <div className="text-white text-center space-y-3">
                    <div className="text-5xl">⚡</div>
                    <div className="font-bold text-2xl">Lightning Fast</div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
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
        Icon: GitBranch,
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
                    <div className="mt-5 grid grid-cols-2 gap-2">
                        <div className="bg-blue-500/20 border border-blue-500/50 rounded px-2 py-1 text-blue-400 text-xs text-center">Scrum</div>
                        <div className="bg-purple-500/20 border border-purple-500/50 rounded px-2 py-1 text-purple-400 text-xs text-center">Kanban</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: 'Figma & Design Systems',
        description: 'Prototipagem e design profissional com Figma. Criação de interfaces modernas, consistentes e colaborativas. Aplicação de Design Systems e componentes reutilizáveis para escala.',
        Icon: Figma,
        gradient: 'from-pink-500 to-violet-500',
        content: (
            <div className="w-full h-full bg-slate-900 p-6 flex flex-col justify-center items-center">
                <div className="text-center space-y-3">
                    <div className="flex justify-center items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-violet-500 rounded-xl flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">F</span>
                        </div>
                        <div className="text-white font-bold text-xl">Figma</div>
                    </div>

                    <div className="text-gray-400 text-xs sm:text-sm font-mono">
                        <div>🎨 Design System Atômico</div>
                        <div>🧩 Componentes Reutilizáveis</div>
                        <div>🤝 Colaboração em Tempo Real</div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
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

const pad = (n: number) => String(n).padStart(2, '0');

/* =====================================================================
 * Carrossel (mobile / tablet < lg)
 * ===================================================================== */
const SkillsCarousel = () => {
    const [active, setActive] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [nudge, setNudge] = useState(false);

    const rowRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLElement | null)[]>([]);
    const programmaticScroll = useRef(false);
    const programmaticTimer = useRef<ReturnType<typeof setTimeout>>();
    const scrollFrame = useRef<number>();

    const total = skills.length;
    const isLast = active === total - 1;

    const markInteracted = () => {
        setHasInteracted(true);
        setNudge(false);
    };

    const goTo = useCallback(
        (index: number) => {
            const next = Math.max(0, Math.min(total - 1, index));
            const row = rowRef.current;
            const card = cardRefs.current[next];
            setActive(next);
            setHasInteracted(true);
            setNudge(false);
            if (!row || !card) return;

            const paddingLeft = parseFloat(getComputedStyle(row).paddingLeft) || 0;
            programmaticScroll.current = true;
            clearTimeout(programmaticTimer.current);
            programmaticTimer.current = setTimeout(() => (programmaticScroll.current = false), 600);
            row.scrollTo({ left: card.offsetLeft - paddingLeft, behavior: 'smooth' });
        },
        [total]
    );

    const handleScroll = () => {
        if (programmaticScroll.current) return;
        if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);

        scrollFrame.current = requestAnimationFrame(() => {
            const row = rowRef.current;
            if (!row) return;
            markInteracted();

            if (row.scrollLeft >= row.scrollWidth - row.clientWidth - 4) {
                setActive(total - 1);
                return;
            }

            const paddingLeft = parseFloat(getComputedStyle(row).paddingLeft) || 0;
            let closest = 0;
            let min = Infinity;
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                const d = Math.abs(card.offsetLeft - paddingLeft - row.scrollLeft);
                if (d < min) {
                    min = d;
                    closest = i;
                }
            });
            setActive(closest);
        });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            goTo(active + 1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(active - 1);
        }
    };

    /* "Espiada" animada na primeira vez que o carrossel aparece na tela */
    useEffect(() => {
        const row = rowRef.current;
        if (!row) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setNudge(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(row);
        return () => observer.disconnect();
    }, []);

    useEffect(
        () => () => {
            clearTimeout(programmaticTimer.current);
            if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
        },
        []
    );

    return (
        <div className="lg:hidden">
            {/* Cabeçalho do carrossel */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium tracking-wider text-gray-400">
                    <span className="text-white">{pad(active + 1)}</span> / {pad(total)}
                </span>
                <span
                    aria-hidden={hasInteracted}
                    className={`flex items-center gap-1 text-xs text-purple-300 transition-opacity duration-500 ${hasInteracted ? 'opacity-0' : 'opacity-100'
                        }`}>
                    Deslize para ver mais
                    <ChevronsRight className="w-4 h-4 animate-hint-x" />
                </span>
            </div>

            <div className="relative">
                <div
                    ref={rowRef}
                    onScroll={handleScroll}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="region"
                    aria-roledescription="carrossel"
                    aria-label="Tecnologias que dominamos"
                    className="-mx-4 px-4 sm:-mx-6 sm:px-6 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 scrollbar-hidden outline-none">
                    <div
                        onAnimationEnd={() => setNudge(false)}
                        className={`flex gap-3 w-max pb-1 ${nudge && !hasInteracted ? 'animate-swipe-nudge' : ''}`}>
                        {skills.map((skill, i) => {
                            const isActive = active === i;
                            const { Icon } = skill;
                            return (
                                <article
                                    key={skill.title}
                                    ref={(el) => {
                                        cardRefs.current[i] = el;
                                    }}
                                    onClick={() => !isActive && goTo(i)}
                                    aria-roledescription="slide"
                                    aria-label={`${i + 1} de ${total}: ${skill.title}`}
                                    className={`relative shrink-0 snap-start w-[80vw] max-w-[340px] sm:w-[360px] sm:max-w-none
                                        rounded-2xl overflow-hidden border bg-slate-950/60 backdrop-blur-sm
                                        transition-all duration-500
                                        ${isActive
                                            ? 'border-purple-500/40 opacity-100 shadow-[0_0_28px_-10px_rgba(168,85,247,0.6)]'
                                            : 'border-white/10 opacity-60 cursor-pointer'
                                        }`}>
                                    {/* Prévia visual */}
                                    <div className="relative h-52 overflow-hidden border-b border-white/10 [&>div]:pb-9">
                                        {skill.content}
                                    </div>

                                    {/* Ícone sobreposto entre a prévia e o texto */}
                                    <div
                                        className={`absolute left-5 top-52 -translate-y-1/2 z-10 p-2.5 rounded-xl bg-gradient-to-br ${skill.gradient}
                                            ring-4 ring-[#030014] shadow-lg`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Texto */}
                                    <div className="px-5 pt-8 pb-6">
                                        <h3 className="text-lg font-bold text-white leading-snug mb-2">{skill.title}</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">{skill.description}</p>
                                    </div>

                                    {/* Barra de ativo */}
                                    <span
                                        className={`absolute left-5 right-5 bottom-0 h-[2px] rounded-full bg-gradient-to-r ${skill.gradient}
                                            origin-left transition-transform duration-500 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                                    />
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* Fade na borda direita indicando mais conteúdo */}
                <div
                    className={`pointer-events-none absolute top-0 bottom-0 right-[-16px] sm:right-[-24px] w-12
                        bg-gradient-to-l from-[#030014] to-transparent transition-opacity duration-300 ${isLast ? 'opacity-0' : 'opacity-100'
                        }`}
                />
            </div>

            {/* Controles */}
            <div className="mt-5 flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => goTo(active - 1)}
                    disabled={active === 0}
                    aria-label="Tecnologia anterior"
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-white flex items-center justify-center
                        transition-opacity active:scale-95 disabled:opacity-30">
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1.5">
                    {skills.map((skill, i) => (
                        <button key={skill.title} type="button" onClick={() => goTo(i)} aria-label={`Ir para ${skill.title}`} className="p-1">
                            <span
                                className={`block h-2 rounded-full transition-all duration-500 ${active === i ? 'w-6 bg-gradient-to-r from-purple-500 to-cyan-500' : 'w-2 bg-white/25'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => goTo(active + 1)}
                    disabled={isLast}
                    aria-label="Próxima tecnologia"
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-white flex items-center justify-center
                        transition-opacity active:scale-95 disabled:opacity-30">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

/* =====================================================================
 * Sticky scroll (desktop >= lg) — comportamento original
 * ===================================================================== */
const DESKTOP_GRADIENTS = [
    '#ef008f, #6ec3f4',
    '#6ec3f4, #7038ff',
    '#7038ff, #8b5cf6',
    '#8b5cf6, #ec4899',
    '#ec4899, #f97316',
    '#f97316, #ef4444'
];

const SkillsStickyDesktop = () => {
    const [activeCard, setActiveCard] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollHeight = container.scrollHeight - container.clientHeight;
            const scrollProgress = container.scrollTop / scrollHeight;
            const cardIndex = Math.min(Math.floor(scrollProgress * skills.length), skills.length - 1);
            setActiveCard(Math.max(0, cardIndex));
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="hidden lg:block relative rounded-3xl overflow-hidden border border-white/10 bg-slate-950/40 backdrop-blur-sm">
            {/* Dot Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Top / Bottom Gradient Fade */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />

            <div ref={containerRef} className="h-[600px] flex justify-center space-x-10 p-8 overflow-y-auto scrollbar-hidden relative">
                {/* Left Side - Scrollable Content */}
                <div className="flex items-start px-4 w-auto">
                    <div className="max-w-2xl w-full">
                        {skills.map((skill, index) => {
                            const { Icon } = skill;
                            return (
                                <div key={skill.title} className="my-12 transition-all duration-500">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div
                                            className={`p-3 rounded-xl bg-gradient-to-br ${skill.gradient} transition-all duration-500 ${activeCard === index ? 'scale-110 opacity-100' : 'opacity-50 scale-90'
                                                }`}>
                                            <Icon className={`w-12 h-12 transition-all duration-500 ${activeCard === index ? 'text-white' : 'text-gray-500'}`} />
                                        </div>
                                        <h2 className={`text-2xl font-bold transition-all duration-500 ${activeCard === index ? 'text-white' : 'text-gray-600'}`}>
                                            {skill.title}
                                        </h2>
                                    </div>
                                    <p className={`text-lg max-w-xl transition-all duration-500 ${activeCard === index ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {skill.description}
                                    </p>
                                </div>
                            );
                        })}
                        <div className="h-40" />
                    </div>
                </div>

                {/* Right Side - Fixed Visual */}
                <div>
                    <div className="fixed right-16 top-1/2 -translate-y-1/2 z-20">
                        <div className="w-80 h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 relative">
                            {skills.map((skill, index) => (
                                <div
                                    key={skill.title}
                                    className={`absolute inset-0 transition-all duration-700 ${activeCard === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                                        }`}
                                    style={{
                                        background:
                                            activeCard === index
                                                ? `linear-gradient(to bottom right, ${DESKTOP_GRADIENTS[Math.min(index, DESKTOP_GRADIENTS.length - 1)]})`
                                                : 'transparent'
                                    }}>
                                    {skill.content}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SkillsSticky = () => {
    return (
        <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden lg:overflow-visible">
            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 sm:mb-6 Welcome-box">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-sm font-semibold tracking-wider">
                            HABILIDADES
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight px-4">
                        Tecnologias que <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">dominamos</span>
                    </h2>
                </div>

                <SkillsCarousel />
                <SkillsStickyDesktop />
            </div>
        </section>
    );
};

export default SkillsSticky;
