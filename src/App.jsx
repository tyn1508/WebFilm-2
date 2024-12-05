import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import Profile from "./pages/Profile/Profile"; // Import Profile component

import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null); // State để lưu tên người dùng
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In");
        setUserName(user.displayName || ''); // Gán giá trị mặc định nếu không có displayName
        navigate('/'); // Điều hướng đến trang chính khi đăng nhập
      } else {
        console.log("Logged Out");
        setUserName(null);
        navigate('/login'); // Điều hướng đến trang đăng nhập khi đăng xuất
      }
    });

    return () => unsubscribe(); // Dọn dẹp subscription khi component unmount
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='player/:id' element={<Player />} />
       
      </Routes>
    </div>
  )
}

export default App;