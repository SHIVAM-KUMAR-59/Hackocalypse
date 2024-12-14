import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import proposeTrade from '../controllers/trade/proposeTrade.js'
import acceptTrade from '../controllers/trade/acceptTrade.js'
import rejectTrade from '../controllers/trade/rejectTrade.js'

const router = Router()

router.post('/api/trade/propose', auth, proposeTrade)
router.put('/api/trade/accept/:tradeId', auth, acceptTrade)
router.put('/api/trade/reject/:tradeId', auth, rejectTrade)

export default router
