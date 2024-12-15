import React, { useState, useEffect } from 'react'
import Navbar from '../Home/Navbar/Navbar'
import Footer from '../Home/Footer/Footer'
import './myTrade.css'

const MyTrade = () => {
  const [trades, setTrades] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filteredStatus, setFilteredStatus] = useState('All') // For filtering trades

  // Fetch user token from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      const token = parsedUser.token || null

      if (token) {
        setUser(parsedUser)
      } else {
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }, [])

  // Fetch trades data
  useEffect(() => {
    if (user && user.token) {
      const fetchTrades = async () => {
        try {
          setLoading(true)
          const response = await fetch('http://localhost:3000/api/trade/all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to fetch trades')
          }

          const data = await response.json()
          setTrades(data.trades || [])
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }

      fetchTrades()
    }
  }, [user])

  // Filter trades based on status
  const filteredTrades =
    filteredStatus === 'All'
      ? trades
      : trades.filter((trade) => trade.status === filteredStatus)

  return (
    <div>
      <Navbar />
      <div className="my-trade-container">
        <h1 className="my-trade-heading">My Trades</h1>
        <p className="my-trade-desc">
          Barter your resources, survival items, and more. A community-driven
          economy.
        </p>

        <div className="my-trade-filters">
          {['All', 'Pending', 'Accepted', 'Rejected'].map((status) => (
            <button
              key={status}
              className={`my-trade-filter-btn ${
                filteredStatus === status ? 'active' : ''
              }`}
              onClick={() => setFilteredStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="my-trade-loading">Loading...</p>
        ) : error ? (
          <p className="my-trade-error">{error}</p>
        ) : filteredTrades.length > 0 ? (
          <ul className="my-trade-list">
            {filteredTrades.map((trade, index) => (
              <li className="my-trade-item" key={index}>
                <p>
                  <span>Trade ID:</span> {trade.id}
                </p>
                <p>
                  <span>Amount:</span> {trade.amount}
                </p>
                <p>
                  <span>Status:</span> {trade.status}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="my-trade-no-trades">No trades available.</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default MyTrade
