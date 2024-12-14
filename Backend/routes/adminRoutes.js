import { Router } from 'express'
import createAnnouncement from '../controllers/announcement/createAnnouncement.js'
import { isAdmin } from '../middleware/auth.js'
import updateAnnouncement from '../controllers/announcement/updateAnnouncement.js'
import deleteAnnouncement from '../controllers/announcement/deleteAnnouncement.js'

const router = Router()

router.post('/api/admin/createAnnouncement', isAdmin, createAnnouncement)
router.patch('/api/admin/:id', isAdmin, updateAnnouncement)
router.delete('/api/admin/:id', isAdmin, deleteAnnouncement)

export default router
