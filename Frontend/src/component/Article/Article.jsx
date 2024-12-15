import React, { useEffect, useState } from 'react'
// import './myarticles.css'
import Navbar from '../Home/Navbar/Navbar'
import { useParams } from 'react-router-dom'

const Article = () => {
  const [article, setArticle] = useState(null)
  const [error, setError] = useState(null)
  const { id } = useParams() // Extract the id from URL params

  const fetchArticle = async () => {
    console.log('Fetching article with ID:', id) // Log the ID
    try {
      const response = await fetch(`http://localhost:3000/api/article/${id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const articleData = await response.json()
      setArticle(articleData) // Set the fetched article data
    } catch (err) {
      console.error(err)
      setError('Failed to fetch article')
    }
  }

  useEffect(() => {
    console.log('Article ID:', id) // Log the ID to verify it's available
    if (id) {
      fetchArticle()
    }
  }, [id])

  return (
    <>
      <Navbar />
      <div className="my-articles-container">
        {article === null && !error ? (
          <p className="loading-message">Loading article...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <h1 className="my-articles-title">{article.title}</h1>
            <p className="my-articles-subtitle">{article.description}</p>

            <div className="article-content">
              <p>{article.content}</p>
              {article.imageUrl && <img src={article.imageUrl} alt="article" />}
            </div>

            <div className="article-actions">
              <button className="view-button">View</button>
              <button className="edit-button">Edit</button>
            </div>
          </>
        )}

        <button className="add-article-button">Add New Article</button>

        <footer className="my-articles-footer">
          &copy; 2024 Crisis Hub. <a href="#">Terms</a> |{' '}
          <a href="#">Privacy</a>
        </footer>
      </div>
    </>
  )
}

export default Article
