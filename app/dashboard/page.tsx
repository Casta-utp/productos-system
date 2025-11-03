"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProtectedRoute } from "@/components/protected-route"
import { ProductsTable } from "@/components/products-table"
import { type Product, getAllProducts, deleteProduct } from "@/lib/products"

export default function DashboardPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar productos
    const loadProducts = () => {
      const allProducts = getAllProducts()
      setProducts(allProducts)
      setLoading(false)
    }

    loadProducts()
  }, [])

  const handleDelete = async (id: string) => {
    deleteProduct(id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Panel de Administración</h1>
                <p className="text-sm text-muted-foreground mt-1">Gestión de productos alimenticios</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="rounded-md bg-transparent">
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Actions Bar */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">Productos Registrados</h2>
              <p className="text-sm text-muted-foreground">Total: {products.length} productos</p>
            </div>
            <Link href="/productos/nuevo">
              <Button className="rounded-md">+ Agregar producto</Button>
            </Link>
          </div>

          {/* Products Card */}
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Cargando productos...</p>
                </div>
              ) : (
                <ProductsTable products={products} onDelete={handleDelete} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
