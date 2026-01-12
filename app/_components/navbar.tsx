"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Leaf, Package, Nut, Cherry, Wheat, Blend } from "lucide-react";

const categories = [
  {
    title: "Castanhas e Nozes",
    href: "/monte-seu-pacote?categoria=castanhas",
    description: "Castanha-do-Pará, caju, nozes, amêndoas e avelãs",
    icon: Nut,
  },
  {
    title: "Grãos e Sementes",
    href: "/monte-seu-pacote?categoria=graos",
    description: "Chia, linhaça, quinoa, gergelim e muito mais",
    icon: Wheat,
  },
  {
    title: "Frutas Secas",
    href: "/monte-seu-pacote?categoria=frutas",
    description: "Damasco, uva passa, banana e maçã desidratada",
    icon: Cherry,
  },
  {
    title: "Mix e Granolas",
    href: "/monte-seu-pacote?categoria=mix",
    description: "Mixes prontos, granolas artesanais e cereais",
    icon: Blend,
  },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href.split("?")[0]);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            NaturalBox
          </span>
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className={navigationMenuTriggerStyle({
                    active: isActive("/"),
                  })}
                >
                  Início
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                  {categories.map((category) => (
                    <li key={category.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={category.href}
                          className={cn(
                            "flex flex-col select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <category.icon className="h-4 w-4 text-primary" />
                            <div className="text-sm font-medium leading-none">
                              {category.title}
                            </div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {category.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/parceiros"
                  className={navigationMenuTriggerStyle({
                    active: isActive("/parceiros"),
                  })}
                >
                  Parceiros
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contato"
                  className={navigationMenuTriggerStyle({
                    active: isActive("/contato"),
                  })}
                >
                  Contato
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <Button asChild variant="default" size="lg">
          <Link href="/monte-seu-pacote" className="gap-2">
            <Package className="h-5 w-5" />
            Monte seu Pacote
          </Link>
        </Button>
      </div>
    </header>
  );
}
