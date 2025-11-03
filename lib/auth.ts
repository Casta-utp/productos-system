// Sistema de autenticación en memoria
interface User {
  email: string
  password: string
}

const DEMO_USER: User = {
  email: "admin@demo.com",
  password: "admin123",
}

export async function validateCredentials(email: string, password: string): Promise<boolean> {
  // Validación simple para demo
  return email === DEMO_USER.email && password === DEMO_USER.password
}
