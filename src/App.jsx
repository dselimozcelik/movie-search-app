import { useState } from 'react'
import Navbar from './components/Navbar'
import Movies from './pages/Movies'
import Series from './pages/Series'

function App() {
  const [currentPage, setCurrentPage] = useState('movies'); // 'movies' or 'series'

  return (
    <div className="min-h-screen bg-[#BFDBF7]">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      {currentPage === 'movies' ? <Movies /> : <Series />}
    </div>
  )
}

export default App
