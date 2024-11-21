import React, { useState } from 'react';
import './Login.css'
// import {login, signup} from '../../firebase'
const Login = () => {

  const [signState, setsignState] = useState("Đăng nhập");

  return (
    <div className='login'>
      <div className='login_form'>
        <h1>{signState}</h1>
        <form >
          {signState === "Đăng ký" ? <input type="text" placeholder='Tên đăng nhập' /> : <> </>}

          <input type="email" placeholder='Gmail' />

          <input type="password" placeholder='Mật khẩu' />
          <button>{signState}</button>
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
            <p>Chưa có tài khoản <span onClick={()=>
              setsignState("Đăng ký")
            }>Đăng ký ngay.</span></p>
            : <p>Đã có tài khoản. <span onClick={()=>
              setsignState("Đăng nhập")
            }>Đăng nhập ngay</span></p>
          }
        </div>
      </div>
    </div>
  )
}
import './Login.css'

export default Login
