import Product from '../../models/Product.js'
import Trade from '../../models/Trade.js'

const proposeTrade = async (req, res) => {
  try {
    const { offeredProductId, requestedProductId } = req.body

    const offeredProduct = await Product.findById(offeredProductId)
    const requestedProduct = await Product.findById(requestedProductId)

    if (!offeredProduct || !requestedProduct) {
      return res.status(400).json({ message: 'One or both products not found' })
    }

    if (offeredProduct.owner.toString() === req.user._id) {
      return res
        .status(400)
        .json({ message: 'You cannot trade your own product' })
    }

    const trade = new Trade({
      user: req.user.id,
      offeredProduct: offeredProductId,
      requestedProduct: requestedProductId,
      status: 'pending',
    })

    await trade.save()

    res
      .status(201)
      .json({ message: 'Trade proposed successfully', data: trade })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error proposing trade', error: error.message })
  }
}

export default proposeTrade
