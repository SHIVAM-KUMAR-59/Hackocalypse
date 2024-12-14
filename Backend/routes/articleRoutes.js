import { Router } from 'express'
import createArticle from '../controllers/article/createArticle.js'
import { auth } from '../middleware/auth.js'
import getAllArticle from '../controllers/article/getAllArticle.js'
import getArticleByName from '../controllers/article/getArticleByName.js'
import deleteArticle from '../controllers/article/deleteArticle.js'

const router = Router()

router.post('/api/article/create', auth, createArticle)
router.get('/api/article/all', getAllArticle)
router.get('/api/article/:title', getArticleByName)
router.delete('/api/article/:title', auth, deleteArticle)

export default router
