"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Nut,
  Wheat,
  Cherry,
  Blend,
  Check,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Tipos
interface Product {
  id: string;
  name: string;
  category: string;
  pricePerKg: number;
  description: string;
  minQuantity: number; // gramas mínimas
  step: number; // incremento em gramas
}

interface SelectedProduct {
  product: Product;
  quantity: number; // em gramas
}

// Dados de exemplo dos produtos
const products: Product[] = [
  // Castanhas e Nozes
  {
    id: "castanha-para",
    name: "Castanha-do-Pará",
    category: "castanhas",
    pricePerKg: 89.9,
    description: "Rica em selênio, direto do Pará",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "castanha-caju",
    name: "Castanha de Caju",
    category: "castanhas",
    pricePerKg: 79.9,
    description: "Torrada e sem sal",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "nozes",
    name: "Nozes",
    category: "castanhas",
    pricePerKg: 99.9,
    description: "Nozes chilenas selecionadas",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "amendoas",
    name: "Amêndoas",
    category: "castanhas",
    pricePerKg: 89.9,
    description: "Amêndoas californianas",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "avelas",
    name: "Avelãs",
    category: "castanhas",
    pricePerKg: 119.9,
    description: "Avelãs turcas premium",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "amendoim",
    name: "Amendoim Torrado",
    category: "castanhas",
    pricePerKg: 29.9,
    description: "Amendoim crocante sem pele",
    minQuantity: 25,
    step: 25,
  },
  // Grãos e Sementes
  {
    id: "chia",
    name: "Semente de Chia",
    category: "graos",
    pricePerKg: 49.9,
    description: "Rica em ômega-3",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "linhaca",
    name: "Linhaça Dourada",
    category: "graos",
    pricePerKg: 29.9,
    description: "Fonte de fibras",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "quinoa",
    name: "Quinoa em Grãos",
    category: "graos",
    pricePerKg: 39.9,
    description: "Superalimento completo",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "gergelim",
    name: "Gergelim",
    category: "graos",
    pricePerKg: 34.9,
    description: "Gergelim branco natural",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "girassol",
    name: "Semente de Girassol",
    category: "graos",
    pricePerKg: 24.9,
    description: "Sem casca, pronta para consumo",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "abobora",
    name: "Semente de Abóbora",
    category: "graos",
    pricePerKg: 59.9,
    description: "Rica em zinco e magnésio",
    minQuantity: 25,
    step: 25,
  },
  // Frutas Secas
  {
    id: "damasco",
    name: "Damasco Seco",
    category: "frutas",
    pricePerKg: 69.9,
    description: "Damasco turco macio",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "uva-passa",
    name: "Uva Passa",
    category: "frutas",
    pricePerKg: 34.9,
    description: "Uva passa escura sem semente",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "banana",
    name: "Banana Desidratada",
    category: "frutas",
    pricePerKg: 44.9,
    description: "Banana chips crocante",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "maca",
    name: "Maçã Desidratada",
    category: "frutas",
    pricePerKg: 54.9,
    description: "Fatias de maçã crocantes",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "manga",
    name: "Manga Desidratada",
    category: "frutas",
    pricePerKg: 79.9,
    description: "Manga palmer em fatias",
    minQuantity: 25,
    step: 25,
  },
  {
    id: "cranberry",
    name: "Cranberry",
    category: "frutas",
    pricePerKg: 89.9,
    description: "Cranberry importado",
    minQuantity: 25,
    step: 25,
  },
  // Mix e Granolas
  {
    id: "mix-nuts",
    name: "Mix de Nuts",
    category: "mix",
    pricePerKg: 84.9,
    description: "Castanhas variadas selecionadas",
    minQuantity: 50,
    step: 50,
  },
  {
    id: "granola-tradicional",
    name: "Granola Tradicional",
    category: "mix",
    pricePerKg: 39.9,
    description: "Com mel e frutas",
    minQuantity: 50,
    step: 50,
  },
  {
    id: "granola-low-carb",
    name: "Granola Low Carb",
    category: "mix",
    pricePerKg: 59.9,
    description: "Sem açúcar adicionado",
    minQuantity: 50,
    step: 50,
  },
  {
    id: "trail-mix",
    name: "Trail Mix Energia",
    category: "mix",
    pricePerKg: 74.9,
    description: "Nuts, frutas e sementes",
    minQuantity: 50,
    step: 50,
  },
  {
    id: "mix-tropical",
    name: "Mix Tropical",
    category: "mix",
    pricePerKg: 64.9,
    description: "Frutas tropicais desidratadas",
    minQuantity: 50,
    step: 50,
  },
  {
    id: "aveia-flocos",
    name: "Aveia em Flocos",
    category: "mix",
    pricePerKg: 19.9,
    description: "Flocos grossos integrais",
    minQuantity: 50,
    step: 50,
  },
];

