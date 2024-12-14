import Article from '../../models/Article.js'

const getAllArticle = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name email')

    if (!articles.length) {
      return res.status(404).json({ message: 'No articles found' })
    }

    // Set content-type to application/json
    res.setHeader('Content-Type', 'application/json')

    // Send the articles as a JSON response
    return res.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    // Set content-type to application/json for error response as well
    res.setHeader('Content-Type', 'application/json')
    return res
      .status(500)
      .json({ message: `Error fetching articles: ${error.message}` })
  }
}

export default getAllArticle
