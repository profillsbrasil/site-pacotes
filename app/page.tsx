"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CategoriesGrid } from "./_components/categories-grid";
import { FeaturedProducts } from "./_components/featured-products";
import { HowItWorks } from "./_components/how-it-works";
import { WhyDuNort } from "./_components/why-dunort";
import { Footer } from "./_components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/tree-line.jpg"
            alt="Natureza DuNort"
            fill
            className="object-cover brightness-[0.7] saturate-[0.8]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 container px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/80">
                Premium Organic Selection
              </span>
            </div>

            {/* Logo Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 flex justify-center"
            >
              <Image
                src="/assets/logo.png"
                alt="DuNort Logo"
                width={320}
                height={320}
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight leading-none text-shadow-lg">
              A Dose Certa de <span className="italic font-normal">Saúde</span>
            </h1>

            {/* Description */}
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light tracking-wide text-balance">
              Experiência personalizada em cada grão. Monte seu mix exclusivo com os melhores ingredientes da natureza.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary text-primary-foreground px-8 h-14 text-base shadow-xl hover:scale-105 transition-all"
              >
                <Link href="/montar-mix">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Monte seu Mix
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full glass border-white/20 text-white hover:bg-white/10 px-8 h-14 text-base"
              >
                <Link href="/todos-produtos">Catálogo Completo</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 text-white/40 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-medium">Explore</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>

        {/* Silhouette Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-40 z-[5] pointer-events-none">
          <Image
            src="/assets/siluetas/silueta-dark-green.webp"
            alt=""
            fill
            className="object-cover object-top opacity-90"
          />
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="relative z-10 bg-background">
        <HowItWorks />
        <CategoriesGrid />
        <FeaturedProducts />
        <WhyDuNort />
        <Footer />
      </div>
    </main>
  );
}
