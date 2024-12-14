import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Middleware to verify JWT
const auth = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Access denied!' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findOne({ email: decoded.email }).select('-password')
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token', error: error })
  }
}

// Middleware for role checking
const isAdmin = (req, res, next) => {
  const { user } = req // Assuming `user` is set in req by authentication middleware
  if (user?.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' })
  }
  next()
}

export { auth, isAdmin }
