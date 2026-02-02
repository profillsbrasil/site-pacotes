"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Package, Scale, Truck, ShoppingBag } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: Package,
    title: "Seleção Curada",
    description: "Escolha entre as melhores castanhas, sementes e frutas secas selecionadas na origem.",
  },
  {
    icon: Scale,
    title: "Proporção Exata",
    description: "Defina grama por grama a composição do seu mix para atingir o equilíbrio perfeito.",
  },
  {
    icon: ShoppingBag,
    title: "Checkout Simples",
    description: "Visualize sua criação em tempo real e finalize seu pedido com total facilidade.",
  },
  {
    icon: Truck,
    title: "Frescor na Porta",
    description: "Embalamos sua criação com cuidado artesanal e entregamos com agilidade.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 md:py-40 bg-background border-y border-stone/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-primary mb-4 block">
              Processo Artesanal
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              Como criamos a sua <span className="italic font-normal">experiência</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-sm font-light leading-relaxed"
          >
            Um caminho simples e sofisticado para transformar ingredientes naturais no seu mix favorito.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative mb-8">
                <div className="w-12 h-12 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                  <step.icon className="w-full h-full stroke-[1.2px]" />
                </div>
                <span className="absolute -top-4 -right-2 text-4xl font-serif italic text-stone/10 select-none">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24 pt-12 border-t border-stone/10 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <p className="text-foreground/60 text-sm font-medium italic">
            Pronto para começar sua jornada gastronômica?
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-10 bg-primary text-primary-foreground hover:scale-105 transition-all shadow-lg"
          >
            <Link href="/montar-mix">
              Iniciar Montagem
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
