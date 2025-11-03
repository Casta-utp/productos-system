import { ProductForm } from "@/components/product-form"
import { ProtectedRoute } from "@/components/protected-route"

export default function NewProductPage() {
  return (
    <ProtectedRoute>
      <ProductForm />
    </ProtectedRoute>
  )
}
