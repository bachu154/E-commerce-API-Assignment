import { NextResponse } from "next/server"

// Mock user storage (in real app, this would be in database)
const mockUsers = []

export async function POST(request) {
  try {
    const { name, email, phone, password, role = "customer" } = await request.json()

    // Check if user already exists in mock storage
    const existingUser = mockUsers.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Create mock user
    const user = {
      _id: `user_${Date.now()}`,
      name,
      email,
      phone,
      role,
    }

    mockUsers.push(user)

    // Generate mock JWT token
    const token = `mock_token_${user._id}`

    return NextResponse.json({
      message: "User created successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
