import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import createProduct from '../controllers/product/createProduct.js'

const router = Router()

router.post('/api/product/create', auth, createProduct)

export default router
