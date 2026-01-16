export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  category: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
}

export const categories = [
  { id: "castanhas", name: "Castanhas", emoji: "🌰" },
  { id: "amendoas", name: "Amêndoas", emoji: "🥜" },
  { id: "sementes", name: "Sementes", emoji: "🌻" },
  { id: "frutas-secas", name: "Frutas Secas", emoji: "🍇" },
  { id: "graos", name: "Grãos", emoji: "🌾" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const products: Product[] = [
  // Castanhas
  {
    id: "castanha-caju-torrada",
    name: "Castanha de Caju Torrada",
    description: "Castanha de caju torrada sem sal, crocante e saborosa",
    price: 89.9,
    weight: 500,
    category: "castanhas",
    image: "/assets/products/castanha-caju.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "castanha-para",
    name: "Castanha do Pará",
    description: "Rica em selênio, direto da Amazônia brasileira",
    price: 79.9,
    weight: 500,
    category: "castanhas",
    image: "/assets/products/castanha-para.jpg",
    inStock: true,
  },
  {
    id: "macadamia",
    name: "Macadâmia",
    description: "Noz macadâmia premium, levemente torrada",
    price: 129.9,
    weight: 500,
    category: "castanhas",
    image: "/assets/products/macadamia.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "noz-pecan",
    name: "Noz Pecan",
    description: "Nozes pecan selecionadas, sabor amanteigado",
    price: 99.9,
    weight: 500,
    category: "castanhas",
    image: "/assets/products/noz-pecan.jpg",
    inStock: true,
  },

  // Amêndoas
  {
    id: "amendoa-natural",
    name: "Amêndoa Natural",
    description: "Amêndoas cruas com pele, sem adição de sal",
    price: 69.9,
    weight: 500,
    category: "amendoas",
    image: "/assets/products/amendoa-natural.jpg",
    inStock: true,
  },
  {
    id: "amendoa-torrada",
    name: "Amêndoa Torrada",
    description: "Amêndoas torradas e levemente salgadas",
    price: 74.9,
    weight: 500,
    category: "amendoas",
    image: "/assets/products/amendoa-torrada.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "amendoa-laminada",
    name: "Amêndoa Laminada",
    description: "Amêndoas fatiadas, perfeitas para receitas",
    price: 79.9,
    weight: 500,
    category: "amendoas",
    image: "/assets/products/amendoa-laminada.jpg",
    inStock: true,
  },

  // Sementes
  {
    id: "semente-chia",
    name: "Semente de Chia",
    description: "Super alimento rico em ômega 3 e fibras",
    price: 39.9,
    weight: 500,
    category: "sementes",
    image: "/assets/products/chia.jpg",
    inStock: true,
  },
  {
    id: "semente-linhaca",
    name: "Linhaça Dourada",
    description: "Linhaça dourada, fonte de ômega 3",
    price: 29.9,
    weight: 500,
    category: "sementes",
    image: "/assets/products/linhaca.jpg",
    inStock: true,
  },
  {
    id: "semente-girassol",
    name: "Semente de Girassol",
    description: "Sementes de girassol descascadas e torradas",
    price: 34.9,
    weight: 500,
    category: "sementes",
    image: "/assets/products/girassol.jpg",
    inStock: true,
  },
  {
    id: "semente-abobora",
    name: "Semente de Abóbora",
    description: "Sementes de abóbora torradas, ricas em zinco",
    price: 44.9,
    weight: 500,
    category: "sementes",
    image: "/assets/products/abobora.jpg",
    inStock: true,
    featured: true,
  },

  // Frutas Secas
  {
    id: "damasco",
    name: "Damasco Seco",
    description: "Damascos secos premium, macios e doces",
    price: 59.9,
    weight: 500,
    category: "frutas-secas",
    image: "/assets/products/damasco.jpg",
    inStock: true,
  },
  {
    id: "uva-passa",
    name: "Uva Passa Preta",
    description: "Uvas passas escuras, sem sementes",
    price: 29.9,
    weight: 500,
    category: "frutas-secas",
    image: "/assets/products/uva-passa.jpg",
    inStock: true,
  },
  {
    id: "cranberry",
    name: "Cranberry Desidratada",
    description: "Cranberries desidratadas, sabor único",
    price: 69.9,
    weight: 500,
    category: "frutas-secas",
    image: "/assets/products/cranberry.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "goji-berry",
    name: "Goji Berry",
    description: "Super fruta antioxidante do Himalaia",
    price: 89.9,
    weight: 500,
    category: "frutas-secas",
    image: "/assets/products/goji-berry.jpg",
    inStock: true,
  },

  // Grãos
  {
    id: "aveia-flocos",
    name: "Aveia em Flocos",
    description: "Aveia em flocos finos, rica em fibras",
    price: 19.9,
    weight: 500,
    category: "graos",
    image: "/assets/products/aveia.jpg",
    inStock: true,
  },
  {
    id: "granola-natural",
    name: "Granola Natural",
    description: "Granola artesanal com mel e canela",
    price: 34.9,
    weight: 500,
    category: "graos",
    image: "/assets/products/granola.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "quinoa",
    name: "Quinoa em Grãos",
    description: "Quinoa branca em grãos, proteína completa",
    price: 49.9,
    weight: 500,
    category: "graos",
    image: "/assets/products/quinoa.jpg",
    inStock: true,
  },
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
}
