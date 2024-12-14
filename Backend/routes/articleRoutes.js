import { Router } from 'express'
import createArticle from '../controllers/article/createArticle.js'
import { auth } from '../middleware/auth.js'

const router = Router()

router.post('/api/article/create', auth, createArticle)

export default router
