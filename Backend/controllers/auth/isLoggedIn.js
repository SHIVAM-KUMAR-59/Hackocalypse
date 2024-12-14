import jwt from 'jsonwebtoken'
import User from '../../models/User.js'

const isLoggedIn = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.header('Authorization')
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Access denied! No token provided.' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Access denied! Invalid token format.' })
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Fetch the user from the database
    const user = await User.findOne({ email: decoded.email }).select(
      '-password',
    )
    if (!user) {
      return res.status(404).json({ message: 'User not found!' })
    }

    // Respond with success and user data
    res.status(200).json({
      message: 'User is logged in.',
      user,
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: 'Invalid token or user not logged in.',
      error: error.message,
    })
  }
}

export default isLoggedIn