const packageSizes = [
  { size: 100, label: "100g", description: "Experimentar" },
  { size: 250, label: "250g", description: "Individual" },
  { size: 500, label: "500g", description: "Família" },
  { size: 1000, label: "1kg", description: "Econômico" },
];

const categories = [
  { id: "castanhas", label: "Castanhas e Nozes", icon: Nut },
  { id: "graos", label: "Grãos e Sementes", icon: Wheat },
  { id: "frutas", label: "Frutas Secas", icon: Cherry },
  { id: "mix", label: "Mix e Granolas", icon: Blend },
];

export default function MonteSeuPacotePage() {
  const [selectedSize, setSelectedSize] = useState<number>(250);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [activeCategory, setActiveCategory] = useState("castanhas");

  // Calcular peso total usado
  const totalWeight = useMemo(() => {
    return selectedProducts.reduce((sum, sp) => sum + sp.quantity, 0);
  }, [selectedProducts]);

  // Calcular preço total
  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((sum, sp) => {
      const pricePerGram = sp.product.pricePerKg / 1000;
      return sum + pricePerGram * sp.quantity;
    }, 0);
  }, [selectedProducts]);

  // Peso restante
  const remainingWeight = selectedSize - totalWeight;

  // Progresso em porcentagem
  const progressPercentage = Math.min((totalWeight / selectedSize) * 100, 100);

  // Verificar se o pacote está completo
  const isPackageComplete = totalWeight === selectedSize;
  const isOverLimit = totalWeight > selectedSize;

  // Adicionar produto
  const addProduct = (product: Product) => {
    const existing = selectedProducts.find(
      (sp) => sp.product.id === product.id
    );
    const quantityToAdd = product.minQuantity;

    if (totalWeight + quantityToAdd > selectedSize) {
      return; // Não permite exceder o limite
    }

    if (existing) {
      setSelectedProducts((prev) =>
        prev.map((sp) =>
          sp.product.id === product.id
            ? { ...sp, quantity: sp.quantity + product.step }
            : sp
        )
      );
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        { product, quantity: quantityToAdd },
      ]);
    }
  };

  // Remover quantidade do produto
  const decreaseProduct = (productId: string) => {
    const existing = selectedProducts.find((sp) => sp.product.id === productId);
    if (!existing) return;

    if (existing.quantity <= existing.product.minQuantity) {
      setSelectedProducts((prev) =>
        prev.filter((sp) => sp.product.id !== productId)
      );
    } else {
      setSelectedProducts((prev) =>
        prev.map((sp) =>
          sp.product.id === productId
            ? { ...sp, quantity: sp.quantity - sp.product.step }
            : sp
        )
      );
    }
  };

  // Remover produto completamente
  const removeProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.filter((sp) => sp.product.id !== productId)
    );
  };

  // Limpar tudo
  const clearAll = () => {
    setSelectedProducts([]);
  };

  // Obter quantidade de um produto
  const getProductQuantity = (productId: string): number => {
    const found = selectedProducts.find((sp) => sp.product.id === productId);
    return found ? found.quantity : 0;
  };

  // Verificar se pode adicionar mais
  const canAddMore = (product: Product): boolean => {
    return totalWeight + product.step <= selectedSize;
  };

  return (
    <>
      {/* Header */}
      <section className="bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              Monte seu Pacote
            </h1>
            <p className="text-lg text-muted-foreground">
              Escolha o tamanho do pacote, selecione os produtos e defina as
              quantidades. Simples, rápido e do seu jeito.
            </p>
          </div>
        </div>
      </section>

      {/* Builder */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Side - Products */}
            <div className="space-y-8">
              {/* Package Size Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      1
                    </span>
                    Escolha o tamanho do pacote
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {packageSizes.map((pkg) => (
                      <button
                        key={pkg.size}
                        onClick={() => {
                          setSelectedSize(pkg.size);
                          // Limpar produtos se exceder novo tamanho
                          if (totalWeight > pkg.size) {
                            clearAll();
                          }
                        }}
                        className={cn(
                          "rounded-xl border-2 p-4 text-center transition-all hover:border-primary/50",
                          selectedSize === pkg.size
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        <p className="text-2xl font-bold text-foreground">
                          {pkg.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {pkg.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Products Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      2
                    </span>
                    Escolha os produtos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={activeCategory}
                    onValueChange={setActiveCategory}
                  >
                    <TabsList className="mb-2 grid w-full  grid-cols-4 rounded-md">
                      {categories.map((cat) => (
                        <TabsTrigger
                          key={cat.id}
                          value={cat.id}
                          className="gap-2 rounded-md "
                        >
                          <cat.icon className="h-4 w-4" />
                          <span className="hidden sm:inline">{cat.label}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {categories.map((cat) => (
                      <TabsContent key={cat.id} value={cat.id}>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {products
                            .filter((p) => p.category === cat.id)
                            .map((product) => {
                              const quantity = getProductQuantity(product.id);
                              const isSelected = quantity > 0;

                              return (
                                <div
                                  key={product.id}
                                  className={cn(
                                    "rounded-xl border-2 p-4 transition-all",
                                    isSelected
                                      ? "border-primary bg-primary/5"
                                      : "border-border hover:border-primary/30"
                                  )}
                                >
                                  {/* Product Icon Placeholder */}
                                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
                                    <cat.icon className="h-8 w-8 text-muted-foreground" />
                                  </div>

                                  <h3 className="font-semibold text-foreground">
                                    {product.name}
                                  </h3>
                                  <p className="mb-2 text-sm text-muted-foreground">
                                    {product.description}
                                  </p>
                                  <p className="mb-3 text-sm font-medium text-primary">
                                    R$ {product.pricePerKg.toFixed(2)}/kg
                                  </p>

                                  {isSelected ? (
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-8 w-8"
                                        onClick={() =>
                                          decreaseProduct(product.id)
                                        }
                                      >
                                        <Minus className="h-4 w-4" />
                                      </Button>
                                      <span className="w-16 text-center font-medium">
                                        {quantity}g
                                      </span>
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-8 w-8"
                                        onClick={() => addProduct(product)}
                                        disabled={!canAddMore(product)}
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="w-full gap-2"
                                      onClick={() => addProduct(product)}
                                      disabled={!canAddMore(product)}
                                    >
                                      <Plus className="h-4 w-4" />
                                      Adicionar
                                    </Button>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Summary */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Seu Pacote
                    </span>
                    {selectedProducts.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAll}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Limpar
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Preenchimento
                      </span>
                      <span className="font-medium">
                        {totalWeight}g / {selectedSize}g
                      </span>
                    </div>
                    <Progress
                      value={progressPercentage}
                      className={cn(
                        isOverLimit && "bg-destructive/20",
                        isPackageComplete && "bg-green-100"
                      )}
                    />
                    {isPackageComplete && (
                      <p className="flex items-center gap-1 text-sm text-green-600">
                        <Check className="h-4 w-4" />
                        Pacote completo!
                      </p>
                    )}
                    {!isPackageComplete && remainingWeight > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Faltam {remainingWeight}g para completar
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Selected Products List */}
                  {selectedProducts.length === 0 ? (
                    <div className="py-8 text-center">
                      <Package className="mx-auto h-12 w-12 text-muted-foreground/40" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Seu pacote está vazio
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Adicione produtos para começar
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedProducts.map((sp) => {
                        const itemPrice =
                          (sp.product.pricePerKg / 1000) * sp.quantity;

                        return (
                          <div
                            key={sp.product.id}
                            className="flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-foreground">
                                {sp.product.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {sp.quantity}g
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                R$ {itemPrice.toFixed(2)}
                              </span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                onClick={() => removeProduct(sp.product.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <Separator />

                  {/* Total */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-lg font-semibold">
                        R$ {totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Frete</span>
                      <span className="text-muted-foreground">
                        Calculado no checkout
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Checkout Button */}
                  <Button
                    size="lg"
                    className="w-full gap-2"
                    disabled={!isPackageComplete}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {isPackageComplete
                      ? "Finalizar Pedido"
                      : `Faltam ${remainingWeight}g`}
                  </Button>

                  {!isPackageComplete && selectedProducts.length > 0 && (
                    <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <AlertCircle className="h-3 w-3" />
                      Complete o pacote para continuar
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
