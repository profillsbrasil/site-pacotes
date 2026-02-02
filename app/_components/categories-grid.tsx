"use client";

import { categories } from "@/lib/products-data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const categoryImages: Record<string, string> = {
  castanhas: "/assets/products/castanha-caju.jpg",
  amendoas: "/assets/products/amendoa-torrada.jpg",
  sementes: "/assets/products/chia.jpg",
  "frutas-secas": "/assets/products/damasco.jpg",
  graos: "/assets/products/granola.jpg",
};

const categoryColors: Record<string, string> = {
  castanhas: "from-amber-600/80 to-amber-800/80",
  amendoas: "from-orange-600/80 to-orange-800/80",
  sementes: "from-emerald-600/80 to-emerald-800/80",
  "frutas-secas": "from-red-600/80 to-red-800/80",
  graos: "from-yellow-600/80 to-yellow-800/80",
};

export function CategoriesGrid() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore por Categoria
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ingredientes selecionados de alta qualidade para seu mix perfeito
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href={`/todos-produtos?categoria=${category.id}`}
                className="group block relative h-48 md:h-56 rounded-2xl overflow-hidden"
              >
                {/* Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${categoryImages[category.id]})`,
                  }}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-t ${
                    categoryColors[category.id]
                  } transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <span className="text-4xl mb-2">{category.emoji}</span>
                  <h3 className="text-lg font-semibold text-center mb-1">
                    {category.name}
                  </h3>
                  <div className="flex items-center text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver produtos
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
