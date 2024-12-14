import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import proposeTrade from '../controllers/trade/proposeTrade.js'

const router = Router()

router.post('/api/trade/propose', auth, proposeTrade)

export default router
