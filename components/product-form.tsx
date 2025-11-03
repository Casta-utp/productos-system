"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type Product, createProduct, updateProduct } from "@/lib/products"

interface ProductFormProps {
  product?: Product
  isEditing?: boolean
}

const CATEGORIES = ["lácteos", "frutas", "verduras", "carnes", "snacks", "bebidas"] as const

export function ProductForm({ product, isEditing = false }: ProductFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: product?.nombre || "",
    categoria: product?.categoria || ("lácteos" as const),
    precio: product?.precio.toString() || "",
    cantidad: product?.cantidad.toString() || "",
    fechaIngreso: product?.fechaIngreso || new Date().toISOString().split("T")[0],
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      setError("El nombre del producto es requerido")
      return false
    }
    if (!formData.precio || Number.parseFloat(formData.precio) <= 0) {
      setError("El precio debe ser mayor a 0")
      return false
    }
    if (!formData.cantidad || Number.parseInt(formData.cantidad) < 0) {
      setError("La cantidad no puede ser negativa")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const productData = {
        nombre: formData.nombre.trim(),
        categoria: formData.categoria,
        precio: Number.parseFloat(formData.precio),
        cantidad: Number.parseInt(formData.cantidad),
        fechaIngreso: formData.fechaIngreso,
      }

      if (isEditing && product) {
        updateProduct(product.id, productData)
      } else {
        createProduct(productData)
      }

      router.push("/dashboard")
    } catch (err) {
      setError("Error al guardar el producto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.back()} className="mb-4 rounded-md">
            ← Volver
          </Button>
          <h1 className="text-3xl font-bold mb-2">{isEditing ? "Editar producto" : "Agregar producto"}</h1>
          <p className="text-muted-foreground">
            {isEditing ? "Modifica los datos del producto" : "Registra un nuevo producto en el sistema"}
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-xl">{isEditing ? "Editar producto" : "Nuevo producto"}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-medium">
                  Nombre del producto *
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ej: Leche Entera"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={loading}
                  className="rounded-md"
                />
              </div>

              {/* Categoría */}
              <div className="space-y-2">
                <label htmlFor="categoria" className="text-sm font-medium">
                  Categoría *
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Precio y Cantidad - Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="precio" className="text-sm font-medium">
                    Precio (COP) *
                  </label>
                  <Input
                    id="precio"
                    name="precio"
                    type="number"
                    placeholder="0"
                    value={formData.precio}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-md"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cantidad" className="text-sm font-medium">
                    Cantidad en Stock *
                  </label>
                  <Input
                    id="cantidad"
                    name="cantidad"
                    type="number"
                    placeholder="0"
                    value={formData.cantidad}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-md"
                  />
                </div>
              </div>

              {/* Fecha de Ingreso */}
              <div className="space-y-2">
                <label htmlFor="fechaIngreso" className="text-sm font-medium">
                  Fecha de Ingreso *
                </label>
                <Input
                  id="fechaIngreso"
                  name="fechaIngreso"
                  type="date"
                  value={formData.fechaIngreso}
                  onChange={handleChange}
                  disabled={loading}
                  className="rounded-md"
                />
              </div>

              {/* Error Message */}
              {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">{error}</div>}

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button type="submit" disabled={loading} className="flex-1 rounded-md">
                  {loading ? "Guardando..." : "Guardar cambios"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  disabled={loading}
                  className="flex-1 rounded-md"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
