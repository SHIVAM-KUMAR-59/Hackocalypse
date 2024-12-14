import { Router } from 'express'
import registerUser from '../controllers/auth/register.js'

const router = Router()

router.post('/api/register', registerUser)

export default router
