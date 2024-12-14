import React, { useEffect, useState } from 'react'
import './resources.css'

const Card2 = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/article/all')

        if (!response.ok) {
          setArticles('No Articles Available')
        }

        const data = await response.json()

        // Sort articles by publishedAt in descending order (newest first)
        const sortedArticles = data.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
        )

        setArticles(sortedArticles)
      } catch (error) {
        console.error('Error fetching articles:', error)
        alert('Error fetching articles. Please try again later.')
      }
    }

    fetchArticles()
  }, [])

  return (
    <div className="resource-card" id="card2">
      <h2>Important Resources</h2>
      <b>Here are the essential articles you need to survive!:</b>

      {Array.isArray(articles) && articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article._id}>
              {/* Wrap the title in a link */}
              <a href={`/article/${article._id}`} className="article-link">
                <h3>{article.title}</h3>
              </a>
              <ul>
                <li>Description: {article.desc}</li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles available</p>
      )}
    </div>
  )
}

export default Card2