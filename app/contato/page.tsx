"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contato@naturalbox.com.br",
    description: "Resposta em até 24h",
  },
  {
    icon: Phone,
    title: "Telefone",
    value: "(11) 99999-9999",
    description: "Seg a Sex, 9h às 18h",
  },
  {
    icon: MapPin,
    title: "Localização",
    value: "São Paulo, SP",
    description: "Atendemos todo o Brasil",
  },
  {
    icon: Clock,
    title: "Horário",
    value: "Segunda a Sexta",
    description: "9h às 18h",
  },
]

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar envio do formulário
    console.log("Form submitted:", formData)
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      {/* Header */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              Entre em Contato
            </h1>
            <p className="text-lg text-muted-foreground">
              Tem dúvidas, sugestões ou quer saber mais sobre nossos produtos?
              Estamos aqui para ajudar!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-foreground">
                  Informações de Contato
                </h2>
                <p className="text-muted-foreground">
                  Escolha a melhor forma de falar conosco.
                </p>
              </div>

              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{info.title}</p>
                    <p className="text-foreground">{info.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envie sua mensagem</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Seu nome"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Qual o assunto?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Escreva sua mensagem aqui..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Perguntas Frequentes
            </h2>
            <p className="mb-8 text-muted-foreground">
              Algumas dúvidas comuns dos nossos clientes.
            </p>

            <div className="space-y-4 text-left">
              <div className="rounded-lg bg-background p-4">
                <p className="font-semibold text-foreground">
                  Qual o prazo de entrega?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  O prazo varia de 3 a 7 dias úteis, dependendo da sua região.
                </p>
              </div>
              <div className="rounded-lg bg-background p-4">
                <p className="font-semibold text-foreground">
                  Posso alterar meu pedido?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sim, alterações podem ser feitas em até 2 horas após a
                  confirmação.
                </p>
              </div>
              <div className="rounded-lg bg-background p-4">
                <p className="font-semibold text-foreground">
                  Como são embalados os produtos?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Utilizamos embalagens sustentáveis que mantêm a frescura dos
                  produtos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
