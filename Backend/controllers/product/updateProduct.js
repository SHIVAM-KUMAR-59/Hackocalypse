import Product from '../../models/Product.js'

const updateProduct = async (req, res) => {
  const { productId } = req.params

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' })
  }

  const updates = req.body
  if (Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ message: 'Please provide at least one field to update' })
  }

  try {
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    if (!product.owner.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: 'You are not the owner of this product' })
    }

    Object.keys(updates).forEach((key) => {
      if (updates[key]) {
        product[key] = updates[key]
      }
    })

    await (await product.save()).populate('owner', 'username email')

    res.status(200).json({ message: 'Product updated successfully', product })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating product', error: error.message })
  }
}

export default updateProduct
