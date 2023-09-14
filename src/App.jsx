import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/Homepage/Homepage'
import SeeAllCities from './Pages/SeeAllCities/SeeAllCities'
import CityDetails from './Pages/CityDetails/CityDetails'
import HomeDetails from './Pages/HomeDetails/HomeDetails'
import  ShortlistContextProvider from './Contexts/Shortlist'

function App() {

  return (
    <BrowserRouter>
    <ShortlistContextProvider>
    <Routes>
    <Route path='/' element={<Homepage/>}/>
      <Route path='/seeallcities' element={<SeeAllCities/>}/>
      <Route path='/properties/city/:cityId' element={<CityDetails/>}/>
      <Route path='/properties/:propertyId' element={<HomeDetails/>}/>
    </Routes>
    </ShortlistContextProvider>
    </BrowserRouter>
  )
}

export default App
