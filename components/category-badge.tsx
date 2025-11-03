interface CategoryBadgeProps {
  category: string
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  lácteos: { bg: "bg-blue-50", text: "text-blue-700" },
  frutas: { bg: "bg-green-50", text: "text-green-700" },
  verduras: { bg: "bg-emerald-50", text: "text-emerald-700" },
  carnes: { bg: "bg-red-50", text: "text-red-700" },
  snacks: { bg: "bg-amber-50", text: "text-amber-700" },
  bebidas: { bg: "bg-cyan-50", text: "text-cyan-700" },
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const colors = categoryColors[category] || categoryColors["snacks"]
  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>{category}</span>
}
