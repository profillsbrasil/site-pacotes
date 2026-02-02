"use client";

import Link from "next/link";
import { Instagram, Twitter, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-stone/20 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-1 mb-8">
              <span className="text-3xl font-serif font-bold tracking-tight">
                DuNort
              </span>
              <span className="w-2 h-2 rounded-full bg-primary" />
            </Link>
            <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-sm mb-12">
              Elevando a nutrição diária através da curadoria cuidadosa e personalização artesanal. A natureza entregue com sofisticação.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-stone-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:hello@dunort.com" className="text-stone-400 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 mb-8">Explorar</h4>
            <ul className="space-y-4">
              {["Produtos", "Monte seu Mix", "Categorias", "Catálogo"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 mb-8">Empresa</h4>
            <ul className="space-y-4">
              {["Nossa Origem", "Como Funciona", "Compromisso", "Contato"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/40 mb-8">Newsletter</h4>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Assine para receber convites exclusivos e novidades sobre nossas safras.
            </p>
            <div className="flex border-b border-stone/20 pb-2 group focus-within:border-primary transition-colors">
              <input 
                type="email" 
                placeholder="Seu email" 
                className="bg-transparent text-sm w-full outline-none"
              />
              <button className="text-stone-400 group-hover:text-primary transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-stone/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-stone-400">
            © {new Date().getFullYear()} DuNort Organic Luxury. 
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-primary transition-colors">Privacidade</Link>
            <Link href="#" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-primary transition-colors">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
