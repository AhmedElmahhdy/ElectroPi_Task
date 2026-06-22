import { Router} from "express"
import Order from "./orderSchema.js"
import Product from "../product/productSchema.js"
import { protect, admin } from "../../middleware/auth.js"
import { createOrder, getOrderById, getUserOrders , getAllOrdersAdmin, updateOrderStatusAdmin } from "./orderServices.js"

const orderRouter = Router()

orderRouter.post("/", protect, createOrder)
orderRouter.get("/my", protect, getUserOrders )
orderRouter .get("/:id", protect, getOrderById) 
orderRouter.get("/", protect, admin,getAllOrdersAdmin)
orderRouter.put("/:id/status", protect, admin,updateOrderStatusAdmin)

export default orderRouter
