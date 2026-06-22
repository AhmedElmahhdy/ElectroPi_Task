import Order from "./orderSchema.js"
import Product from "../product/productSchema.js"


// create order
export const createOrder = async (req, res) => {
  const { items, deliveryAddress, phoneNumber, orderNotes, paymentMethod } = req.body
  if (!items || items.length === 0) return res.status(400).json({ message: "No order items" })

  const orderItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.product)
      return {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      }
    })
)

const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalAmount,
    paymentMethod,
    deliveryAddress,
    phoneNumber,
    orderNotes,
  })

  res.status(201).json(order)   
}

// get user orders, admin can get all orders with optional status filter and search by order ID or user email
export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json(orders)
}

// get order by ID, only owner or admin can access
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email")
  if (order) {
    if (order.user._id.equals(req.user._id) || req.user.role === "admin") {
      res.json(order)
    } else {
      res.status(403).json({ message: "Not authorized to view this order" })
    }
  } else {
    res.status(404).json({ message: "Order not found" })
  }
  }



  export const getAllOrders = async (req, res) => {
    const { status, search } = req.query
    const filter = {}
    if (status) {
        filter.orderStatus = status
    }
    if (search) {
        filter._id = search
        filter.user = search
    }
    const orders = await Order.find(filter).populate("user", "name email").sort({ createdAt: -1 })
    res.json(orders)
    }



// update order status, admin only
export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.orderStatus = req.body.orderStatus || order.orderStatus
    const updated = await order.save()
    res.json(updated)
  } else {
    res.status(404).json({ message: "Order not found" })
  }
}

export const getAllOrdersAdmin = async (req, res) => {
  const statusFilter = req.query.status ? { orderStatus: req.query.status } : {}
  let orders = await Order.find(statusFilter).populate("user", "name email").sort({ createdAt: -1 })
  if (req.query.search) {
    const searchValue = req.query.search.toLowerCase()
    orders = orders.filter(
      (order) =>
        order._id.toString().includes(searchValue) ||
        order.user?.email?.toLowerCase().includes(searchValue)
    )
  }
  res.json(orders)
}


// update order status, admin only
export const updateOrderStatusAdmin =  async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.orderStatus = req.body.orderStatus || order.orderStatus
    const updated = await order.save()
    res.json(updated)
  } else {
    res.status(404).json({ message: "Order not found" })
  }
}