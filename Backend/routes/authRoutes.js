import { Router } from 'express'
import registerUser from '../controllers/auth/register.js'
import loginUser from '../controllers/auth/login.js'
import isLoggedIn from '../controllers/auth/isLoggedIn.js'

const router = Router()

router.post('/api/register', registerUser)
router.post('/api/login', loginUser)
router.get('/api/isLoggedIn', isLoggedIn)

export default router
