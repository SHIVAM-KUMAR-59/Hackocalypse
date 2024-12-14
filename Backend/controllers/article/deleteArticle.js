import Article from '../../models/Article.js'

const deleteArticle = async (req, res) => {
  const { id } = req.params
  const userId = req.user._id

  if (!id) {
    return res.status(400).send('Article id is required')
  }

  try {
    const article = await Article.findById(id)

    if (!article) {
      return res.status(404).json('Article not found')
    }

    if (!article.author.equals(userId)) {
      return res
        .status(403)
        .send('You are not authorized to delete this article')
    }

    await Article.deleteOne({ _id: id })
    res.status(200).json('Article deleted successfully')
  } catch (error) {
    res.status(500).send(`Error deleting article: ${error.message}`)
  }
}

export default deleteArticle
