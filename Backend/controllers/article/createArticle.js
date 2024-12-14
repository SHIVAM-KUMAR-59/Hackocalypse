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

    // Check if an article with the same title exists
    const existingArticle = await Article.findOne({ title })
    if (existingArticle) {
      return res.status(400).json({ message: 'Article already exists' })
    }

    // Create and save the new article
    const newArticle = new Article({
      title,
      desc,
      content,
      imageUrl,
      author: userId,
    })

    await newArticle.save()

    // Prepare the response in plain text
    const responseText = `
Article Created Successfully!

Title: ${newArticle.title}
Description: ${newArticle.desc}
Content: ${newArticle.content}
Image URL: ${newArticle.imageUrl || 'N/A'}
Author: ${req.user.name || 'Unknown'}
Published At: ${newArticle.publishedAt.toISOString()}
`

    res.setHeader('Content-Type', 'text/plain')
    return res.status(201).send(responseText)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating article', error: error.message })
  }
}

export default createArticle
