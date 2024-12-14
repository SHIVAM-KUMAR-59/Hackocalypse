import Footer from './Footer/Footer'
import Hero from './Hero/Hero'
import './home.css'
import Navbar from './Navbar/Navbar'

function Home() {
  return (
    <>
      <div className="app">
        <Navbar />
        <div className="main-container">
          <Hero />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home
