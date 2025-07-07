import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Cart from "@/models/Cart"
import { verifyToken } from "@/lib/auth"

export async function PUT(request) {
  try {
    await connectDB()

    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { productId, quantity } = await request.json()

    const cart = await Cart.findOne({ user: user.userId })
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 })
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

    if (itemIndex === -1) {
      return NextResponse.json({ message: "Item not found in cart" }, { status: 404 })
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1)
    } else {
      cart.items[itemIndex].quantity = quantity
    }

    await cart.save()
    await cart.populate("items.product")

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Update cart error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
