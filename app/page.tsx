"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Si ya está autenticado, ir al dashboard
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">📦</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">GestiónPro</h1>
          </div>
          <p className="text-xl text-muted-foreground">Sistema de administración de productos alimenticios</p>
          <p className="text-muted-foreground">Gestiona tu inventario de forma sencilla y profesional</p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow">
            <div className="text-2xl mb-3">📋</div>
            <h3 className="font-semibold mb-2">Gestión Completa</h3>
            <p className="text-sm text-muted-foreground">Crea, edita y elimina productos fácilmente</p>
          </div>
          <div className="p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-semibold mb-2">Vista General</h3>
            <p className="text-sm text-muted-foreground">Consulta tu inventario en tiempo real</p>
          </div>
          <div className="p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="font-semibold mb-2">Seguridad</h3>
            <p className="text-sm text-muted-foreground">Acceso protegido con autenticación</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button onClick={() => router.push("/login")} className="rounded-md text-base px-8 py-6">
            Iniciar sesión
          </Button>
          <Button variant="outline" onClick={() => router.push("/login")} className="rounded-md text-base px-8 py-6">
            Demo
          </Button>
        </div>

        {/* Demo Info */}
        <div className="bg-card border border-border rounded-lg p-6 text-sm">
          <p className="font-medium mb-2">Credenciales de Demo:</p>
          <p className="text-muted-foreground">
            Email: <span className="font-mono text-foreground">admin@demo.com</span>
          </p>
          <p className="text-muted-foreground">
            Contraseña: <span className="font-mono text-foreground">admin123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
