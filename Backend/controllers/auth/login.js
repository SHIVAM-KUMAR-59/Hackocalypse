import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../../models/User.js'

const loginUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Please fill in all fields' })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).send({ message: 'No user Found' })
    }

    const userPassword = user.password
    const isValidPassword = await bcrypt.compare(password, userPassword)

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' })
    }

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

    res.status(200).send({
      message: 'User Logged In Successfully',
      data: user,
      token: token,
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error finding user', error: error.message })
  }
}

export default loginUser
