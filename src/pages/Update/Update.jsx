import { useState, useEffect } from 'react';
import './Update.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

import { auth, db } from '../../firebase';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser ;
    if (user) {
      setEmail(user.email);
      fetchUserNameByEmail(user.email);
    }
  }, []);

  const fetchUserNameByEmail = async (email) => {
    // Đảm bảo rằng email không phải là null hoặc rỗng
    if (!email) {
        console.error("Email không hợp lệ.");
        return;
    }

    // Sử dụng tên collection chính xác
    const usersRef = collection(db, 'user'); // Đảm bảo tên collection là 'user'
    const q = query(usersRef, where('email', '==', email));

    try {
        console.log("Fetching user name for email:", email); // Log email để kiểm tra

        // Lấy danh sách tài liệu từ Firestore
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Giả sử chỉ cần tên từ tài liệu đầu tiên
            const doc = querySnapshot.docs[0];
            const userData = doc.data();

            // Cập nhật tên người dùng
            setUsername(userData.name);
            console.log("Tên người dùng đã được cập nhật:", userData.name);
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
        // Xác thực mật khẩu hiện tại
        if (currentPassword) {
          const credential = EmailAuthProvider.credential(user.email, currentPassword);
          await reauthenticateWithCredential(user, credential);
        }

        // Cập nhật tên hiển thị
        await updateProfile(user, {
          displayName: username,
        });

        // Cập nhật mật khẩu nếu có
        if (newPassword && newPassword === confirmPassword) {
          await updatePassword(user, newPassword);
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
      <img src={back_arrow_icon} alt="Back" onClick={() => { navigate(-1) }} />
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