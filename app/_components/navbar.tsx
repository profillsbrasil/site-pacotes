"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
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

const categories = [
  {
    title: "Castanhas",
    href: "/todos-produtos?categoria=castanhas",
    description: "Castanha de caju, pará, macadâmia e mais",
  },
  {
    title: "Amêndoas",
    href: "/todos-produtos?categoria=amendoas",
    description: "Amêndoas torradas, laminadas e naturais",
  },
  {
    title: "Sementes",
    href: "/todos-produtos?categoria=sementes",
    description: "Chia, linhaça, girassol e abóbora",
  },
  {
    title: "Frutas Secas",
    href: "/todos-produtos?categoria=frutas-secas",
    description: "Damasco, uva passa, cranberry e mais",
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "w-full fixed top-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-transparent backdrop-blur-none"
          : "bg-transparent backdrop-blur-none"
      )}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-end gap-0.5 group">
            <motion.span
              className="text-xl lg:text-2xl font-bold uppercase tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              DuNort
            </motion.span>
            <motion.span
              className="text-primary text-3xl lg:text-4xl font-bold leading-none"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              .
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList
              className={cn(
                isScrolled
                  ? "bg-white/60 backdrop-blur-md rounded-full px-1.5 py-1 shadow-sm border border-border/20"
                  : "bg-transparent backdrop-blur-none rounded-full px-1.5 py-1 shadow-none border border-transparent"
              )}
            >
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Produtos
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid  p-4 w-[400px] md:w-[500px] lg:w-[550px] md:grid-cols-2">
                    <li className="row-span-4 pr-4">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/todos-produtos"
                          className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-linear-to-b from-primary/20 to-primary/40 p-6 no-underline outline-none transition-all hover:shadow-md focus:shadow-md"
                        >
                          <div className="mb-2 text-lg font-semibold text-foreground">
                            Todos Produtos
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore nossa seleção completa de ingredientes para
                            seu mix personalizado.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {categories.map((category) => (
                      <ListItem
                        key={category.title}
                        title={category.title}
                        href={category.href}
                      >
                        {category.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/todos-produtos">Catálogo</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/contato">Contato</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              asChild
              variant="default"
              className="hidden lg:inline-flex rounded-full px-6 font-medium shadow-sm"
            >
              <Link href="/montar-mix">Monte seu Mix</Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  href: string;
}

function ListItem({
  title,
  children,
  href,
  className,
  ...props
}: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block flex-col justify-center items-start select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
