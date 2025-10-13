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
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
        >
          <h1 className="leap-welcome text-white">
            👋 Somos a Leap In Technology
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white w-full h-full flex items-center justify-start"
        >
          <div className="space-y-3 md:space-y-4 leading-tight w-full">
            <div className="w-full">Criando experiências</div>
            <div className="w-full">
              através de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                design
              </span>{" "}
              e{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                soluções digitais
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
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
