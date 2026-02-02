"use client";

import { motion } from "framer-motion";
import { Leaf, Shield, Clock, Award } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Todos os nossos produtos são naturais, sem conservantes artificiais ou aditivos.",
  },
  {
    icon: Shield,
    title: "Qualidade Premium",
    description: "Selecionamos rigorosamente cada ingrediente para garantir o melhor sabor e frescor.",
  },
  {
    icon: Clock,
    title: "Entrega Rápida",
    description: "Receba seu mix em até 48h em capitais. Embalado para preservar a frescura.",
  },
  {
    icon: Award,
    title: "Satisfação Garantida",
    description: "Não gostou? Fale conosco. Sua satisfação é nossa prioridade número um.",
  },
];

export function WhyDuNort() {
  return (
    <section className="py-20 md:py-32 bg-forest text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher a DuNort?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Compromisso com qualidade, frescor e sua satisfação
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-white/70">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
