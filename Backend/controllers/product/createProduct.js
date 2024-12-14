import Product from '../../models/Product.js'

const createProduct = async (req, res) => {
  const { name, description, condition, category } = req.body

  if (!name || !description || !condition || !category) {
    return res.status(400).json({ message: 'Please fill all fields' })
  }

  try {
    const existingProduct = await Product.findOne({ name })
    if (existingProduct && existingProduct.owner.equals(req.user._id)) {
      return res.status(400).json({ message: 'Product already exists' })
    }

    const product = new Product({
      name,
      description,
      owner: req.user._id,
      condition,
      category,
    })

    await product.save()
    res.status(201).json({ message: 'Product created successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error })
  }
}

export default createProduct
