import { Card, CardContent } from "@/components/ui/card"
import { Building2, Handshake, Award, Users } from "lucide-react"

const partners = [
  {
    name: "Fazenda Santa Clara",
    description: "Produtora de castanhas premium do Pará",
    category: "Produtor",
  },
  {
    name: "Grãos do Vale",
    description: "Cooperativa de produtores de grãos orgânicos",
    category: "Cooperativa",
  },
  {
    name: "Secagem Natural",
    description: "Especialistas em frutas desidratadas artesanais",
    category: "Fornecedor",
  },
  {
    name: "EcoEmbalagens",
    description: "Embalagens sustentáveis e biodegradáveis",
    category: "Embalagens",
  },
  {
    name: "Transportes Verdes",
    description: "Logística com frota de baixa emissão",
    category: "Logística",
  },
  {
    name: "Certificadora Orgânica BR",
    description: "Certificação de produtos orgânicos",
    category: "Certificação",
  },
]

const stats = [
  {
    number: "20+",
    label: "Parceiros",
    icon: Handshake,
  },
  {
    number: "50+",
    label: "Produtores",
    icon: Users,
  },
  {
    number: "100%",
    label: "Certificados",
    icon: Award,
  },
  {
    number: "5",
    label: "Estados",
    icon: Building2,
  },
]

export default function ParceirosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              Nossos Parceiros
            </h1>
            <p className="text-lg text-muted-foreground">
              Trabalhamos com produtores e fornecedores comprometidos com a
              qualidade, sustentabilidade e comércio justo. Juntos, levamos o
              melhor da natureza até você.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {stat.number}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Conheça quem faz parte dessa rede
            </h2>
            <p className="text-muted-foreground">
              Cada parceiro é cuidadosamente selecionado para garantir a
              qualidade que você merece.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <Card key={partner.name} className="transition-all hover:shadow-md">
                <CardContent className="p-6">
                  {/* Logo placeholder */}
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-muted">
                    <Building2 className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {partner.category}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Quer ser nosso parceiro?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Se você é produtor, fornecedor ou empresa e compartilha dos
              nossos valores de qualidade e sustentabilidade, entre em contato
              conosco.
            </p>
            <a
              href="/contato"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
