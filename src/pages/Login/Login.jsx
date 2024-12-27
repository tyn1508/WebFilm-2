import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../../firebase'; // Import các hàm từ firebase
import './Login.css'; // Import file CSS cho trang Login

const Login = () => {
    const [signState, setSignState] = useState("Đăng nhập"); // Trạng thái đăng nhập hoặc đăng ký
    const [name, setName] = useState(""); // Tên người dùng
    const [email, setEmail] = useState(""); // Email người dùng
    const [password, setPassword] = useState(""); // Mật khẩu người dùng
    const navigate = useNavigate(); // Khởi tạo navigate để điều hướng

    // Hàm xử lý đăng nhập hoặc đăng ký
    const userAuth = async (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form
        if (signState === "Đăng nhập") {
            await login(email, password); // Gọi hàm đăng nhập
        } else {
            await signup(name, email, password); // Gọi hàm đăng ký
        }
    };

    return (
        <div className='login'>
            <div className='login_form'>
                <h1>{signState}</h1>
                <form onSubmit={userAuth}>
                    {signState === "Đăng ký" && (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Tên đăng nhập'
                            required
                        />
                    )}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Gmail'
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Mật khẩu'
                        required
                    />
                    <button type='submit'>
                        {signState}
                    </button>

                    <div className="form_help">
                        <div className="remember">
                            <label htmlFor="">Lưu mật khẩu</label>
                            <input type="checkbox" />
                        </div>
                        {signState === "Đăng nhập" && (
                            <p onClick={() => navigate('/reset-password')} >
                                Quên mật khẩu?
                            </p>
                        )}
                    </div>
                </form>
                <div className="form_switch">
                    {signState === "Đăng nhập" ? (
                        <p>
                            Chưa có tài khoản? <span onClick={() => setSignState("Đăng ký")} >Đăng ký ngay.</span>
                        </p>
                    ) : (
                        <p>
                            Đã có tài khoản? <span onClick={() => setSignState("Đăng nhập")} >Đăng nhập ngay</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;