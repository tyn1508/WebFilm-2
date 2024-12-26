import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../firebase'; // Import hàm resetPassword từ firebase
import './ResetPass.css';

const ResetPass = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        await resetPassword(email);
        navigate('/login');
    };

    return (
        <div className="reset-password">
            <h1>Quên Mật Khẩu</h1>
            <form onSubmit={handleReset}>
                <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Gửi mã xác thực</button>
            </form>
        </div>
    );
};

export default ResetPass;