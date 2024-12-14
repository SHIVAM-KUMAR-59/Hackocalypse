import { Router } from 'express'
import createArticle from '../controllers/article/createArticle.js'
import { auth } from '../middleware/auth.js'
import getAllArticle from '../controllers/article/getAllArticle.js'

const router = Router()

router.post('/api/article/create', auth, createArticle)
router.get('/api/article/all', getAllArticle)

export default router
