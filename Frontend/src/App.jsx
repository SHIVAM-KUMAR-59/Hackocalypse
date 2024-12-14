import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './component/Home/Home'
import Login from './component/Login/Login'
import Register from './component/Login/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
