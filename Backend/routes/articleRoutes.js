import { Router } from 'express'
import createArticle from '../controllers/article/createArticle.js'
import { auth } from '../middleware/auth.js'
import getAllArticle from '../controllers/article/getAllArticle.js'
import getArticleByName from '../controllers/article/getArticleByName.js'

const router = Router()

router.post('/api/article/create', auth, createArticle)
router.get('/api/article/all', getAllArticle)
router.get('/api/article/:title', getArticleByName)

export default router
