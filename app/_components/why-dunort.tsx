"use client";

import { motion } from "framer-motion";
import { Leaf, Shield, Heart, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Pureza Absoluta",
    description: "Ingredientes 100% naturais, sem aditivos ou intervenções artificiais. A natureza em sua forma mais pura.",
  },
  {
    icon: Shield,
    title: "Curadoria Premium",
    description: "Cada lote passa por um rigoroso processo de seleção para garantir apenas os melhores grãos.",
  },
  {
    icon: Heart,
    title: "Artesanal",
    description: "Nossos mixes são montados com cuidado individual, respeitando a sua escolha grão a grão.",
  },
  {
    icon: Sparkles,
    title: "Frescor Diário",
    description: "Mantemos nossos estoques em condições ideais para que você receba o frescor máximo em cada entrega.",
  },
];

export function WhyDuNort() {
  return (
    <section className="py-24 md:py-40 bg-secondary text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-white/60 mb-6 block">
              Nosso Compromisso
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
              A excelência que <span className="italic font-normal">nutre</span> sua rotina
            </h2>
            <p className="text-white/70 text-lg font-light leading-relaxed max-w-xl">
              Na DuNort, acreditamos que a alimentação é uma forma de arte. Por isso, selecionamos apenas ingredientes que honram a terra e sua saúde.
            </p>
          </motion.div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="w-10 h-10 flex items-center justify-center text-accent mb-6">
                  <benefit.icon className="w-full h-full stroke-[1px]" />
                </div>
                <h3 className="text-xl font-medium mb-3">{benefit.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
