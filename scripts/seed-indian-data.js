// Indian e-commerce database seeding script
import { connectDB } from "../lib/mongodb.js"
import User from "../models/User.js"
import Product from "../models/Product.js"
import bcrypt from "bcryptjs"

async function seedIndianDatabase() {
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
      name: "Rajesh Kumar",
      email: "admin@bharatmart.com",
      phone: "+91 9876543210",
      password: adminPassword,
      role: "admin",
      address: {
        street: "123 MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India",
      },
    })

    // Create customer user
    const customerPassword = await bcrypt.hash("customer123", 12)
    const customer = await User.create({
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 8765432109",
      password: customerPassword,
      role: "customer",
      address: {
        street: "456 Sector 15",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
        country: "India",
      },
    })

    console.log("Created users:", { admin: admin.email, customer: customer.email })

    // Create Indian products
    const indianProducts = [
      {
        name: "Basmati Rice Premium",
        description: "Premium quality aged Basmati rice from Punjab - 5kg pack. Perfect for biryanis and pulavs.",
        price: 850,
        category: "Groceries",
        stock: 50,
        brand: "India Gate",
        rating: 4.5,
        specifications: {
          "Grain Length": "Extra Long",
          Aging: "2 Years",
          Origin: "Punjab, India",
          Weight: "5 kg",
        },
      },
      {
        name: "Silk Saree Kanjivaram",
        description:
          "Traditional handwoven Kanjivaram silk saree with golden zari border. Perfect for weddings and festivals.",
        price: 12500,
        category: "Fashion",
        stock: 15,
        brand: "Nalli",
        rating: 4.8,
        specifications: {
          Material: "Pure Silk",
          Origin: "Kanchipuram, Tamil Nadu",
          "Blouse Piece": "Included",
          Care: "Dry Clean Only",
        },
      },
      {
        name: "Tata Tea Premium",
        description: "Strong and aromatic tea blend with the perfect balance of strength and flavor - 1kg pack.",
        price: 420,
        category: "Groceries",
        stock: 100,
        brand: "Tata Tea",
        rating: 4.3,
        specifications: {
          Type: "Black Tea",
          Weight: "1 kg",
          Origin: "Assam & Darjeeling",
          "Best Before": "24 months",
        },
      },
      {
        name: "Cotton Kurta Set for Men",
        description: "Comfortable cotton kurta with matching pajama. Perfect for festivals, weddings, and casual wear.",
        price: 1899,
        category: "Fashion",
        stock: 30,
        brand: "Manyavar",
        rating: 4.4,
        specifications: {
          Material: "100% Cotton",
          "Kurta Length": "Knee Length",
          Occasion: "Festive & Casual",
          "Care Instructions": "Machine Wash",
        },
      },
      {
        name: "Hawkins Pressure Cooker 5L",
        description:
          "Stainless steel pressure cooker with safety features. Perfect for Indian cooking - 5 liters capacity.",
        price: 2850,
        category: "Home & Kitchen",
        stock: 25,
        brand: "Hawkins",
        rating: 4.6,
        specifications: {
          Capacity: "5 Liters",
          Material: "Stainless Steel",
          "Safety Features": "Pressure Indicator",
          Warranty: "2 Years",
        },
      },
      {
        name: "Patanjali Ayurvedic Face Cream",
        description: "Natural face cream with turmeric and neem extracts. Suitable for all skin types - 50g.",
        price: 299,
        category: "Beauty",
        stock: 75,
        brand: "Patanjali",
        rating: 4.2,
        specifications: {
          "Key Ingredients": "Turmeric, Neem, Aloe Vera",
          "Skin Type": "All Skin Types",
          Weight: "50g",
          "Paraben Free": "Yes",
        },
      },
      {
        name: "Redmi Note 12 Pro",
        description:
          "Latest Redmi smartphone with 8GB RAM, 128GB storage, and 108MP camera. Perfect for photography enthusiasts.",
        price: 18999,
        category: "Electronics",
        stock: 20,
        brand: "Xiaomi",
        rating: 4.5,
        specifications: {
          RAM: "8GB",
          Storage: "128GB",
          Camera: "108MP Triple Camera",
          Battery: "5000mAh",
          Display: "6.67 inch AMOLED",
        },
      },
      {
        name: "Stainless Steel Masala Dabba",
        description: "Traditional spice box with 7 compartments and spoons. Essential for every Indian kitchen.",
        price: 899,
        category: "Home & Kitchen",
        stock: 40,
        brand: "Butterfly",
        rating: 4.4,
        specifications: {
          Material: "Stainless Steel",
          Compartments: "7",
          "Spoons Included": "2",
          "Airtight Lid": "Yes",
        },
      },
      {
        name: "Amul Pure Ghee",
        description: "Pure cow ghee made from fresh cream. Rich in taste and aroma - 1kg tin.",
        price: 650,
        category: "Groceries",
        stock: 60,
        brand: "Amul",
        rating: 4.7,
        specifications: {
          Type: "Pure Cow Ghee",
          Weight: "1 kg",
          "Fat Content": "99.7%",
          "Shelf Life": "12 months",
        },
      },
      {
        name: "Wooden Pooja Mandir",
        description: "Handcrafted wooden temple for home worship. Beautiful design with storage space.",
        price: 4500,
        category: "Home & Kitchen",
        stock: 12,
        brand: "Craftsvilla",
        rating: 4.6,
        specifications: {
          Material: "Sheesham Wood",
          Dimensions: "24x12x30 inches",
          Finish: "Natural Polish",
          Assembly: "Required",
        },
      },
    ]

    const createdProducts = await Product.insertMany(indianProducts)
    console.log(`Created ${createdProducts.length} Indian products`)

    console.log("Indian database seeded successfully!")
    console.log("Login credentials:")
    console.log("Admin: admin@bharatmart.com / admin123")
    console.log("Customer: priya@example.com / customer123")
    console.log("\nProducts include:")
    console.log("- Traditional Indian groceries (Basmati rice, Tea, Ghee)")
    console.log("- Indian fashion (Sarees, Kurtas)")
    console.log("- Electronics (Smartphones)")
    console.log("- Home & Kitchen (Pressure cookers, Spice boxes)")
    console.log("- Beauty products (Ayurvedic creams)")
    console.log("- Religious items (Pooja Mandir)")
  } catch (error) {
    console.error("Seeding error:", error)
  }
}

seedIndianDatabase()
