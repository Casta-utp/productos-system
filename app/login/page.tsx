"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { validateCredentials } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const isValid = await validateCredentials(email, password)
      if (isValid) {
        // Guardar sesión en localStorage (para demo)
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userEmail", email)
        router.push("/dashboard")
      } else {
        setError("Correo electrónico o contraseña inválidos")
      }
    } catch (err) {
      setError("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-semibold text-center">Panel de Administración</CardTitle>
          <p className="text-sm text-muted-foreground text-center">Iniciar sesión</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@demo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="rounded-md"
              />
            </div>

            {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">{error}</div>}

            <Button type="submit" disabled={loading} className="w-full rounded-md font-medium">
              {loading ? "Cargando..." : "Iniciar sesión"}
            </Button>

            <div className="text-xs text-muted-foreground text-center space-y-1 pt-2">
              <p>Demo - Credenciales:</p>
              <p>Email: admin@demo.com</p>
              <p>Contraseña: admin123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
