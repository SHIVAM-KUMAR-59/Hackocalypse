import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import proposeTrade from '../controllers/trade/proposeTrade.js'
import completeTrade from '../controllers/trade/acceptTrade.js'

const router = Router()

router.post('/api/trade/propose', auth, proposeTrade)
router.put('/api/trade/complete/:tradeId', auth, completeTrade)

export default router
