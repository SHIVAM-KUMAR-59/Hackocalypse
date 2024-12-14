import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import createProduct from '../controllers/product/createProduct.js'
import getAllProducts from '../controllers/product/getAllProducts.js'

const router = Router()

router.post('/api/product/create', auth, createProduct)
router.get('/api/product/all', getAllProducts)

export default router
