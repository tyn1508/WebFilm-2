import React, { useRef, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import './Navbar.css';

import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';

import { auth, logout } from '../../firebase';

const Navbar = () => {
    const navbarRef = useRef();
    const navigate = useNavigate(auth);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                navbarRef.current.classList.add('nav-dark');
            } else {
                navbarRef.current.classList.remove('nav-dark');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleProfileClick = () => {
        console.log("Profile clicked");
        if (auth.currentUser) { // Chỉ điều hướng nếu người dùng đã đăng nhập
          navigate('/update');
        } else {
          console.log("User not logged in");
          navigate('/login');
        }
      };
      
    return (
        <div className='navbar' ref={navbarRef}>
            <div className="navbar_left">
                <div className="layout_logoText">
                    FilmLag
                </div>
                <ul>
                    <li>Trang chủ</li>
                    <li>Tv Shows</li>
                    <li>Movies</li>
                    <li>Danh sách yêu thích</li>
                    <li>FAQ</li>
                </ul>
            </div>
            <div className="navbar_right">
                <img src={search_icon} className='icons' alt="" />
                <p>Name</p>
                <img src={bell_icon} className='icons' alt="" />
                <div className="navbar_profile">
                    <img src={profile_img} className='profile' alt="" />
                    <img src={caret_icon} className='' alt="" />
                    <div className="dropdown">
                        <p onClick={() => {  handleProfileClick() }}>
                            ProFile
                        </p>
                        <p onClick={() => { logout() }}>
                            Logout
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;