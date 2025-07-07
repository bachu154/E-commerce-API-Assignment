// Database seeding script
import { connectDB } from "../lib/mongodb.js"
import User from "../models/User.js"
import Product from "../models/Product.js"
import bcrypt from "bcryptjs"

async function seedDatabase() {
  try {
    await connectDB()
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Product.deleteMany({})
    console.log("Cleared existing data")

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 12)
    const admin = await User.create({
      email: "admin@adaptnxt.com",
      password: adminPassword,
      role: "admin",
    })

    // Create customer user
    const customerPassword = await bcrypt.hash("customer123", 12)
    const customer = await User.create({
      email: "customer@example.com",
      password: customerPassword,
      role: "customer",
    })

    console.log("Created users:", { admin: admin.email, customer: customer.email })

    // Create sample products
    const products = [
      {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        category: "Electronics",
        stock: 50,
      },
      {
        name: "Smart Watch",
        description: "Feature-rich smartwatch with health monitoring",
        price: 299.99,
        category: "Electronics",
        stock: 30,
      },
      {
        name: "Laptop Stand",
        description: "Ergonomic laptop stand for better posture",
        price: 49.99,
        category: "Accessories",
        stock: 100,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard for gaming and productivity",
        price: 129.99,
        category: "Electronics",
        stock: 25,
      },
      {
        name: "Wireless Mouse",
        description: "Precision wireless mouse with long battery life",
        price: 39.99,
        category: "Electronics",
        stock: 75,
      },
      {
        name: "USB-C Hub",
        description: "Multi-port USB-C hub with HDMI and USB 3.0",
        price: 79.99,
        category: "Accessories",
        stock: 40,
      },
    ]

    const createdProducts = await Product.insertMany(products)
    console.log(`Created ${createdProducts.length} products`)

    console.log("Database seeded successfully!")
    console.log("Login credentials:")
    console.log("Admin: admin@adaptnxt.com / admin123")
    console.log("Customer: customer@example.com / customer123")
  } catch (error) {
    console.error("Seeding error:", error)
  }
}

seedDatabase()
