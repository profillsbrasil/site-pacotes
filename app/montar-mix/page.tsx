"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories, type Product } from "@/lib/products-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Scale,
  Check,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MixItem {
  product: Product;
  quantity: number; // in grams
}

const MIN_PACKAGE_WEIGHT = 100; // grams
const MAX_PACKAGE_WEIGHT = 5000; // grams
const PACKAGE_SIZES = [
  { label: "P", weight: 250, price: 0 },
  { label: "M", weight: 500, price: 0 },
  { label: "G", weight: 1000, price: 0 },
  { label: "XG", weight: 2000, price: 0 },
];

export default function MontarMixPage() {
  const [mixItems, setMixItems] = useState<MixItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("dunort-mix");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMixItems(parsed.items || []);
        setCustomerName(parsed.customerName || "");
        setCustomerPhone(parsed.customerPhone || "");
        setCustomerEmail(parsed.customerEmail || "");
        setNotes(parsed.notes || "");
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem(
      "dunort-mix",
      JSON.stringify({
        items: mixItems,
        customerName,
        customerPhone,
        customerEmail,
        notes,
      })
    );
  }, [mixItems, customerName, customerPhone, customerEmail, notes]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const totalWeight = useMemo(
    () => mixItems.reduce((sum, item) => sum + item.quantity, 0),
    [mixItems]
  );

  const totalPrice = useMemo(
    () =>
      mixItems.reduce(
        (sum, item) => sum + (item.product.price / item.product.weight) * item.quantity,
        0
      ),
    [mixItems]
  );

  const addToMix = (product: Product) => {
    setMixItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 50 }
            : item
        );
      }
      return [...prev, { product, quantity: 50 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromMix(productId);
      return;
    }
    setMixItems((prev) =>
      prev.map((item) =
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromMix = (productId: string) => {
    setMixItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearMix = () => {
    setMixItems([]);
  };

  const handleSubmitOrder = () => {
    // Here you would send to backend
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const canSubmit =
    totalWeight >= MIN_PACKAGE_WEIGHT &&
    customerName.trim() &&
    (customerPhone.trim() || customerEmail.trim());

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Monte seu Mix
          </h1>
          <p className="text-muted-foreground">
            Escolha seus ingredientes favoritos e monte o mix perfeito para você
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Ingredientes
                  </CardTitle>
                  <Input
                    placeholder="Buscar produto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {/* Category Tabs */}
                <Tabs
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  className="mb-6"
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

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => {
                    const inMix = mixItems.find(
                      (item) => item.product.id === product.id
                    );
                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          inMix
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => addToMix(product)}
                      >
                        <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          {inMix && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <Badge className="bg-primary text-white">
                                {inMix.quantity}g
                              </Badge>
                            </div>
                          )}
                        </div>
                        <h4 className="font-medium text-sm truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          R$ {product.price.toFixed(2).replace(".", ",")} / {product.weight}g
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
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
                    {mixItems.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearMix}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mixItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Seu mix está vazio</p>
                      <p className="text-sm">Clique nos produtos para adicionar</p>
                    </div>
                  ) : (
                    <>
                      <ScrollArea className="h-64 mb-4">
                        <div className="space-y-3">
                          {mixItems.map((item) => (
                            <div
                              key={item.product.id}
                              className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                            >
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.product.image}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">
                                  {item.product.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  R${" "}
                                  {(
                                    (item.product.price / item.product.weight) *
                                    item.quantity
                                  )
                                    .toFixed(2)
                                    .replace(".", ",")}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 50
                                    )
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
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 50
                                    )
                                  }
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      <Separator />

                      {/* Totals */}
                      <div className="pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Peso total:</span>
                          <span className="font-medium">{totalWeight}g</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-primary">
                            R$ {totalPrice.toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Customer Form */}
              {mixItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Dados para Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome *</Label>
                      <Input
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">WhatsApp *</Label>
                      <Input
                        id="phone"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Observações</Label>
                      <Input
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Alguma observação especial?"
                      />
                    </div>

                    {totalWeight < MIN_PACKAGE_WEIGHT && (
                      <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                        <AlertCircle className="w-4 h-4" />
                        <span>
                          Mínimo de {MIN_PACKAGE_WEIGHT}g para pedido
                        </span>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      size="lg"
                      disabled={!canSubmit}
                      onClick={handleSubmitOrder}
                    >
                      {canSubmit ? (
                        <>
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Fazer Pedido
                        </>
                      ) : (
                        "Preencha seus dados"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Pedido Recebido!</h2>
              <p className="text-muted-foreground mb-6">
                Obrigado, {customerName}! Entraremos em contato em breve para confirmar seu pedido.
              </p>
              <Button onClick={() => setShowSuccess(false)} className="w-full">
                Fechar
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
