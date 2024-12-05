import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; // Nhập Firebase auth và Firestore
import { doc, getDoc } from 'firebase/firestore';

import '..'

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser ; // Lấy thông tin người dùng hiện tại
      if (user) {
        const docRef = doc(db, 'user', user.uid);
         // Tham chiếu đến tài liệu người dùng
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
           // Cập nhật thông tin người dùng
        } else {
          console.log('Không tìm thấy thông tin người dùng');
        }
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className='profile'>
      <div className="update_form">
        <h1>Thông tin cá nhân</h1>
        <form action="">
          <input type="text" name="name" value={userInfo.name} placeholder="Tên" readOnly />
          <input type="text" name="email" value={userInfo.email} placeholder="Email" readOnly />
          <button>Đổi mật khẩu</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;