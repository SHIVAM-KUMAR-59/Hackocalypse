import Product from '../../models/Product.js'

const getAllProducts = async (req, res) => {
  try {
    // Fetch products with the owner information populated
    const products = await Product.find().populate('owner', 'username email') // You can specify fields like name, email, etc., to populate

    // If no products are found
    if (!products) {
      return res.status(404).json({ message: 'No products found' })
    }

    // Return products with owner information
    res.status(200).json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching products' })
  }
}

export default getAllProducts
