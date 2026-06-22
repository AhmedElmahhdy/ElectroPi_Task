import mongoose from "mongoose"
import { PaymentMethod , OrderStatus } from "../../utils/enum.js"

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  paymentMethod: {
     type: String,
      enum: PaymentMethod,
       default: PaymentMethod.CASH_ON_DELIVERY },
  orderStatus: { type: String,enum: OrderStatus, default: OrderStatus.PENDING },
  deliveryAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  orderNotes: { type: String },
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)
export default Order
