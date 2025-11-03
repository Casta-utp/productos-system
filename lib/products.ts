// Sistema de gestión de productos en memoria
export interface Product {
  id: string
  nombre: string
  categoria: "lácteos" | "frutas" | "verduras" | "carnes" | "snacks" | "bebidas"
  precio: number
  cantidad: number
  fechaIngreso: string
}

// Base de datos en memoria
const products: Product[] = [
  {
    id: "1",
    nombre: "Leche Entera",
    categoria: "lácteos",
    precio: 3500,
    cantidad: 50,
    fechaIngreso: "2025-01-15",
  },
  {
    id: "2",
    nombre: "Queso Fresco",
    categoria: "lácteos",
    precio: 12000,
    cantidad: 25,
    fechaIngreso: "2025-01-20",
  },
  {
    id: "3",
    nombre: "Manzanas Rojas",
    categoria: "frutas",
    precio: 5000,
    cantidad: 100,
    fechaIngreso: "2025-01-10",
  },
]

export function getAllProducts(): Product[] {
  return [...products]
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function createProduct(product: Omit<Product, "id">): Product {
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
  }
  products.push(newProduct)
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Omit<Product, "id">>): Product | undefined {
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return undefined
  products[index] = { ...products[index], ...updates }
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return false
  products.splice(index, 1)
  return true
}
