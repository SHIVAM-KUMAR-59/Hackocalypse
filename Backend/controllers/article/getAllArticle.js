import Article from '../../models/Article.js'

const getAllArticle = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name email') // Populating author details if needed

    if (!articles.length) {
      return res.status(404).send('No articles found')
    }

    let responseText = 'Articles:\n\n'
    articles.forEach((article, index) => {
      responseText += `Title: ${article.title}\n`
      responseText += `Description: ${article.desc}\n`
      responseText += `Content: ${article.content}\n`
      responseText += `Author: ${article.author.name || 'Unknown'}\n`
      responseText += `Published At: ${article.publishedAt}\n\n`
    })

    res.setHeader('Content-Type', 'text/plain')
    return res.send(responseText)
  } catch (error) {
    res.status(500).send(`Error fetching articles: ${error.message}`)
  }
}

export default getAllArticle
