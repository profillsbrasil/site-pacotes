"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  produtos: [
    { label: "Castanhas", href: "/todos-produtos?categoria=castanhas" },
    { label: "Amêndoas", href: "/todos-produtos?categoria=amendoas" },
    { label: "Sementes", href: "/todos-produtos?categoria=sementes" },
    { label: "Frutas Secas", href: "/todos-produtos?categoria=frutas-secas" },
  ],
  empresa: [
    { label: "Sobre nós", href: "#" },
    { label: "Como funciona", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contato", href: "/contato" },
  ],
  suporte: [
    { label: "FAQ", href: "#" },
    { label: "Entregas", href: "#" },
    { label: "Política de privacidade", href: "#" },
    { label: "Termos de uso", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">DuNort</span>
              <span className="text-3xl font-bold text-amber-500">.</span>
            </Link>
            <p className="mt-4 text-background/70 max-w-sm">
              Sua dose certa de saúde. Monte seu mix personalizado de castanhas, 
              amêndoas e frutas secas do seu jeito.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@dunort.com"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2">
              {footerLinks.produtos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/70">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Mail className="w-4 h-4" />
                <span>contato@dunort.com</span>
              </li>
              <li className="flex items-start gap-2 text-background/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} DuNort. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-background/60 hover:text-background text-sm transition-colors">
                Privacidade
              </Link>
              <Link href="#" className="text-background/60 hover:text-background text-sm transition-colors">
                Termos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
