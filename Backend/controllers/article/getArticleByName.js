import mongoose from 'mongoose'

const getArticleByName = async (req, res) => {
  const { id } = req.params

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid or missing ID' })
  }

  try {
    const article = await Article.findById(id).populate('author', 'username')

    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }

    const responseText = `
Article Found!

Title: ${article.title}
Description: ${article.desc}
Content: ${article.content}
Image URL: ${article.imageUrl || 'N/A'}
Author Name: ${article.author.username}
Published At: ${article.publishedAt.toISOString()}
`

    res.setHeader('Content-Type', 'text/plain')
    return res.status(200).send(responseText)
  } catch (error) {
    console.error('Error fetching article:', error) // Log the error
    res
      .status(500)
      .json({ message: 'Error fetching article', error: error.message })
  }
}
