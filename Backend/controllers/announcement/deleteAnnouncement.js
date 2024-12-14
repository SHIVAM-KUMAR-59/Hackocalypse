import Announcement from '../../models/Announcement'

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params

    const announcement = await Announcement.findById(id)

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found.' })
    }

    await announcement.remove()

    res.status(200).json({ message: 'Announcement deleted successfully.' })
  } catch (error) {
    console.error('Error deleting announcement:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

export default deleteAnnouncement
