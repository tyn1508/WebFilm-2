import { useState } from 'react';
import './Login.css'
import { login, signup } from '../../firebase'
const Login = () => {

  const [signState, setsignState] = useState("Đăng nhập");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (event) => {
    event.preventDefault();
    if (signState === "Đăng nhập") {
      await login(email, password)
    }
    else {
      await signup(name, email, password)
    }
  }

  return (
    <div className='login'>
      <div className='login_form'>
        <h1>{signState}</h1>
        <form >
          {signState === "Đăng ký" ? <input type="text"
            value={name} onChange={(e) => {
              setName(e.target.value)
            }}
            placeholder='Tên đăng nhập' /> : <> </>}

          <input type="email"
            value={email} onChange={(e) => {
              setEmail(e.target.value)
            }}
            placeholder='Gmail' />

          <input type="password"
            value={password} onChange={(e) => {
              setPassword(e.target.value)
            }}
            placeholder='Mật khẩu' />
          <button onClick={user_auth} type='submit'>
            {signState}
          </button>

          <div className="form_help">
            <div className="remember">
              <label htmlFor="">Lưu mật khẩu</label>
              <input type="checkbox" />
            </div>
            <p>Hỗ trợ</p>
          </div>
        </form>
        <div className="form_switch">
          {signState === "Đăng nhập" ?
            <p>Chưa có tài khoản <span onClick={() =>
              setsignState("Đăng ký")
            }>Đăng ký ngay.</span></p>
            : <p>Đã có tài khoản. <span onClick={() =>
              setsignState("Đăng nhập")
            }>Đăng nhập ngay</span></p>
          }
        </div>
      </div>
    </div>
  )
}
export default Login
