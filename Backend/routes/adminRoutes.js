import { Router } from 'express'
import createAnnouncement from '../controllers/announcement/createAnnouncement'
import { isAdmin } from '../middleware/auth'
import updateAnnouncement from '../controllers/announcement/updateAnnouncement'
import deleteAnnouncement from '../controllers/announcement/deleteAnnouncement'

const router = Router()

router.post('/api/admin/createAnnouncement', isAdmin, createAnnouncement)
router.patch('/api/admin/:id', isAdmin, updateAnnouncement)
router.delete('/api/admin/:id', isAdmin, deleteAnnouncement)

export default router
