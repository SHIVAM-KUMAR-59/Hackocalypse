import React, { useEffect, useState } from 'react'
import './resources.css'
import TradeButton from './TradeButton'

const Card3 = () => {
  const [products, setProducts] = useState([]) // State to hold fetched product data

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/product/all') // Replace with your API endpoint
        if (!response.ok) {
          console.error('Failed to fetch products')
          return
        }
        const data = await response.json()

        // Sort products by createdAt (descending) and get the top 3
        const sortedProducts = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)

        setProducts(sortedProducts) // Set the fetched and sorted products data in the state
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, []) // Empty dependency array means this effect runs only once on mount

  return (
    <div className="resource-two" id="card3">
      <h2>Got Something You Need?</h2>
      <div className="card3-container">
        {/* Map through the top 3 sorted products and create a card for each product */}
        {products.length > 0 ? (
          products.map((product) => (
            <div className="card3-content" key={product._id}>
              <div className="product-image">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/150'} // Use product image or fallback image
                  alt={product.name}
                />
              </div>

              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-condition">
                  Condition: {product.condition}
                </p>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-owner">Owner: {product.owner.username}</p>
                <p className="product-barter">
                  Barter Requirement:{' '}
                  {product.barterRequirement || 'Not Available'}
                </p>
                <p className="product-barter-category">
                  Barter Category: {product.barterCategory || 'Not Available'}
                </p>
                <p className="product-created-at">
                  Created At: {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
              <TradeButton productId={product._id} />
            </div>
          ))
        ) : (
          <p className="no-products">No products available</p>
        )}
      </div>
    </div>
  )
}

export default Card3
