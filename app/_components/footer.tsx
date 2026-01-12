import Link from "next/link"
import { Leaf, Instagram, Facebook, Mail } from "lucide-react"

const footerLinks = {
  navegacao: [
    { title: "Início", href: "/" },
    { title: "Monte seu Pacote", href: "/monte-seu-pacote" },
    { title: "Parceiros", href: "/parceiros" },
    { title: "Contato", href: "/contato" },
  ],
  categorias: [
    { title: "Castanhas e Nozes", href: "/monte-seu-pacote?categoria=castanhas" },
    { title: "Grãos e Sementes", href: "/monte-seu-pacote?categoria=graos" },
    { title: "Frutas Secas", href: "/monte-seu-pacote?categoria=frutas" },
    { title: "Mix e Granolas", href: "/monte-seu-pacote?categoria=mix" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                NaturalBox
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Produtos naturais frescos e selecionados, entregues na sua porta.
              Monte seu pacote personalizado com a quantidade ideal para você.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Navegação
            </h3>
            <ul className="space-y-2">
              {footerLinks.navegacao.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Categorias
            </h3>
            <ul className="space-y-2">
              {footerLinks.categorias.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Contato
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contato@naturalbox.com.br</li>
              <li>(11) 99999-9999</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NaturalBox. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
