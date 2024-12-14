import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import createProduct from '../controllers/product/createProduct.js'
import getAllProducts from '../controllers/product/getAllProducts.js'
import getProductByUser from '../controllers/product/getProductByUser.js'
import deleteProduct from '../controllers/product/deleteProduct.js'
import updateProduct from '../controllers/product/updateProduct.js'

const router = Router()

router.post('/api/product/create', auth, createProduct)
router.get('/api/product/all', getAllProducts)
router.get('/api/product/:username', getProductByUser)
router.patch('/api/product/:productId', auth, updateProduct)
router.delete('/api/product/:productId', auth, deleteProduct)

export default router
