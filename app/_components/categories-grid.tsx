"use client";

import { categories } from "@/lib/products-data";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categoryImages: Record<string, string> = {
  castanhas: "/assets/products/castanha-caju.jpg",
  amendoas: "/assets/products/amendoa-torrada.jpg",
  sementes: "/assets/products/chia.jpg",
  "frutas-secas": "/assets/products/damasco.jpg",
  graos: "/assets/products/granola.jpg",
};

export function CategoriesGrid() {
  return (
    <section className="py-24 md:py-40 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-end justify-between gap-8"
          >
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-primary mb-4 block">
                Nossas Origens
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                Explore a <span className="italic font-normal">diversidade</span> da natureza
              </h2>
            </div>
            <Link 
              href="/todos-produtos" 
              className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors pb-2 border-b border-stone/20"
            >
              Ver Catálogo Completo
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 h-[1000px] md:h-[600px]">
          {/* Bento Box Layout */}
          {categories.slice(0, 5).map((category, index) => {
            const gridClasses = [
              "md:col-span-8 md:row-span-1", // 1
              "md:col-span-4 md:row-span-1", // 2
              "md:col-span-4 md:row-span-1", // 3
              "md:col-span-4 md:row-span-1", // 4
              "md:col-span-4 md:row-span-1", // 5
            ];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={gridClasses[index] || "md:col-span-4"}
              >
                <Link
                  href={`/todos-produtos?categoria=${category.id}`}
                  className="group relative block w-full h-full rounded-3xl overflow-hidden bg-stone-100"
                >
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={categoryImages[category.id] || "/assets/tree-line.jpg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.85]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>

                  <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                    <span className="text-white/70 text-[10px] uppercase tracking-widest font-medium mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Coleção {category.emoji}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 tracking-tight transition-transform duration-300 group-hover:-translate-y-1">
                      {category.name}
                    </h3>
                    <div className="w-8 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
