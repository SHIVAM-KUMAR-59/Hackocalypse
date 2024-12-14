import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'

dotenv.config()

const app = express()
const server = http.createServer(app)

// Socket.IO server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type'], // Allow these headers
  },
})

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

// CORS configuration for Express
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}

app.use(cors(corsOptions)) // Apply the CORS configuration

app.use(express.json())

// Connect to MongoDB
;(async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,
      ssl: true,
    })
    console.log('Successfully Connected to Database')
  } catch (error) {
    console.error('Error Connecting to Database:', error)
    process.exit(1)
  }
})()

// Socket.IO events
io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('sendMessage', (message) => {
    console.log('Message from client:', message)
    io.emit('receiveMessage', message) // Broadcast message to all clients
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

// Routes
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import articleRoutes from './routes/articleRoutes.js'
import tradeRoutes from './routes/tradeRoutes.js'

app.use(authRoutes)
app.use(productRoutes)
app.use(articleRoutes)
app.use(tradeRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Start server with socket.io integrated
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
