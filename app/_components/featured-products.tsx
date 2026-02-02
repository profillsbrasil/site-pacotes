"use client";

import { motion } from "framer-motion";
import { getFeaturedProducts } from "@/lib/products-data";
import { ProductCard } from "../todos-produtos/_components/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-24 md:py-40 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-primary mb-4 block">
              Seleção do Especialista
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Os mais <span className="italic font-normal">apreciados</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button
              asChild
              variant="link"
              className="text-foreground hover:text-primary transition-colors p-0 h-auto font-medium"
            >
              <Link href="/todos-produtos">
                Explorar todos os produtos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
