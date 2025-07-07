import { NextResponse } from "next/server"

// Mock cart storage
const mockCarts = {}

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization")
    const userId = "user_123" // Mock user ID

    const cart = mockCarts[userId] || { items: [] }
    return NextResponse.json(cart)
  } catch (error) {
    console.error("Get cart error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
