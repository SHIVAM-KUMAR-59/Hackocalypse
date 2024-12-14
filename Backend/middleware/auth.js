import jwt from 'jsonwebtoken'
import User from '../models/User'

// Middleware to verify JWT
const auth = async (req, res, next) => {
  const token = req.header('Authorization')
  if (!token)
    return res.status(401).json({ message: 'Access denied, no token provided' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password') // Exclude password
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' })
  }
}

// Middleware for role checking
const roleCheck = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' })
  }
  next()
}

export { auth, roleCheck }
