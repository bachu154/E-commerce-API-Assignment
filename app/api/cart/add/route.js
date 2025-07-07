import { NextResponse } from "next/server"

const mockCarts = {}
const mockProducts = [
  {
    _id: "1",
    name: "Basmati Rice Premium",
    price: 850,
    stock: 50,
  },
  // Add other products as needed
]

export async function POST(request) {
  try {
    const { productId, quantity = 1 } = await request.json()
    const userId = "user_123" // Mock user ID

    const product = mockProducts.find((p) => p._id === productId)
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    if (!mockCarts[userId]) {
      mockCarts[userId] = { items: [] }
    }

    const existingItemIndex = mockCarts[userId].items.findIndex((item) => item.product._id === productId)

    if (existingItemIndex > -1) {
      mockCarts[userId].items[existingItemIndex].quantity += quantity
    } else {
      mockCarts[userId].items.push({ product, quantity })
    }

    return NextResponse.json(mockCarts[userId])
  } catch (error) {
    console.error("Add to cart error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
