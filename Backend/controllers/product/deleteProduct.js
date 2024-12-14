import Product from '../../models/Product.js'

const deleteProduct = async (req, res) => {
  const productId = req.params.productId

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' })
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

    await Product.deleteOne({ _id: productId })

    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting product', error: error.message })
  }
}

export default deleteProduct
