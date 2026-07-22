import {Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Previous from './pages/Previous'
import Navbar from './components/ui/Navbar'
import Meetings from './pages/Meetings'


function App() {
  

  return (
    <>
      <Navbar />


      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/showmeetings' element={<Meetings/>} />
        <Route path='/previous' element={<Previous/>} />
        <Route path='*' element={<Error/>} />
      </Routes>

      
    </>
  )
}

export default App
