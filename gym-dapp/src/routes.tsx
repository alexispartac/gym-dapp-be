import { Routes, Route, } from 'react-router-dom'
import Feed from './pages/Feed';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Routines from './pages/Routines';
import Exercises from './pages/Exercises';
import Profile from './pages/Profile';
import Workout from './pages/Workout';
import Notifications from './pages/Notifications';
import Wallet from './pages/Wallet';


const RoutesOfPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/routines" element={<Routines />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/workout" element={<Workout />} />
      <Route path="/notification" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default RoutesOfPages;
