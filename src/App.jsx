import { useState } from 'react'
import Navbar from './components/Navbar'
import Movies from './pages/Movies'
import Series from './pages/Series'

function App() {
  const [currentPage, setCurrentPage] = useState('movies'); // 'movies' or 'series'

  return (
    <div className="min-h-screen bg-[#E5E5E5]">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="pt-4">
        {currentPage === 'movies' ? <Movies /> : <Series />}
      </div>
    </div>
  )
}

export default App
