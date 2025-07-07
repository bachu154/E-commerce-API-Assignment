import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Mock authentication - accept any email/password
    const mockUser = {
      _id: "user_123",
      name: email.includes("admin") ? "Rajesh Kumar" : "Priya Sharma",
      email: email,
      phone: "+91 9876543210",
      role: email.includes("admin") ? "admin" : "customer",
    }

    // Generate mock JWT token
    const token = `mock_token_${mockUser._id}`

    return NextResponse.json({
      message: "Login successful",
      token,
      user: mockUser,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
