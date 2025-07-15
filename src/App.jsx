import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import Details from './pages/Details'
import Navbar from './Navbar.jsx'
import { Route, Routes } from 'react-router-dom' 
import Search from './pages/Search'
function App() {
  return (
    <>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<Favorite/>} />
        <Route path="/search" element={<Search />} />
        <Route path="/details/:idMeal" element={<Details/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
