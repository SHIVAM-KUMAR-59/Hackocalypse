import Trade from '../../models/Trade.js'

const getAllTradesForUser = async (req, res) => {
  const userId = req.user._id

  try {
    const trades = await Trade.find({
      $or: [
        { 'requestedProduct.owner': userId },
        { 'offeredProduct.owner': userId },
      ],
    })
      .populate('requestedProduct')
      .populate('offeredProduct')

    if (!trades || trades.length === 0) {
      return res.status(404).json({ message: 'No trades found for this user' })
    }

    res.status(200).json({ message: 'Trades fetched successfully', trades })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Error fetching trades', error: error.message })
  }
}

export default getAllTradesForUser
