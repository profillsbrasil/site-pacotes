"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, Package, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CategoriesGrid } from "./_components/categories-grid";
import { FeaturedProducts } from "./_components/featured-products";
import { HowItWorks } from "./_components/how-it-works";
import { WhyDuNort } from "./_components/why-dunort";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/tree-line.jpg"
            alt="Natureza e castanhas"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-white/90 text-sm font-medium">
                100% Natural e Fresco
              </span>
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6"
            >
              <Image
                src="/assets/logo.png"
                alt="DuNort"
                width={400}
                height={400}
                className="object-contain mx-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-shadow-lg tracking-tight"
            >
              A Dose Certa de <span className="text-amber-400">Saúde</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-2xl text-white/90 mb-10 text-shadow-md max-w-2xl mx-auto"
            >
              Monte seu mix personalizado de castanhas, amêndoas e frutas secas.
              <br className="hidden md:block" />
              Do seu jeito, grão a grão.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                <Link href="/montar-mix">
                  <Package className="w-5 h-5 mr-2" />
                  Monte seu Mix
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full px-8 py-6 text-lg font-semibold"
              >
                <Link href="/todos-produtos">Ver Produtos</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center text-white/60"
            >
              <span className="text-xs mb-2">Role para explorar</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>

        {/* Silhouette overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none">
          <Image
            src="/assets/siluetas/silueta-dark-green.webp"
            alt=""
            fill
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Categories Grid */}
      <CategoriesGrid />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Why DuNort */}
      <WhyDuNort />
    </main>
  );
}
