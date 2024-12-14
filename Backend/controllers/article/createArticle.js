import Article from '../../models/Article.js'

const createArticle = async (req, res) => {
  const { title, desc, content, imageUrl } = req.body

  if (!title || !desc || !content) {
    return res
      .status(400)
      .json({ message: 'Title, description, and content are required' })
  }

  try {
    const userId = req.user._id

    const existingArticle = await Article.findOne({ title })
    if (existingArticle) {
      return res.status(400).json({ message: 'Article already exists' })
    }

    const newArticle = new Article({
      title,
      desc,
      content,
      imageUrl,
      author: userId,
    })

    await newArticle.save()
    return res.status(201).json({
      message: 'Article created successfully',
      article: newArticle,
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating article', error: error.message })
  }
}

export default createArticle
