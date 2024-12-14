import Announcement from '../../models/Announcement.js'

const createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' })
    }

    const announcement = new Announcement({
      title,
      content,
    })

    await announcement.save()

    res
      .status(201)
      .json({ message: 'Announcement created successfully.', announcement })
  } catch (error) {
    console.error('Error creating announcement:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

export default createAnnouncement
