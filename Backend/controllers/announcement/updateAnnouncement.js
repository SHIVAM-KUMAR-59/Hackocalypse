import Announcement from '../../models/Announcement.js'

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body

    const announcement = await Announcement.findById(id)

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found.' })
    }

    if (title) announcement.title = title
    if (content) announcement.content = content

    await announcement.save()

    res
      .status(200)
      .json({ message: 'Announcement updated successfully.', announcement })
  } catch (error) {
    console.error('Error updating announcement:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

export default updateAnnouncement
