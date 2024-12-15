import React from 'react';
import './myarticles.css';
import Navbar from '../Home/Navbar/Navbar';

const MyArticles = () => {
  return (
    <>
      <Navbar />
      <div className="my-articles-container">
        <h1 className="my-articles-title">My Articles</h1>
        <p className="my-articles-subtitle">Survival Wisdom: Your Contributions to the Cause</p>

        <div className="articles-list">
          {[1, 2].map((_, index) => (
            <div key={index} className="article-card">
              <h2 className="article-title">How to Survive a Crisis</h2>
              <p className="article-date">Published on Dec 10, 2024</p>
              <p className="article-description">
                Tips and strategies for navigating through emergency situations effectively.
              </p>
              <div className="article-actions">
                <button className="view-button">View</button>
                <button className="edit-button">Edit</button>
              </div>
            </div>
          ))}
        </div>

        <button className="add-article-button">Add New Article</button>

        <footer className="my-articles-footer">
          &copy; 2024 Crisis Hub. <a href="#">Terms</a> | <a href="#">Privacy</a>
        </footer>
      </div>
    </>
  );
};

export default MyArticles;