import { Router} from "express"
import Product from "./productSchema.js"
import { protect, admin } from "../../middleware/auth.js"
import { createProduct, getProducts ,updateProduct , deleteProduct} from "./productServices.js"

const ProductRouter = Router()

ProductRouter.get("/",getProducts)

// create , update, delete product, admin only 
ProductRouter.post("/", protect, admin, createProduct )
ProductRouter.put("/:id", protect, admin,updateProduct)
ProductRouter.delete("/:id", protect, admin, deleteProduct)

export default ProductRouter
