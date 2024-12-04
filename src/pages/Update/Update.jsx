import { useState, useEffect } from 'react';
import './Update.css';
import { auth, db } from '../../firebase'; 
import { updateProfile } from "firebase/auth";
import { collection, query, where, getDocs } from 'firebase/firestore';

const Update = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    const user = auth.currentUser ; 
    if (user) {
      setEmail(user.email);
      fetchUserNameByEmail(user.email); 
    }
  }, []);

  // Hàm để lấy tên người dùng từ Firestore dựa trên email
  const fetchUserNameByEmail = async (email) => {
    const usersRef = collection(db, 'user');
    const q = query(usersRef, where('email', '==', email));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUsername(userData.name); 
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

    if (user) {
      try {
     
        await updateProfile(user, {
          displayName: username, 

        });

       
        if (newPassword && newPassword === confirmPassword) {
          await user.updatePassword(newPassword);
         
        }

        console.log('Cập nhật thông tin thành công:', { username, email });
        setIsEditing(false); 
    
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin:", error);
        alert(error.message); 
 
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