import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Cart from "@/models/Cart"
import { verifyToken } from "@/lib/auth"

export async function DELETE(request) {
  try {
    await connectDB()

    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await request.json()

    const cart = await Cart.findOne({ user: user.userId })
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 })
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId)

    await cart.save()
    await cart.populate("items.product")

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Remove from cart error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
