"use client";

import { motion } from "motion/react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { categories } from "@/lib/products-data";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export function ProductFilters({
  selectedCategories,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  className,
}: ProductFiltersProps) {
  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter((c) => c !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const clearFilters = () => {
    onCategoryChange([]);
    onSearchChange("");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || searchQuery.length > 0;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "bg-card rounded-2xl border border-border/50 p-5 shadow-sm h-fit sticky top-24",
        className
      )}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">Filtros</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-foreground -mr-2"
          >
            <X className="h-3 w-3 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-muted-foreground mb-2 block">
          Buscar
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Nome do produto..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 rounded-xl bg-background"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <Label className="text-sm font-medium text-muted-foreground mb-3 block">
          Categorias
        </Label>
        <div className="space-y-2.5">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <motion.div
                key={category.id}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center"
              >
                <label
                  htmlFor={category.id}
                  className={cn(
                    "flex items-center gap-3 w-full cursor-pointer rounded-lg p-2 -mx-2 transition-colors",
                    isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  )}
                >
                  <Checkbox
                    id={category.id}
                    checked={isSelected}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-base">{category.emoji}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </label>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active filters count */}
      {hasActiveFilters && (
        <div className="mt-5 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            {selectedCategories.length > 0 && (
              <span className="font-medium text-foreground">
                {selectedCategories.length} categoria(s)
              </span>
            )}
            {selectedCategories.length > 0 && searchQuery && " • "}
            {searchQuery && (
              <span>
                Buscando:{" "}
                <span className="font-medium text-foreground">
                  &quot;{searchQuery}&quot;
                </span>
              </span>
            )}
          </p>
        </div>
      )}
    </motion.aside>
  );
}
