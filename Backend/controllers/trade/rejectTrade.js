import Trade from '../../models/Trade.js'
import Product from '../../models/Product.js'

const rejectTrade = async (req, res) => {
  const tradeId = req.params.tradeId

  if (!tradeId) {
    return res.status(400).json({ message: 'Trade ID is required' })
  }

  try {
    const trade = await Trade.findById(tradeId).populate('offeredProduct')

    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' })
    }

    if (trade.status !== 'pending') {
      return res
        .status(400)
        .json({ message: 'Trade cannot be rejected at this stage' })
    }

    const requestedProduct = await Product.findById(
      trade.requestedProduct,
    ).populate('owner')
    if (!requestedProduct || !requestedProduct.owner) {
      return res
        .status(404)
        .json({ message: 'Requested product or owner not found' })
    }

    if (!requestedProduct.owner._id.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to reject this trade' })
    }

    trade.status = 'rejected'
    await trade.save()

    res.status(200).json({ message: 'Trade rejected successfully', trade })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Error rejecting trade', error: error.message })
  }
}

export default rejectTrade
