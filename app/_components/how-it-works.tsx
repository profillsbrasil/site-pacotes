"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Scale, Truck, CheckCircle } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: Package,
    title: "Escolha seus ingredientes",
    description: "Selecione entre castanhas, amêndoas, sementes e frutas secas de alta qualidade.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Scale,
    title: "Defina as quantidades",
    description: "Escolha exatamente quantos gramos ou unidades de cada item você quer no seu mix.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: CheckCircle,
    title: "Visualize seu mix",
    description: "Veja em tempo real a composição, peso total e preço do seu mix personalizado.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    icon: Truck,
    title: "Receba em casa",
    description: "Faça seu pedido e receba seu mix fresco e embalado com cuidado na sua porta.",
    color: "bg-blue-100 text-blue-700",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monte seu mix personalizado em poucos passos simples
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-4`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="text-sm font-semibold text-primary mb-2">
                    Passo {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-forest hover:bg-forest-light text-white rounded-full px-8"
          >
            <Link href="/montar-mix">Começar Agora</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
