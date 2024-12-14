import { Router } from 'express'
import registerUser from '../controllers/auth/register.js'
import loginUser from '../controllers/auth/login.js'

const router = Router()

router.post('/api/register', registerUser)
router.post('/api/login', loginUser)

export default router
