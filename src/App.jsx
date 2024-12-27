import { useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Đảm bảo đường dẫn đúng
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import Update from "./pages/Update/Update";
import Favorites from './pages/Favorites/Favorites';
import ResetPass from './pages/ResetPassword/ResetPass';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
        // Chỉ điều hướng đến '/' nếu đang ở trang '/login'
        if (window.location.pathname === '/login') {
          navigate('/');
        }
      } else {
        console.log("Logged Out");
        // Chỉ điều hướng đến '/login' nếu không ở trang '/update'
        if (window.location.pathname !== '/login' && window.location.pathname !== '/update' && window.location.pathname !== '/reset-password') {
          navigate('/login');
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path='/update' element={<Update />} />
        <Route path='/favorites' element={<Favorites />} /> 
        <Route path='/reset-password' element={<ResetPass />} />
      </Routes>
    </div>
  );
}

export default App;