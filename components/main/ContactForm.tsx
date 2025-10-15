'use client';

import { useState, ChangeEvent } from 'react';
import { Mail, MessageCircle, Send, User, Phone, AtSign } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    // Função para capitalizar nomes próprios
    const capitalizeName = (value: string): string => {
        return value
            .split(' ')
            .map(word => {
                if (word.length === 0) return word;
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(' ');
    };

    // Função para formatar telefone
    const formatPhone = (value: string): string => {
        const numbers = value.replace(/\D/g, '');

        if (numbers.length <= 2) {
            return numbers;
        } else if (numbers.length <= 7) {
            return `${numbers.slice(0, 2)} ${numbers.slice(2)}`;
        } else if (numbers.length <= 11) {
            return `${numbers.slice(0, 2)} ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
        }

        return `${numbers.slice(0, 2)} ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    };

    // Detectar se é mobile
    const isMobile = (): boolean => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
    };

    // Validações
    const validateName = (name: string): boolean => {
        if (name.trim().length < 3) {
            setErrors(prev => ({ ...prev, name: 'Nome deve ter pelo menos 3 caracteres' }));
            return false;
        }
        setErrors(prev => ({ ...prev, name: '' }));
        return true;
    };

    const validatePhone = (phone: string): boolean => {
        const numbers = phone.replace(/\D/g, '');
        if (numbers.length !== 11) {
            setErrors(prev => ({ ...prev, phone: 'Telefone deve ter 11 dígitos (DDD + número)' }));
            return false;
        }
        setErrors(prev => ({ ...prev, phone: '' }));
        return true;
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors(prev => ({ ...prev, email: 'Email inválido' }));
            return false;
        }
        setErrors(prev => ({ ...prev, email: '' }));
        return true;
    };

    const validateMessage = (message: string): boolean => {
        if (message.trim().length < 10) {
            setErrors(prev => ({ ...prev, message: 'Mensagem deve ter pelo menos 10 caracteres' }));
            return false;
        }
        setErrors(prev => ({ ...prev, message: '' }));
        return true;
    };

    // Handlers de input
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const capitalized = capitalizeName(e.target.value);
        setFormData(prev => ({ ...prev, name: capitalized }));
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        setFormData(prev => ({ ...prev, phone: formatted }));
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, email: e.target.value }));
    };

    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, message: e.target.value }));
    };

    // Validar todos os campos
    const validateAll = (): boolean => {
        const isNameValid = validateName(formData.name);
        const isPhoneValid = validatePhone(formData.phone);
        const isEmailValid = validateEmail(formData.email);
        const isMessageValid = validateMessage(formData.message);

        return isNameValid && isPhoneValid && isEmailValid && isMessageValid;
    };

    // Enviar por Email
    const handleEmailSubmit = () => {
        if (!validateAll()) return;

        const subject = encodeURIComponent(`Contato - ${formData.name}`);
        const body = encodeURIComponent(
            `Nome: ${formData.name}\n` +
            `Telefone: ${formData.phone}\n` +
            `Email: ${formData.email}\n\n` +
            `Mensagem:\n${formData.message}`
        );

        window.location.href = `mailto:leap.technology.sp@gmail.com?subject=${subject}&body=${body}`;
    };

    // Enviar por WhatsApp
    const handleWhatsAppSubmit = () => {
        if (!validateAll()) return;

        const mobile = isMobile();
        let message = '';

        if (mobile) {
            // Formato com emojis para mobile
            message =
                `👤 *Nome:* ${formData.name}\n` +
                `📱 *Telefone:* ${formData.phone}\n` +
                `📧 *Email:* ${formData.email}\n\n` +
                `💬 *Mensagem:*\n${formData.message}`;
        } else {
            // Formato sem emojis para desktop
            message =
                `*Nome:* ${formData.name}\n` +
                `*Telefone:* ${formData.phone}\n` +
                `*Email:* ${formData.email}\n\n` +
                `*Mensagem:*\n${formData.message}`;
        }

        const phoneNumber = '5511994102660';
        const whatsappUrl = mobile
            ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id="contact-form" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 sm:mb-6 Welcome-box">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-sm font-semibold tracking-wider">
                            CONTATO
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight px-4">
                        Vamos transformar sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">ideia em realidade</span>
                    </h2>
                    <p className="text-gray-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
                        Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer
                    </p>
                </div>

                {/* Form Container */}
                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-950/40 backdrop-blur-sm max-w-3xl mx-auto">
                    {/* Dot Pattern Overlay */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}>
                    </div>

                    <div className="relative p-6 sm:p-8 lg:p-10">
                        <div className="space-y-6">
                            {/* Nome */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="flex items-center gap-2 text-white font-medium text-sm sm:text-base">
                                    <User className="w-4 h-4 text-purple-400" />
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                    onBlur={() => validateName(formData.name)}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                    placeholder="Digite seu nome completo"
                                />
                                {errors.name && (
                                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Telefone */}
                            <div className="space-y-2">
                                <label htmlFor="phone" className="flex items-center gap-2 text-white font-medium text-sm sm:text-base">
                                    <Phone className="w-4 h-4 text-cyan-400" />
                                    Telefone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    onBlur={() => validatePhone(formData.phone)}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                    placeholder="11 99410-2660"
                                    maxLength={14}
                                />
                                {errors.phone && (
                                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="flex items-center gap-2 text-white font-medium text-sm sm:text-base">
                                    <AtSign className="w-4 h-4 text-blue-400" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleEmailChange}
                                    onBlur={() => validateEmail(formData.email)}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    placeholder="seu@email.com"
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Mensagem */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="flex items-center gap-2 text-white font-medium text-sm sm:text-base">
                                    <Send className="w-4 h-4 text-pink-400" />
                                    Mensagem
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleMessageChange}
                                    onBlur={() => validateMessage(formData.message)}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all resize-none"
                                    placeholder="Conte-nos sobre seu projeto..."
                                />
                                {errors.message && (
                                    <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                                )}
                            </div>

                            {/* Botões */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {/* Botão Email */}
                                <button
                                    type="button"
                                    onClick={handleEmailSubmit}
                                    className="button-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    <Mail className="w-5 h-5" />
                                    Enviar por Email
                                </button>

                                {/* Botão WhatsApp */}
                                <button
                                    type="button"
                                    onClick={handleWhatsAppSubmit}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(8, 126, 59, 0) 0%, rgba(8, 126, 59, 0.32) 100%), rgba(37, 211, 102, 0.12)',
                                        boxShadow: 'inset 0 0 12px rgba(37, 211, 102, 0.24)'
                                    }}
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Enviar por WhatsApp
                                </button>
                            </div>
                        </div>

                        {/* Info adicional */}
                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <p className="text-gray-400 text-sm">
                                Responderemos em até 24 horas úteis
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm