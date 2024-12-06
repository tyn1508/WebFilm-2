import { useEffect } from "react"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Player from "./pages/Player/Player"
import Update from "./pages/Update/Update"

import { Routes, Route, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"

const App = () => {
const navigate = useNavigate();
  
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged In");
      // Chỉ điều hướng đến '/' nếu đang ở trang '/login'
      if (window.location.pathname === '/login') {
        navigate('/');
      }
    } else {
      console.log("Logged Out");
      // Chỉ điều hướng đến '/login' nếu không ở trang '/update'
      if (window.location.pathname !== '/login' && window.location.pathname !== '/update') {
        navigate('/login');
      }
    })
  },[])
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='player/:id' element={<Player />} />
        <Route path='/update' element={<Update />}></Route>
      </Routes>
    </div>
  )
}

export default App