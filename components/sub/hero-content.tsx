"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center px-6 sm:px-10 lg:px-20 mt-24 lg:mt-40 w-full z-[20]"
    >
      {/* LEFT SIDE */}
      <div className="h-full w-full flex flex-col gap-5 justify-center text-start items-center lg:items-start mt-[15vh] lg:mt-0">
        {/* Box de boas-vindas */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[10px] border border-[#7042f88b] bg-[#7042f810] backdrop-blur-md rounded-xl text-center opacity-90"
        >
          <h1 className="Welcome-text text-white text-sm sm:text-base">
            👋 Somos a Leap In Technology
          </h1>
        </motion.div>

        {/* Texto principal */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 mt-6 text-white font-bold w-full max-w-[600px] h-auto leading-tight text-center lg:text-left"
        >
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Criando experiências{" "}
            através de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              design
            </span>{" "}
            e{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              soluções digitais
            </span>
          </span>
        </motion.div>

        {/* Subtexto */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg text-gray-400 my-5 max-w-[600px] text-center lg:text-left"
        >
          Desenvolvemos produtos digitais com foco em performance, design e
          tecnologia moderna para elevar sua presença online.
        </motion.p>

        {/* Botão centralizado */}
        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] text-sm sm:text-base mx-auto lg:mx-0"
        >
          Entre Em Contato
        </motion.a>
      </div>

      {/* RIGHT SIDE (Imagem) */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center mt-10 lg:mt-0"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
};
