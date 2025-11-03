"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CategoryBadge } from "./category-badge"
import type { Product } from "@/lib/products"

interface ProductsTableProps {
  products: Product[]
  onDelete: (id: string) => Promise<void>
}

export function ProductsTable({ products, onDelete }: ProductsTableProps) {
  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      await onDelete(id)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No hay productos registrados</p>
        <Link href="/productos/nuevo">
          <Button className="rounded-md">Agregar primer producto</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-secondary">
            <th className="text-left p-4 font-semibold text-sm">Nombre</th>
            <th className="text-left p-4 font-semibold text-sm">Categoría</th>
            <th className="text-right p-4 font-semibold text-sm">Precio</th>
            <th className="text-right p-4 font-semibold text-sm">Stock</th>
            <th className="text-left p-4 font-semibold text-sm">Fecha Ingreso</th>
            <th className="text-center p-4 font-semibold text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
              <td className="p-4 text-sm">{product.nombre}</td>
              <td className="p-4">
                <CategoryBadge category={product.categoria} />
              </td>
              <td className="p-4 text-sm text-right font-medium">{formatCurrency(product.precio)}</td>
              <td className="p-4 text-sm text-right">{product.cantidad} unidades</td>
              <td className="p-4 text-sm text-muted-foreground">{product.fechaIngreso}</td>
              <td className="p-4 text-center space-x-2 flex justify-center">
                <Link href={`/productos/${product.id}/editar`}>
                  <Button variant="outline" size="sm" className="rounded-md bg-transparent">
                    Editar
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)} className="rounded-md">
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
