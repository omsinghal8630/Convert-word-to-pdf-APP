import React from 'react'
import Navbar from './component/Navbar'
import Home from './component/Home'
import Footer from './component/Footer'

const App = () => {
  return (
    <>
      <div className="bg-slate-950 text-white border">
      <Navbar />
      <Home />
      <Footer />
      </div>
    </>
  )
}

export default App

