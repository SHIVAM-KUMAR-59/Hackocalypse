import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './component/Home/Home'
import Login from './component/Login/Login'
import Register from './component/Login/Register'
import TradeHub from './component/TradeHub/TradeHub'
import Article from './component/Article/Article'
import MyTrade from './component/MyTrades/MyTrade'
import MyArticles from './component/MyArticles/MyArticles'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trade-hub" element={<TradeHub />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="my-trades" element={<MyTrade />} />
        <Route path="my-articles" element={<MyArticles />} />
      </Routes>
    </Router>
  )
}

export default App
