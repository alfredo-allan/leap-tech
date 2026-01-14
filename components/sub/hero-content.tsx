'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/lib/motion'

const keywords = ['sites rápidos', 'presença online', 'design que converte']

export const HeroContent = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form')
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center px-6 sm:px-10 lg:px-20 mt-24 lg:mt-40 w-full z-[20]">
      {/* LEFT SIDE */}
      <div className="h-full w-full flex flex-col gap-6 justify-center items-center lg:items-start mt-[15vh] lg:mt-0">
        {/* Welcome */}
        <motion.div
          variants={slideInFromTop}
          className="py-2 px-3 border border-[#7042f88b] bg-[#7042f810] backdrop-blur-md rounded-xl text-center opacity-90">
          <h1 className="text-white text-sm sm:text-base">👋 Somos a Leap In Technology</h1>
        </motion.div>

        {/* TEXTO PRINCIPAL COM MÁSCARA */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="
            relative mt-6 w-full max-w-[620px]
            rounded-2xl p-6 sm:p-8
            bg-gradient-to-br from-white/10 via-white/5 to-transparent
            backdrop-blur-lg
            border border-white/10
            shadow-[0_0_40px_rgba(112,66,248,0.15)]
            text-center lg:text-left
          ">
          {/* Glow sutil */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-2xl -z-10" />

          <span className="text-white font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Criamos soluções digitais focadas em{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={keywords[index]}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="
                  block mt-2
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-purple-500 to-cyan-500
                ">
                {keywords[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        {/* Subtexto */}
        <motion.p variants={slideInFromLeft(0.8)} className="text-base sm:text-lg text-gray-400 max-w-[600px] text-center lg:text-left">
          Experiências digitais objetivas para pequenos negócios que querem mais visibilidade, confiança e conversão.
        </motion.p>

        {/* CTA */}
        <motion.button
          variants={slideInFromLeft(1)}
          onClick={scrollToContact}
          className="py-2 px-4 button-primary text-white rounded-lg max-w-[200px] text-sm sm:text-base mx-auto lg:mx-0">
          Entre em Contato
        </motion.button>
      </div>

      {/* RIGHT SIDE */}
      <motion.div variants={slideInFromRight(0.8)} className="w-full h-full flex justify-center items-center mt-10 lg:mt-0">
        <Image src="/hero-bg.svg" alt="Hero Illustration" height={650} width={650} draggable={false} className="select-none" />
      </motion.div>
    </motion.div>
  )
}
