import { NextResponse } from "next/server"

// Mock products data
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
  {
    _id: "2",
    name: "Silk Saree Kanjivaram",
    description: "Traditional handwoven Kanjivaram silk saree with golden border",
    price: 12500,
    category: "Fashion",
    stock: 15,
    brand: "Nalli",
    rating: 4.8,
  },
  {
    _id: "3",
    name: "Tata Tea Premium",
    description: "Strong and aromatic tea blend - 1kg pack",
    price: 420,
    category: "Groceries",
    stock: 100,
    brand: "Tata Tea",
    rating: 4.3,
  },
  {
    _id: "4",
    name: "Kurta Set for Men",
    description: "Cotton kurta with matching pajama - Perfect for festivals",
    price: 1899,
    category: "Fashion",
    stock: 30,
    brand: "Manyavar",
    rating: 4.4,
  },
  {
    _id: "5",
    name: "Pressure Cooker 5L",
    description: "Hawkins stainless steel pressure cooker - 5 liters",
    price: 2850,
    category: "Home & Kitchen",
    stock: 25,
    brand: "Hawkins",
    rating: 4.6,
  },
  {
    _id: "6",
    name: "Ayurvedic Face Cream",
    description: "Natural face cream with turmeric and neem - 50g",
    price: 299,
    category: "Beauty",
    stock: 75,
    brand: "Patanjali",
    rating: 4.2,
  },
  {
    _id: "7",
    name: "Smartphone Redmi Note",
    description: "Latest Redmi Note with 6GB RAM and 128GB storage",
    price: 18999,
    category: "Electronics",
    stock: 20,
    brand: "Xiaomi",
    rating: 4.5,
  },
  {
    _id: "8",
    name: "Masala Dabba Set",
    description: "Traditional stainless steel spice box with 7 compartments",
    price: 899,
    category: "Home & Kitchen",
    stock: 40,
    brand: "Butterfly",
    rating: 4.4,
  },
]

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""

    let filtered = mockProducts

    // Search functionality
    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Category filter
    if (category && category !== "All") {
      filtered = filtered.filter((product) => product.category === category)
    }

    // Pagination
    const skip = (page - 1) * limit
    const products = filtered.slice(skip, skip + limit)
    const total = filtered.length
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      products,
      currentPage: page,
      totalPages,
      total,
    })
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, description, price, category, stock, brand } = await request.json()

    const newProduct = {
      _id: `product_${Date.now()}`,
      name,
      description,
      price: Number.parseFloat(price),
      category,
      stock: Number.parseInt(stock),
      brand,
      rating: 4.0,
    }

    mockProducts.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
