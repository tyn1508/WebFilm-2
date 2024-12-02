import { useEffect } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import Update from "./pages/Update/Update";

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin vị trí hiện tại

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        // Nếu người dùng đã đăng nhập và đang ở trang login, điều hướng đến trang chính
        if (location.pathname === '/login') {
          navigate('/');
        }
      } else {
        console.log("Logged Out");
        // Nếu người dùng chưa đăng nhập và không phải ở trang login, điều hướng đến trang login
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    });

    // Cleanup function để hủy đăng ký khi component bị gỡ bỏ
    return () => unsubscribe();
  }, [navigate, location]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path='/update' element={<Update />} />
      </Routes>
    </div>
  );
};

export default App;