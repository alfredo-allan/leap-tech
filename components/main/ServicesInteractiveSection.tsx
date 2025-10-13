'use client';

import { useState } from 'react';
import { Palette, Target, Figma, Code2 } from 'lucide-react';
import Image from 'next/image';

interface Service {
    id: number;
    icon: JSX.Element;
    title: string;
    description: string;
    avatarSrc: string;
    visual: JSX.Element;
}

export default function ServicesSection() {
    const [activeService, setActiveService] = useState(0);

    const services: Service[] = [
        {
            id: 0,
            icon: <Palette className="w-5 h-5" />,
            title: 'Branding',
            description: 'Construir identidades visuais lindas que ressoem com a essência da sua marca.',
            avatarSrc: '/avatar/avatar-branding.png',
            visual: (
                <div className="relative w-full h-full flex items-center justify-center px-4">
                    <div className="absolute top-[15%] sm:top-1/4 left-1/2 transform -translate-x-1/2">
                        <div className="w-1 h-24 sm:h-32 bg-gradient-to-b from-gray-400 to-gray-600"></div>
                        <div className="absolute top-0 left-1 w-32 sm:w-40 h-20 sm:h-24 bg-gradient-to-r from-purple-600 to-purple-500 transform origin-left"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)' }}>
                        </div>
                    </div>
                    <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-12">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                            <Image
                                src="/avatar/avatar-branding.png"
                                alt="Branding Avatar"
                                width={128}
                                height={128}
                                className="object-contain w-24 h-24 sm:w-32 sm:h-32"
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.nextSibling) {
                                        (target.nextSibling as HTMLElement).style.display = 'flex';
                                    }
                                }}
                            />
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center absolute inset-0" style={{ display: 'none' }}>
                                <Palette className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400" />
                            </div>
                        </div>
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
                    <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-sm rounded-lg border border-purple-500/30 p-3 sm:p-4 scale-90 sm:scale-100">
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex gap-4 mb-6 justify-center">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
                                <div className="w-6 h-6 bg-cyan-500 rounded"></div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">W</div>
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/50 flex items-center justify-center">
                                <Code2 className="w-6 h-6 text-purple-400" />
                            </div>
                        </div>
                        <div className="space-y-2 text-xs font-mono">
                            <div className="text-cyan-400">import <span className="text-purple-400">{'{ Menu }'}</span> from <span className="text-green-400">&apos;@ui/core/react&apos;</span></div>
                            <div className="text-pink-400">function <span className="text-yellow-400">MyDropdown()</span> {'{'}</div>
                            <div className="pl-4 text-gray-400">return <span className="text-purple-400">{'<Menu>'}</span></div>
                        </div>
                    </div>
                    <div className="absolute bottom-2 sm:bottom-4 right-4 sm:right-8">
                        <div className="w-20 h-20 sm:w-28 sm:h-28 relative">
                            <Image
                                src="/avatar/avatar-social.png"
                                alt="Social Media Avatar"
                                width={112}
                                height={112}
                                className="object-contain w-20 h-20 sm:w-28 sm:h-28"
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.nextSibling) {
                                        (target.nextSibling as HTMLElement).style.display = 'flex';
                                    }
                                }}
                            />
                            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center absolute inset-0" style={{ display: 'none' }}>
                                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            icon: <Figma className="w-5 h-5" />,
            title: 'Design UI UX',
            description: 'Sites com uma experiência de usuário intuitiva e com um alto desempenho.',
            avatarSrc: '/avatar/avatar-design.png',
            visual: (
                <div className="relative w-full h-full flex items-center justify-center px-4">
                    <div className="absolute top-[15%] sm:top-1/4 right-[15%] sm:right-1/4 flex flex-col gap-3 sm:gap-4 scale-75 sm:scale-100">
                        <div className="w-24 sm:w-32 h-3 sm:h-4 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"></div>
                        <div className="w-24 sm:w-32 h-3 sm:h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                        <div className="w-24 sm:w-32 h-3 sm:h-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                    </div>
                    <div className="absolute top-[25%] sm:top-1/3 left-[15%] sm:left-1/4 scale-75 sm:scale-100">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-900 rounded-full flex items-center justify-center">
                                <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">N</div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-[25%] sm:bottom-1/4 left-[20%] sm:left-1/3 flex gap-2 scale-75 sm:scale-100">
                        <div className="w-20 sm:w-24 h-2 sm:h-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded"></div>
                        <div className="w-20 sm:w-24 h-2 sm:h-3 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded"></div>
                    </div>
                    <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-12">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                            <Image
                                src="/avatar/avatar-design.png"
                                alt="Design Avatar"
                                width={128}
                                height={128}
                                className="object-contain w-24 h-24 sm:w-32 sm:h-32"
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.nextSibling) {
                                        (target.nextSibling as HTMLElement).style.display = 'flex';
                                    }
                                }}
                            />
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center absolute inset-0" style={{ display: 'none' }}>
                                <Figma className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            icon: <Code2 className="w-5 h-5" />,
            title: 'Desenvolvimento',
            description: 'Sites, aplicações e plataformas que são rápidos, seguros e fáceis de gerenciar.',
            avatarSrc: '/avatar/avatar-dev.png',
            visual: (
                <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6">
                    <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-sm rounded-lg border border-purple-500/30 overflow-hidden scale-90 sm:scale-100">
                        <div className="bg-slate-800/80 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 border-b border-purple-500/20">
                            <div className="flex gap-1.5 sm:gap-2">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex-1 ml-2 sm:ml-4 bg-slate-700/50 rounded px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-cyan-400 truncate">
                                🔒 https://www.yourwebsite.com/
                            </div>
                        </div>
                        <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
                            <div className="flex justify-end gap-3 sm:gap-4 mb-4 sm:mb-6 text-[10px] sm:text-xs text-gray-400">
                                <span>About</span>
                                <span>Careers</span>
                                <span>Blog</span>
                            </div>
                            <div className="text-center space-y-3 sm:space-y-4">
                                <h3 className="text-base sm:text-xl font-bold text-white leading-tight">Discover the secrets to mastering web development</h3>
                                <p className="text-xs sm:text-sm text-gray-400">Amet convallis tempus lobortis dui. Nec dapibus pharetra ipsum commodo.</p>
                                <button className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:from-purple-500 hover:to-purple-400 transition-all">
                                    Get in touch
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-2 sm:bottom-4 right-4 sm:right-8">
                        <div className="w-20 h-20 sm:w-28 sm:h-28 relative">
                            <Image
                                src="/avatar/avatar-dev.png"
                                alt="Development Avatar"
                                width={112}
                                height={112}
                                className="object-contain w-20 h-20 sm:w-28 sm:h-28"
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.nextSibling) {
                                        (target.nextSibling as HTMLElement).style.display = 'flex';
                                    }
                                }}
                            />
                            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center absolute inset-0" style={{ display: 'none' }}>
                                <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section className="w-full min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"></div>

            <div className="relative max-w-7xl mx-auto">
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 sm:mb-6 Welcome-box">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-sm font-semibold tracking-wider">
                            SERVIÇOS
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight px-4">
                        Design com um diferencial<br />
                        competitivo para sua Empresa
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
                    {/* Left Side - Service Cards */}
                    <div className="space-y-3 sm:space-y-4">
                        {services.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => setActiveService(service.id)}
                                className={`w-full text-left p-4 sm:p-6 rounded-2xl backdrop-blur-md transition-all duration-500 group relative ${activeService === service.id
                                    ? 'bg-white/[0.08] border border-purple-500/40'
                                    : 'bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                                    }`}
                                style={
                                    activeService === service.id
                                        ? {
                                            boxShadow: '0 0 30px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                        }
                                        : {}
                                }
                            >
                                {activeService === service.id && (
                                    <>
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 pointer-events-none"
                                            style={{ animationDuration: '3s' }}></div>
                                        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500/30 via-purple-400/20 to-cyan-500/30 blur-sm pointer-events-none" style={{ zIndex: -1 }}></div>
                                    </>
                                )}
                                <div className="flex items-start gap-4 relative z-10">
                                    <div className={`p-2.5 rounded-lg transition-all duration-500 ${activeService === service.id
                                        ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-purple-300'
                                        : 'text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-500/10'
                                        }`}>
                                        {service.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 transition-all duration-500 ${activeService === service.id
                                            ? 'text-white'
                                            : 'text-gray-200 group-hover:text-white'
                                            }`}>
                                            {service.title}
                                        </h3>
                                        <p className={`text-xs sm:text-sm leading-relaxed transition-all duration-500 ${activeService === service.id
                                            ? 'text-gray-300'
                                            : 'text-gray-400 group-hover:text-gray-300'
                                            }`}>
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right Side - Visual Content */}
                    <div className="relative h-[400px] sm:h-[450px] lg:h-[600px] order-first lg:order-last">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-900/10 to-cyan-900/10 backdrop-blur-sm border border-white/5 overflow-hidden">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className={`absolute inset-0 transition-all duration-500 ${activeService === service.id
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8 pointer-events-none'
                                        }`}
                                >
                                    {service.visual}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}