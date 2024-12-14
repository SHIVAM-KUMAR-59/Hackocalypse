import Article from '../../models/Article.js'

const getArticleByName = async (req, res) => {
  const { title } = req.params

  if (!title) {
    return res.status(400).json({ message: 'Title is required' })
  }

  try {
    const article = await Article.findOne({ title }).populate(
      'author',
      'username',
    )

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
    res
      .status(500)
      .json({ message: 'Error fetching article', error: error.message })
  }
}

export default getArticleByName
