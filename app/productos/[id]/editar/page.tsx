"use client"

import { useParams } from "next/navigation"
import { ProductForm } from "@/components/product-form"
import { ProtectedRoute } from "@/components/protected-route"
import { getProductById } from "@/lib/products"

export default function EditProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)

  if (!product) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
            <p className="text-muted-foreground">El producto que buscas no existe</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <ProductForm product={product} isEditing={true} />
    </ProtectedRoute>
  )
}
