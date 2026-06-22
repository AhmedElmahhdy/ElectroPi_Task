import Product from "./productSchema.js"


// get all products
export const getProducts = async (req, res) => {
  const keyword = req.query.search
    ? { name: { $regex: req.query.search, $options: "i" } }
    : {}    
  const categoryFilter = req.query.category ? { category: req.query.category } : {}
  const products = await Product.find({ ...keyword, ...categoryFilter })
  res.json(products)
}   


// create new product, admin only
export const createProduct = async (req, res) => {
  const { name, description, image, category, price } = req.body
  const product = await Product.create({ name, description, image, category, price })
  res.status(201).json(product)
}

// update product, admin only
export const updateProduct = async (req, res) => {
  const { name, description, image, category, price } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name || product.name
    product.description = description || product.description
    product.image = image || product.image
    product.category = category || product.category
    product.price = price !== undefined ? price : product.price
    const updated = await product.save()
    res.json(updated)
  } else {
    res.status(404).json({ message: "Product not found" })
  }
}

// delete product, admin only
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.deleteOne({ _id: req.params.id });
    res.json({ message: "Product removed" })
  } else {
    res.status(404).json({ message: "Product not found" })
  }
  }