"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { categories, products, type Product } from "@/lib/products-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Info,
  Minus,
  Package,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Schema de validação
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

const MIN_PACKAGE_WEIGHT = 100;
const MAX_PACKAGE_WEIGHT = 5000;
const QUANTITY_STEP = 50;

// Preço por grama
const calculatePricePerGram = (product: Product): number =>
  product.price / product.weight;

// Formatar preço
const formatPrice = (price: number): string =>
  `R$ ${price.toFixed(2).replace(".", ",")}`;

export default function MontarMixPage() {
  const [mixItems, setMixItems] = useState<MixItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form
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

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dunort-mix");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMixItems(parsed.items || []);
        reset({
          name: parsed.customerName || "",
          phone: parsed.customerPhone || "",
          email: parsed.customerEmail || "",
          notes: parsed.notes || "",
        });
      } catch {
        toast.error("Erro ao carregar mix salvo");
      }
    }
  }, [reset]);

  // Save to localStorage
  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem(
        "dunort-mix",
        JSON.stringify({
          items: mixItems,
          customerName: data.name || "",
          customerPhone: data.phone || "",
          customerEmail: data.email || "",
          notes: data.notes || "",
        })
      );
    });
    return () => subscription.unsubscribe();
  }, [mixItems, watch]);

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  // Totais memoizados
  const { totalWeight, totalPrice, itemCount } = useMemo(() => {
    const weight = mixItems.reduce((sum, item) => sum + item.quantity, 0);
    const price = mixItems.reduce(
      (sum, item) => sum + calculatePricePerGram(item.product) * item.quantity,
      0
    );
    return {
      totalWeight: weight,
      totalPrice: price,
      itemCount: mixItems.length,
    };
  }, [mixItems]);

  // Adicionar ao mix
  const addToMix = useCallback((product: Product) => {
    setMixItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        toast.info(`${product.name} já está no mix! Quantidade aumentada.`);
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + QUANTITY_STEP }
            : item
        );
      }
      toast.success(`${product.name} adicionado ao mix!`);
      return [...prev, { product, quantity: QUANTITY_STEP }];
    });
  }, []);

  // Atualizar quantidade
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setMixItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );
      toast.info("Item removido do mix");
      return;
    }
    if (quantity > MAX_PACKAGE_WEIGHT) {
      toast.error(`Quantidade máxima por item: ${MAX_PACKAGE_WEIGHT}g`);
      return;
    }
    setMixItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  // Remover do mix
  const removeFromMix = useCallback(
    (productId: string, productName: string) => {
      setMixItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );
      toast.info(`${productName} removido do mix`);
    },
    []
  );

  // Limpar mix
  const clearMix = useCallback(() => {
    setMixItems([]);
    toast.info("Mix limpo");
  }, []);

  // Submit do pedido
  const onSubmit = async (data: CustomerData) => {
    if (totalWeight < MIN_PACKAGE_WEIGHT) {
      toast.error(`Mínimo de ${MIN_PACKAGE_WEIGHT}g para fazer pedido`);
      return;
    }

    setIsSubmitting(true);

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccessDialog(true);

    // Limpar após sucesso
    setMixItems([]);
    reset();
    localStorage.removeItem("dunort-mix");
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-cream pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Monte seu Mix
                </h1>
                <p className="text-muted-foreground">
                  Escolha seus ingredientes favoritos e monte o mix perfeito
                </p>
              </div>

              {itemCount > 0 && (
                <Badge
                  variant="secondary"
                  className="w-fit text-base px-4 py-2"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {itemCount} {itemCount === 1 ? "item" : "itens"} •{" "}
                  {totalWeight}g
                </Badge>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Selection */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        Ingredientes
                      </CardTitle>
                      <div className="relative max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar produto..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Category Tabs */}
                    <Tabs
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <TabsList className="flex-wrap h-auto">
                        <TabsTrigger value="all">Todos</TabsTrigger>
                        {categories.map((cat) => (
                          <TabsTrigger key={cat.id} value={cat.id}>
                            {cat.emoji} {cat.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Products Grid */}
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Nenhum produto encontrado</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("all");
                        }}
                      >
                        Limpar filtros
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredProducts.map((product) => {
                        const inMix = mixItems.find(
                          (item) => item.product.id === product.id
                        );
                        return (
                          <ProductCard
                            key={product.id}
                            product={product}
                            inMix={inMix}
                            onClick={() => addToMix(product)}
                          />
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Mix Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Mix Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        Seu Mix
                      </span>
                      {itemCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearMix}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {itemCount === 0 ? (
                      <EmptyMixState />
                    ) : (
                      <>
                        <ScrollArea className="h-64 mb-4">
                          <div className="space-y-3 pr-4">
                            {mixItems.map((item) => (
                              <MixItemRow
                                key={item.product.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeFromMix}
                              />
                            ))}
                          </div>
                        </ScrollArea>

                        <Separator />

                        {/* Totals */}
                        <div className="pt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Peso total:
                            </span>
                            <span className="font-medium">{totalWeight}g</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-primary">
                              {formatPrice(totalPrice)}
                            </span>
                          </div>
                          {totalWeight < MIN_PACKAGE_WEIGHT && (
                            <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                              <AlertCircle className="w-4 h-4 flex-shrink-0" />
                              <span>Mínimo: {MIN_PACKAGE_WEIGHT}g</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Customer Form */}
                {itemCount > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Dados para Contato
                      </CardTitle>
                      <CardDescription>
                        Preencha para finalizar seu pedido
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="name">Nome completo *</Label>
                          <Input
                            id="name"
                            {...register("name")}
                            placeholder="Seu nome"
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone">WhatsApp *</Label>
                          <Input
                            id="phone"
                            {...register("phone")}
                            placeholder="(11) 99999-9999"
                            className={errors.phone ? "border-destructive" : ""}
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="email">Email (opcional)</Label>
                          <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="seu@email.com"
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="notes">Observações</Label>
                          <Input
                            id="notes"
                            {...register("notes")}
                            placeholder="Alguma observação especial?"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          size="lg"
                          disabled={
                            isSubmitting || totalWeight < MIN_PACKAGE_WEIGHT
                          }
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Enviando...
                            </>
                          ) : totalWeight < MIN_PACKAGE_WEIGHT ? (
                            <>
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Mínimo {MIN_PACKAGE_WEIGHT}g
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Fazer Pedido
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <DialogTitle className="text-center text-2xl">
                Pedido Recebido!
              </DialogTitle>
              <DialogDescription className="text-center">
                Obrigado, {watchedName || "cliente"}! Entraremos em contato em
                breve para confirmar seu pedido.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowSuccessDialog(false)}
              >
                Continuar
              </Button>
              <Button asChild className="flex-1">
                <Link href="/">Voltar à Home</Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

// Componente de produto
function ProductCard({
  product,
  inMix,
  onClick,
}: {
  product: Product;
  inMix?: MixItem;
  onClick: () => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
            inMix
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onClick={onClick}
        >
          <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
            {!imageError ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Package className="w-8 h-8 text-muted-foreground/50" />
              </div>
            )}
            {inMix && (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <Badge className="bg-primary text-white">
                  {inMix.quantity}g
                </Badge>
              </div>
            )}
          </div>
          <h4 className="font-medium text-sm truncate">{product.name}</h4>
          <p className="text-xs text-muted-foreground">
            {formatPrice(product.price)} / {product.weight}g
          </p>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-medium">{product.name}</p>
        <p className="text-xs text-muted-foreground">{product.description}</p>
      </TooltipContent>
    </Tooltip>
  );
}

// Componente de item no mix
function MixItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: MixItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string, name: string) => void;
}) {
  const [imageError, setImageError] = useState(false);
  const itemTotal = calculatePricePerGram(item.product) * item.quantity;

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
        {!imageError ? (
          <Image
            src={item.product.image}
            alt={item.product.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-5 h-5 text-muted-foreground/50" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{item.product.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatPrice(itemTotal)}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() =>
            onUpdateQuantity(item.product.id, item.quantity - QUANTITY_STEP)
          }
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="text-sm font-medium w-12 text-center">
          {item.quantity}g
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() =>
            onUpdateQuantity(item.product.id, item.quantity + QUANTITY_STEP)
          }
        >
          <Plus className="w-3 h-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive"
          onClick={() => onRemove(item.product.id, item.product.name)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

// Estado vazio do mix
function EmptyMixState() {
  return (
    <div className="text-center py-8 text-muted-foreground">
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
        <ShoppingBag className="w-6 h-6 opacity-50" />
      </div>
      <p className="font-medium">Seu mix está vazio</p>
      <p className="text-sm mt-1">Clique nos produtos para começar</p>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground justify-center">
        <Info className="w-3 h-3" />
        <span>Mínimo 100g para pedido</span>
      </div>
    </div>
  );
}
