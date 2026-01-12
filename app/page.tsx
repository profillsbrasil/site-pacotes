import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Truck,
  Heart,
  Nut,
  Wheat,
  Cherry,
  Blend,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Leaf,
} from "lucide-react";

const categories = [
  {
    title: "Castanhas e Nozes",
    description: "Castanha-do-Pará, caju, nozes, amêndoas, avelãs e muito mais",
    icon: Nut,
    href: "/monte-seu-pacote?categoria=castanhas",
  },
  {
    title: "Grãos e Sementes",
    description:
      "Chia, linhaça, quinoa, gergelim, girassol e sementes variadas",
    icon: Wheat,
    href: "/monte-seu-pacote?categoria=graos",
  },
  {
    title: "Frutas Secas",
    description: "Damasco, uva passa, banana, maçã, manga desidratada",
    icon: Cherry,
    href: "/monte-seu-pacote?categoria=frutas",
  },
  {
    title: "Mix e Granolas",
    description: "Mixes exclusivos, granolas artesanais e cereais integrais",
    icon: Blend,
    href: "/monte-seu-pacote?categoria=mix",
  },
];

const steps = [
  {
    number: "01",
    title: "Escolha o tamanho",
    description:
      "Selecione o tamanho do seu pacote: 100g, 250g, 500g ou 1kg conforme sua necessidade.",
    icon: Package,
  },
  {
    number: "02",
    title: "Monte seu mix",
    description:
      "Escolha os produtos e defina a quantidade de cada um. Você decide a combinação perfeita.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Receba em casa",
    description:
      "Seu pacote personalizado é preparado com carinho e entregue fresquinho na sua porta.",
    icon: Truck,
  },
];

const benefits = [
  {
    title: "100% Natural",
    description: "Produtos selecionados sem conservantes ou aditivos químicos",
    icon: Leaf,
  },
  {
    title: "Qualidade Garantida",
    description: "Rigoroso controle de qualidade em todos os produtos",
    icon: ShieldCheck,
  },
  {
    title: "Feito com Amor",
    description: "Cada pacote é montado com cuidado especialmente para você",
    icon: Heart,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-6xl">
                Monte o pacote <span className="text-primary">perfeito</span>{" "}
                para você
              </h1>
              <p className="text-xl text-muted-foreground">
                Escolha seus produtos naturais favoritos, defina as quantidades
                exatas e receba tudo fresquinho na sua casa. Sem desperdício,
                com todo o sabor.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/monte-seu-pacote" className="gap-2">
                    <Package className="h-5 w-5" />
                    Começar a Montar
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="#como-funciona" className="gap-2 ">
                    Como Funciona
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-linear-to-br from-primary/20 via-accent to-primary/10 p-8">
                <div className="flex h-full w-full items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-card/50">
                  <div className="text-center">
                    <Package className="mx-auto h-24 w-24 text-primary/40" />
                    <p className="mt-4 text-muted-foreground">
                      Imagem do produto
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -left-4 top-8 rounded-2xl bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Sustentável</p>
                    <p className="text-sm text-muted-foreground">
                      Embalagem eco
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 bottom-8 rounded-2xl bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Entrega Rápida</p>
                    <p className="text-sm text-muted-foreground">
                      Em até 3 dias
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="border-y border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {benefit.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Explore nossas categorias
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Produtos naturais selecionados com carinho para você. Escolha
              entre diversas opções e monte o pacote ideal.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.title} href={category.href}>
                <Card className="group h-full cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6">
                    {/* Image placeholder */}
                    <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-linear-to-br from-primary/10 to-accent/50">
                      <div className="flex h-full w-full items-center justify-center">
                        <category.icon className="h-16 w-16 text-primary/40 transition-transform group-hover:scale-110" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary/80 transition-colors group-hover:text-primary">
                      Ver produtos
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="bg-card py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Como funciona
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Montar seu pacote personalizado é simples e rápido. Em apenas 3
              passos você recebe produtos frescos na sua porta.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-16 hidden h-0.5 w-full bg-border md:block" />
                )}
                <div className="relative flex flex-col items-center text-center">
                  <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-12 w-12 text-primary" />
                  </div>
                  <span className="mb-2 text-sm font-bold text-primary">
                    PASSO {step.number}
                  </span>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/monte-seu-pacote" className="gap-2">
                <Package className="h-5 w-5" />
                Começar Agora
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-linear-to-r from-primary to-primary/80 p-12 text-center text-primary-foreground">
            <h2 className="mb-4 text-3xl font-bold">
              Pronto para montar seu pacote?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
              Escolha os produtos, defina as quantidades e receba tudo
              fresquinho na sua casa. É fácil, rápido e personalizado.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/monte-seu-pacote" className="gap-2">
                <Package className="h-5 w-5" />
                Monte seu Pacote
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
