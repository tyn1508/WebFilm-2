import React, { useState, useEffect } from 'react';
import './Update.css';
import { auth, db } from '../../firebase'; // Nhập auth và db từ firebase
import { updateProfile } from "firebase/auth";
import { collection, query, where, getDocs } from 'firebase/firestore'; // Nhập các phương thức Firestore

const Update = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // Mật khẩu hiện tại
  const [newPassword, setNewPassword] = useState(''); // Mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(''); // Xác nhận mật khẩu mới
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa

  useEffect(() => {
    const user = auth.currentUser ; // Lấy thông tin người dùng hiện tại
    if (user) {
      setEmail(user.email); // Gán email
      fetchUserNameByEmail(user.email); // Gọi hàm để lấy tên người dùng
    }
  }, []);

  // Hàm để lấy tên người dùng từ Firestore dựa trên email
  const fetchUserNameByEmail = async (email) => {
    const usersRef = collection(db, 'user'); // Tham chiếu đến bộ sưu tập users
    const q = query(usersRef, where('email', '==', email)); // Tạo truy vấn

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUsername(userData.name); // Cập nhật trạng thái tên người dùng
        });
      } else {
        console.log("Không tìm thấy người dùng với email:", email);
      }
    } catch (error) {
      console.error("Lỗi khi lấy tên người dùng:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser ; 
    // Lấy thông tin người dùng hiện tại

    if (user) {
      try {
        // Cập nhật tên hiển thị
        await updateProfile(user, {
          displayName: username, 
          // Cập nhật tên người dùng
        });

        // Cập nhật mật khẩu
        if (newPassword && newPassword === confirmPassword) {
          await user.updatePassword(newPassword);
           // Cập nhật mật khẩu mới
        }

        console.log('Cập nhật thông tin thành công:', { username, email });
        setIsEditing(false); 
        // Đóng chế độ chỉnh sửa
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin:", error);
        alert(error.message); 
        // Hiển thị thông báo lỗi
      }
    }
  };

  return (
    <div className='update'>
      <div className="update_form">
        <h1>Cập nhật thông tin</h1>
        <form onSubmit={handleSubmit}>
          {isEditing ? (
            <input 
              type="text" 
              placeholder='Tên đăng nhập' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          ) : (
            <div>
              <strong>Tên đăng nhập:</strong> {username} 
            </div>
          )}
          
          <div>
            <strong>Email:</strong> {email}
          </div>
          
          {isEditing && (
            <>
              <input 
                type="password" 
                placeholder='Mật khẩu hiện tại' 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                placeholder='Mật khẩu mới' 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                placeholder='Xác nhận mật khẩu mới' 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </>
          )}
          <button type='button' onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Hủy' : 'Cập nhật thông tin'}
          </button>
          {isEditing && <button type='submit'>Lưu thay đổi</button>}
        </form>
      </div>
    </div>
  );
}

export default Update;