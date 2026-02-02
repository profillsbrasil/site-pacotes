"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Produtos", href: "/todos-produtos" },
  { title: "Contato", href: "/contato" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full transition-all duration-500",
        isScrolled
          ? "glass py-2 px-6 shadow-premium"
          : "bg-transparent py-4 px-6 shadow-none"
      )}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-2xl font-serif font-bold tracking-tight text-foreground">
            DuNort
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="rounded-full px-6 bg-primary text-primary-foreground hover:opacity-90 transition-opacity hidden sm:flex"
          >
            <Link href="/montar-mix">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Monte seu Mix
            </Link>
          </Button>

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 p-6 glass rounded-3xl lg:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-lg font-medium py-2 border-b border-border/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Button asChild className="w-full rounded-full bg-primary mt-2">
              <Link href="/montar-mix" onClick={() => setIsMobileMenuOpen(false)}>
                Monte seu Mix
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
