"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Package, Sparkles } from "lucide-react";
import { ProductCard } from "./_components/product-card";
import { ProductFilters } from "./_components/product-filters";
import { products, searchProducts } from "@/lib/products-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TodosProdutosPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by search
    if (searchQuery.trim()) {
      result = searchProducts(searchQuery);
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    return result;
  }, [selectedCategories, searchQuery]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-28 pb-12 lg:pt-32 lg:pb-16 bg-linear-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Todos os Produtos
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore nossa seleção premium de ingredientes naturais para criar
              seu mix de nuts personalizado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-72 shrink-0">
              <ProductFilters
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-end mb-6">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {filteredProducts.length}
                  </span>{" "}
                  {filteredProducts.length === 1 ? "produto" : "produtos"}{" "}
                  encontrado(s)
                </p>
              </div>

              {/* Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Tente ajustar seus filtros ou buscar por outro termo.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSearchQuery("");
                    }}
                  >
                    Limpar filtros
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
