import React from 'react'
import NavBar from './components/NavBar'
import { Routes, Route } from "react-router-dom";
import Aboutus from './components/Aboutus';
import ImageDetection from './components/ImageDetection';
import NoPage from './components/NoPage';
import RealTimeDetection from './components/RealTimeDetection';
import Home from './components/Home';

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/image-detection" element={<ImageDetection />} />
          <Route path="/real-time-detection" element={<RealTimeDetection />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  )
}

export default App