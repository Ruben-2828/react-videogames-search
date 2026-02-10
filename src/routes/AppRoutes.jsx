import { Route, Routes } from 'react-router-dom'
import HomeView from '../views/HomeView'
import VideogameDetailView from '../views/VideogameDetailView'
import NotFoundView from '../views/NotFoundView'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/games/:gameId" element={<VideogameDetailView />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}

export default AppRoutes
