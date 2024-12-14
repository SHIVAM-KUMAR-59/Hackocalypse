import User from '../../models/User.js'
import Product from '../../models/Product.js'

const getProductByUser = async (req, res) => {
  const username = req.params.username

  if (!username) {
    return res.status(400).json({ message: 'Username is required' })
  }

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const products = await Product.find({ owner: user._id })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error })
  }
}

export default getProductByUser
