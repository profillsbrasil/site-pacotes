"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, ImageOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products-data";
import { categories } from "@/lib/products-data";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const category = categories.find((c) => c.id === product.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group flex flex-col transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100 mb-6">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOffIcon className="size-8 text-stone-300" />
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Overlay Action */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-white">
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-primary/60">
            {category?.name}
          </span>
          <span className="text-xs font-medium text-stone-400">
            {product.weight}g
          </span>
        </div>

        <h3 className="text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <p className="text-sm font-light text-stone-500 line-clamp-1 mb-4">
          {product.description}
        </p>

        <span className="text-lg font-semibold text-foreground">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </span>
      </div>
    </motion.article>
  );
}
