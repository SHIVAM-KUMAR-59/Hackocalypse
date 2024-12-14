import Article from '../../models/Article.js'

const deleteArticle = async (req, res) => {
  const { title } = req.params
  const userId = req.user._id

  if (!title) {
    return res.status(400).send('Article title is required')
  }

  try {
    const article = await Article.findOne({ title })

    if (!article) {
      return res.status(404).json('Article not found')
    }

    if (!article.author.equals(userId)) {
      return res
        .status(403)
        .send('You are not authorized to delete this article')
    }

    await Article.deleteOne({ title })
    res.status(200).json('Article deleted successfully')
  } catch (error) {
    res.status(500).send(`Error deleting article: ${error.message}`)
  }
}

export default deleteArticle
