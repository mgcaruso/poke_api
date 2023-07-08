import { Route, Routes } from 'react-router-dom'
import Index from './components/Index/Index'
import './App.css'
import Navbar from './components/Navbar/Navbar'

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} ></Route>
      

      </Routes>
    </>
  )
}

export default App
