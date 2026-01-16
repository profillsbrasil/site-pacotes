"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products-data";
import { categories } from "@/lib/products-data";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const category = categories.find((c) => c.id === product.category);

  const handleAddToMix = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-primary/20">
            <span className="text-5xl">{category?.emoji || "🥜"}</span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        )}

        {/* Featured Badge */}
        {product.featured && (
          <Badge
            variant="default"
            className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm"
          >
            Destaque
          </Badge>
        )}

        {/* Quick Add Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Button
            size="icon"
            className={cn(
              "rounded-full shadow-lg transition-colors",
              isAdded && "bg-green-500 hover:bg-green-600"
            )}
            onClick={handleAddToMix}
          >
            {isAdded ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category */}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {category?.emoji} {category?.name}
        </span>

        {/* Name */}
        <h3 className="font-semibold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
            <span className="text-xs text-muted-foreground">
              {product.weight}g
            </span>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="rounded-full text-xs"
            onClick={handleAddToMix}
          >
            {isAdded ? "Adicionado!" : "Adicionar"}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
