"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Plus, Minus, Trash2, Package, Users, LogOut, Search, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  brand?: string
  rating?: number
  image?: string
}

interface CartItem {
  product: Product
  quantity: number
}

interface User {
  _id: string
  name: string
  email: string
  phone: string
  role: "customer" | "admin"
}

interface Order {
  _id: string
  user: { name: string; email: string; phone: string }
  items: { product: Product; quantity: number; price: number }[]
  totalAmount: number
  status: string
  createdAt: string
  shippingAddress: string
}

// Indian products mock data
const mockProducts: Product[] = [
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

const categories = ["All", "Groceries", "Fashion", "Electronics", "Home & Kitchen", "Beauty"]

export default function IndianEcommerceApp() {
  const [user, setUser] = useState<User | null>(null)
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  // Auth forms state
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer" as "customer" | "admin",
  })

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    brand: "",
  })

  // Order form state
  const [shippingAddress, setShippingAddress] = useState("")

  useEffect(() => {
    filterProducts()
  }, [searchTerm, selectedCategory, currentPage])

  const filterProducts = () => {
    let filtered = mockProducts

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Pagination
    const itemsPerPage = 6
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    setFilteredProducts(filtered.slice(startIndex, endIndex))
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock authentication with Indian names
    setTimeout(() => {
      const mockUser: User = {
        _id: "user1",
        name: formData.name || "Bachu Sruthi",
        email: formData.email,
        phone: formData.phone || "8106321761",
        role: formData.role,
      }
      setUser(mockUser)
      toast({
        title: "Welcome!",
        description: `Successfully ${authMode === "login" ? "logged in" : "registered"}!`,
      })
      setFormData({ name: "", email: "", phone: "", password: "", role: "customer" })
      setLoading(false)
    }, 1000)
  }

  const handleLogout = () => {
    setUser(null)
    setCart([])
    setOrders([])
    toast({
      title: "Thank you!",
      description: "Logged out successfully",
    })
  }

  const addToCart = (productId: string) => {
    const product = mockProducts.find((p) => p._id === productId)
    if (!product) return

    const existingItem = cart.find((item) => item.product._id === productId)

    if (existingItem) {
      setCart(cart.map((item) => (item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }

    toast({
      title: "Added to cart!",
      description: `${product.name} added to cart!`,
    })
  }

  const updateCartItem = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(cart.map((item) => (item.product._id === productId ? { ...item, quantity } : item)))
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product._id !== productId))
    toast({
      title: "Removed from cart!",
      description: "Product removed from cart",
    })
  }

  const createOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty!",
        variant: "destructive",
      })
      return
    }

    if (!shippingAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter shipping address!",
        variant: "destructive",
      })
      return
    }

    const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

    const newOrder: Order = {
      _id: `ORD${Date.now()}`,
      user: {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
      },
      items: cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      shippingAddress,
    }

    setOrders([newOrder, ...orders])
    setCart([])
    setShippingAddress("")

    toast({
      title: "Order Successful!",
      description: `Order placed for ₹${totalAmount.toLocaleString("en-IN")}`,
    })
  }

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const newProduct: Product = {
        _id: `product_${Date.now()}`,
        name: productForm.name,
        description: productForm.description,
        price: Number.parseFloat(productForm.price),
        category: productForm.category,
        stock: Number.parseInt(productForm.stock),
        brand: productForm.brand,
        rating: 4.0,
      }

      mockProducts.push(newProduct)
      filterProducts()
      setProductForm({ name: "", description: "", price: "", category: "", stock: "", brand: "" })

      toast({
        title: "Product added!",
        description: "Product added successfully!",
      })
      setLoading(false)
    }, 500)
  }

  const deleteProduct = (productId: string) => {
    const index = mockProducts.findIndex((p) => p._id === productId)
    if (index > -1) {
      mockProducts.splice(index, 1)
      filterProducts()

      toast({
        title: "Product deleted!",
        description: "Product deleted successfully!",
      })
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-orange-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-orange-800">🛒 भारत मार्ट</CardTitle>
            <CardTitle className="text-lg">Bharat Mart</CardTitle>
            <CardDescription>
              {authMode === "login" ? "Sign in to your account" : "Create a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === "register" && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {authMode === "register" && (
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              )}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {authMode === "register" && (
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: "customer" | "admin") => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
                {loading ? "Loading..." : authMode === "login" ? "Login" : "Register"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button variant="link" onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
                {authMode === "login" ? "Need an account? Register" : "Already have an account? Login"}
              </Button>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm border border-green-200">
              <p className="font-medium text-green-900">🎯 Demo Mode</p>
              <p className="text-green-700">This is a preview with mock data. Try any email/password!</p>
              <div className="mt-2 space-y-1">
                <p className="text-green-600">
                  <strong>Customer Access:</strong> Use any regular email
                </p>
                <p className="text-green-600">
                  <strong>Admin Access:</strong> Use email containing "admin" (e.g., admin@test.com)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <header className="bg-white shadow-md border-b-2 border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-orange-800">🛒 Bharat Mart</h1>
              <span className="text-sm text-gray-600">Bharat Mart</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {user.role === "admin" ? "Admin" : "Customer"}
              </Badge>
              <div className="text-right">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-gray-600">{user.phone}</div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-orange-300 bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white border-2 border-orange-200">
            <TabsTrigger value="products" className="data-[state=active]:bg-orange-100">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="cart" className="data-[state=active]:bg-orange-100">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({cart.length})
            </TabsTrigger>
            {user.role === "admin" && (
              <>
                <TabsTrigger value="add-product" className="data-[state=active]:bg-orange-100">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-orange-100">
                  <Users className="h-4 w-4 mr-2" />
                  Orders
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border-2 border-orange-200">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product._id}
                  className="border-2 border-orange-100 hover:border-orange-300 transition-colors"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-gray-800">{product.name}</CardTitle>
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        {product.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{product.description}</CardDescription>
                    {product.brand && <div className="text-xs text-gray-600">Brand: {product.brand}</div>}
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-green-700">{formatPrice(product.price)}</span>
                      {product.rating && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                      <span className="text-xs text-green-600">✓ Available</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => addToCart(product._id)}
                        disabled={product.stock === 0}
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                      >
                        Add to Cart
                      </Button>
                      {user.role === "admin" && (
                        <Button variant="destructive" size="sm" onClick={() => deleteProduct(product._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-orange-300"
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 text-orange-800">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-orange-300"
                >
                  Next
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cart" className="space-y-6">
            {cart.length === 0 ? (
              <Card className="border-2 border-orange-200">
                <CardContent className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.product._id} className="border-2 border-orange-100">
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                          <p className="text-gray-600">{formatPrice(item.product.price)} each</p>
                          <p className="text-xs text-gray-500">{item.product.brand}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateCartItem(item.product._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="border-orange-300"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateCartItem(item.product._id, item.quantity + 1)}
                              className="border-orange-300"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <span className="font-semibold w-24 text-right text-green-700">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.product._id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-2 border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Shipping Address</Label>
                        <Textarea
                          id="address"
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          placeholder="Enter your complete address..."
                          className="mt-2"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold text-green-800">
                          Total: {formatPrice(getTotalPrice())}
                        </span>
                        <Button onClick={createOrder} size="lg" className="bg-green-600 hover:bg-green-700">
                          Place Order
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {user.role === "admin" && (
            <TabsContent value="add-product">
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800">Add New Product</CardTitle>
                  <CardDescription>Add a new product to the store</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                          id="brand"
                          value={productForm.brand}
                          onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={productForm.category}
                          onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.slice(1).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={productForm.stock}
                          onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
                      {loading ? "Adding..." : "Add Product"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {user.role === "admin" && (
            <TabsContent value="orders">
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800">All Orders</CardTitle>
                  <CardDescription>Manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <p className="text-gray-600">No orders found</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Card key={order._id} className="border border-green-200">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <p className="font-semibold">Order #{order._id}</p>
                                <p className="text-sm text-gray-600">Customer: {order.user.name}</p>
                                <p className="text-sm text-gray-600">Phone: {order.user.phone}</p>
                                <p className="text-sm text-gray-600">Email: {order.user.email}</p>
                                <p className="text-sm text-gray-600">
                                  Date: {new Date(order.createdAt).toLocaleDateString("en-IN")}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-green-700">{formatPrice(order.totalAmount)}</p>
                                <Badge variant="outline" className="border-green-300 text-green-700">
                                  {order.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="border-t pt-2">
                              <p className="text-sm font-medium">Items:</p>
                              {order.items.map((item, index) => (
                                <p key={index} className="text-sm text-gray-600">
                                  {item.product.name} x {item.quantity} = {formatPrice(item.price * item.quantity)}
                                </p>
                              ))}
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <p className="text-sm font-medium">Shipping Address:</p>
                              <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>

      <footer className="bg-white border-t-2 border-orange-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">🛒 Bharat Mart</h3>
            <p className="text-gray-600 mb-2">Your trusted Indian e-commerce platform</p>
            <p className="text-sm text-gray-500">Made with ❤️ for India</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
