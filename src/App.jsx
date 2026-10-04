import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Events from './pages/Events.jsx'
import EventDetails from './pages/EventDetails.jsx'
import Sports from './pages/Sports.jsx'
import Cities from './pages/Cities.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="sports" element={<Sports />} />
        <Route path="cities" element={<Cities />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
