"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("isAuthenticated")

  return isAuthenticated ? <>{children}</> : null
}
