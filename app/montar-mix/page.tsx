"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, products, type Product } from "@/lib/products-data";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Info,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Schema
const customerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  notes: z.string().optional(),
});

type CustomerData = z.infer<typeof customerSchema>;

interface MixItem {
  product: Product;
  quantity: number;
}

const MIN_WEIGHT = 100;
const MAX_WEIGHT = 5000;
const STEP = 50;

export default function MontarMixPage() {
  const [mixItems, setMixItems] = useState<MixItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CustomerData>({
    resolver: zodResolver(customerSchema),
  });

  const watchedName = watch("name");

  // Totals
  const { totalWeight, totalPrice, itemCount } = useMemo(() => {
    const weight = mixItems.reduce((sum, item) => sum + item.quantity, 0);
    const price = mixItems.reduce(
      (sum, item) =>
        sum + (item.product.price / item.product.weight) * item.quantity,
      0
    );
    return {
      totalWeight: weight,
      totalPrice: price,
      itemCount: mixItems.length,
    };
  }, [mixItems]);

  const addToMix = useCallback((product: Product) => {
    setMixItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + STEP }
            : item
        );
      }
      toast.success(`${product.name} adicionado ao mix!`);
      return [...prev, { product, quantity: STEP }];
    });
  }, []);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setMixItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );
      return;
    }
    setMixItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const onSubmit = async (data: CustomerData) => {
    if (totalWeight < MIN_WEIGHT) {
      toast.error(`O peso mínimo é de ${MIN_WEIGHT}g`);
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setShowSuccessDialog(true);
    setMixItems([]);
    reset();
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-primary mb-4 block">
              Ateliê de Personalização
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
              Crie seu{" "}
              <span className="italic font-normal text-secondary">
                Mix Único
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-muted-foreground text-sm max-w-xs font-light"
          >
            Selecione seus ingredientes favoritos. Cada grama é escolhida por
            você para criar o equilíbrio perfeito.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Selection Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-full sm:w-72 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar ingrediente..."
                  className="w-full bg-stone-50 border-b border-stone-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary transition-all font-light"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="w-full"
              >
                <TabsList className="bg-transparent border-b border-stone-100 w-full justify-start h-auto p-0 gap-6">
                  <TabsTrigger
                    value="all"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3 text-xs uppercase tracking-widest font-semibold text-stone-400 data-[state=active]:text-foreground"
                  >
                    Todos
                  </TabsTrigger>
                  {categories.map((cat) => (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3 text-xs uppercase tracking-widest font-semibold text-stone-400 data-[state=active]:text-foreground"
                    >
                      {cat.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Grid de Ingredientes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const inMix = mixItems.find(
                    (item) => item.product.id === product.id
                  );
                  return (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => addToMix(product)}
                      className={cn(
                        "group cursor-pointer rounded-2xl border transition-all duration-500 overflow-hidden",
                        inMix
                          ? "bg-primary/5 border-primary/20 shadow-sm"
                          : "bg-white border-stone-100 hover:border-primary/20 hover:shadow-lg"
                      )}
                    >
                      <div className="relative aspect-square overflow-hidden bg-stone-50">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {inMix && (
                          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center backdrop-blur-[2px]">
                            <div className="bg-white px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-primary" />
                              <span className="text-xs font-bold">
                                {inMix.quantity}g
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                          R$ {(product.price / product.weight).toFixed(2)} / g
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar: Summary & Checkout */}
          <div className="lg:col-span-4 sticky top-32 space-y-6">
            <Card className="rounded-3xl border-none shadow-premium bg-stone-50/50 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-serif font-bold">
                    Seu Mix Personalizado
                  </h3>
                  {itemCount > 0 && (
                    <button
                      onClick={() => setMixItems([])}
                      className="text-stone-400 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {itemCount === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-6 h-6 text-stone-300" />
                    </div>
                    <p className="text-sm text-stone-400 font-light">
                      Seu pote está vazio.
                      <br />
                      Selecione ingredientes à esquerda.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-4">
                        {mixItems.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center gap-4 group/item"
                          >
                            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-stone-100">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-sm font-medium truncate">
                                {item.product.name}
                              </h5>
                              <p className="text-xs text-stone-400">
                                R${" "}
                                {(
                                  (item.product.price / item.product.weight) *
                                  item.quantity
                                )
                                  .toFixed(2)
                                  .replace(".", ",")}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - STEP
                                  )
                                }
                                className="w-6 h-6 flex items-center justify-center hover:text-primary"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold w-8 text-center">
                                {item.quantity}g
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + STEP
                                  )
                                }
                                className="w-6 h-6 flex items-center justify-center hover:text-primary"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <Separator className="bg-stone-200" />

                    {/* Totals & Progress */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-stone-400">
                          <span>Capacidade do Pote</span>
                          <span>
                            {totalWeight}g / {MAX_WEIGHT}g
                          </span>
                        </div>
                        <div className="h-1 w-full bg-stone-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-secondary"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(totalWeight / MAX_WEIGHT) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-stone-500">
                          Valor Estimado
                        </span>
                        <span className="text-2xl font-serif font-bold text-primary">
                          R$ {totalPrice.toFixed(2).replace(".", ",")}
                        </span>
                      </div>

                      {totalWeight < MIN_WEIGHT && (
                        <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl">
                          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-[10px] leading-tight text-amber-700">
                            Adicione pelo menos {MIN_WEIGHT}g para prosseguir
                            com sua encomenda artesanal.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Checkout Form Card */}
            {itemCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="rounded-3xl border-none shadow-premium p-8">
                  <h4 className="text-lg font-serif font-bold mb-6">
                    Finalizar Encomenda
                  </h4>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-[10px] uppercase tracking-[0.2em] text-stone-400"
                      >
                        Nome Completo
                      </Label>
                      <Input
                        {...register("name")}
                        id="name"
                        className="bg-stone-50 border-none rounded-xl"
                        placeholder="Ex: Maria Silva"
                      />
                      {errors.name && (
                        <p className="text-[10px] text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="phone"
                        className="text-[10px] uppercase tracking-[0.2em] text-stone-400"
                      >
                        WhatsApp
                      </Label>
                      <Input
                        {...register("phone")}
                        id="phone"
                        className="bg-stone-50 border-none rounded-xl"
                        placeholder="(11) 99999-9999"
                      />
                      {errors.phone && (
                        <p className="text-[10px] text-destructive">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full h-12 bg-primary text-primary-foreground hover:scale-[1.02] transition-all shadow-lg"
                      disabled={isSubmitting || totalWeight < MIN_WEIGHT}
                    >
                      {isSubmitting ? "Processando..." : "Confirmar Mix"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md rounded-3xl border-none">
          <DialogHeader className="items-center text-center">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-secondary" />
            </div>
            <DialogTitle className="text-3xl font-serif font-bold">
              Pedido Enviado!
            </DialogTitle>
            <DialogDescription className="text-base font-light text-stone-500 pt-2">
              Obrigado, {watchedName}! Seu mix personalizado já está sendo
              preparado com todo o carinho em nosso ateliê. Entraremos em
              contato via WhatsApp em breve.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              className="flex-1 rounded-full border-stone-200"
              onClick={() => setShowSuccessDialog(false)}
            >
              Ver Mix
            </Button>
            <Button asChild className="flex-1 rounded-full bg-primary">
              <Link href="/">Voltar à Home</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
