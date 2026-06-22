import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./src/config/db.js"
import userRoutes from "./src/models/user/userRoutes.js"
import productRoutes from "./src/models/product/productRoutes.js"
import orderRoutes from "./src/models/order/orderRoutes.js"

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send({ message: "Food ordering API is running" })
})

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({ message: err.message, stack: process.env.NODE_ENV === "production" ? null : err.stack })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
