import jwt from "jsonwebtoken"

export async function verifyToken(request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "bharat-mart-secret-key")

    return decoded
  } catch (error) {
    return null
  }
}

export function requireAdmin(user) {
  return user && user.role === "admin"
}

export function requireAuth(user) {
  return user !== null
}
