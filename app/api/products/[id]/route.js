import { NextResponse } from "next/server"

const mockProducts = [
  {
    _id: "1",
    name: "Basmati Rice Premium",
    description: "Premium quality aged Basmati rice from Punjab - 5kg pack",
    price: 850,
    category: "Groceries",
    stock: 50,
    brand: "India Gate",
    rating: 4.5,
  },
  // Add other products as needed
]

export async function GET(request, { params }) {
  try {
    const product = mockProducts.find((p) => p._id === params.id)
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Get product error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const index = mockProducts.findIndex((p) => p._id === params.id)
    if (index === -1) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    mockProducts.splice(index, 1)
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Delete product error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
