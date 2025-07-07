import { NextResponse } from "next/server"

// Mock orders storage
const mockOrders = []

export async function GET(request) {
  try {
    return NextResponse.json(mockOrders)
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { shippingAddress } = await request.json()

    if (!shippingAddress || !shippingAddress.trim()) {
      return NextResponse.json({ message: "Shipping address is required" }, { status: 400 })
    }

    const newOrder = {
      _id: `ORD${Date.now()}`,
      user: {
        name: "Priya Sharma",
        email: "priya@example.com",
        phone: "+91 8765432109",
      },
      items: [
        {
          product: { name: "Basmati Rice Premium", price: 850 },
          quantity: 2,
          price: 850,
        },
      ],
      totalAmount: 1700,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      shippingAddress,
    }

    mockOrders.push(newOrder)

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
