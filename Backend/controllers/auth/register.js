import jwt from 'jsonwebtoken'
import User from '../../models/User.js'
import bcrypt from 'bcrypt'

const registerUser = async (req, res) => {
  const { username, email, password } = req.body

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    if (!user) {
      return res.status(500).json({ message: 'Error creating user' })
    }

    await user.save()

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    if (!token) {
      return res.status(500).json({ message: 'Error generating token' })
    }

    // Set token in the cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    })

    return res
      .status(201)
      .json({ message: 'User created successfully', data: user, token: token })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error })
  }
}

export default registerUser
