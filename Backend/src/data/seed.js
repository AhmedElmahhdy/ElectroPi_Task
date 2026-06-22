import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDB from "../config/db.js"
import User from "../models/user/userSchema.js"
import Product from "../models/product/productSchema.js"

dotenv.config()
connectDB()

const products = [
  { name: "Veggie Pizza", description: "Bell peppers, onions, olives and mushrooms", image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366", category: "Pizza", price: 10.99 },
  { name: "Cheeseburger", description: "Juicy burger with cheddar cheese", image: "https://images.unsplash.com/photo-1550547660-d9450f859349", category: "Burgers", price: 8.49 },
  { name: "Bacon Burger", description: "Smoked bacon, lettuce, and tomato", image: "https://images.unsplash.com/photo-1550317138-10000687a72b", category: "Burgers", price: 9.99 },
  { name: "Chicken Burger", description: "Grilled chicken with fresh toppings", image: "https://images.unsplash.com/photo-1550547660-d9450f859349", category: "Burgers", price: 8.99 },
  { name: "Spaghetti Carbonara", description: "Creamy pasta with pancetta", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e", category: "Pasta", price: 12.49 },
  { name: "Penne Arrabiata", description: "Spicy tomato pasta with chili", image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a", category: "Pasta", price: 10.49 },
  { name: "Fettuccine Alfredo", description: "Rich creamy sauce with parmesan", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", category: "Pasta", price: 12.99 },
  { name: "Iced Coffee", description: "Chilled coffee with ice and milk", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348", category: "Drinks", price: 3.99 },
  { name: "Chocolate Cake", description: "Rich chocolate layered cake", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", category: "Desserts", price: 6.49 }
]

const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "Admin123",
      role: "admin",
    })

    await Product.insertMany(products)

    console.log("Data imported successfully")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

importData()
