import React, { useState } from 'react'

const TradeButton = ({ offeredProductId, requestedProductId }) => {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const handleTradeProposal = async () => {
    setLoading(true)
    setStatus(null)
    setShowPopup(true)

    try {
      const response = await fetch('http://localhost:3000/api/trade/propose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offeredProductId,
          requestedProductId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('Trade proposed successfully!')
      } else {
        setStatus(data.message || 'Error proposing trade')
      }
    } catch (error) {
      setStatus('Error proposing trade')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="product-actions">
      <button
        className="trade-button"
        onClick={handleTradeProposal}
        disabled={loading}
      >
        {loading ? 'Proposing Trade...' : 'Propose Trade'}
      </button>

      {showPopup && (
        <div className="trade-popup">
          <div className="popup-content">
            <p>{status}</p>
            <button onClick={() => setShowPopup(false)} className="close-popup">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TradeButton
