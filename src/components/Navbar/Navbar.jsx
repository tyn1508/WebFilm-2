import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';

import { auth, logout } from '../../firebase';

const Navbar = ({onSearch}) => {
    const navbarRef = useRef();
    const navigate = useNavigate(auth);
    const [searchTerm, setSearchTerm] = useState('');
  

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
    }, [navigate]);

    const handleProfileClick = () => {
        console.log("Profile clicked");
        if (auth.currentUser ) {
            navigate('/update');
        } else {
            console.log("User  not logged in");
            navigate('/login');
        }
    };

    const handleSearch = () => {
        // Gọi hàm onSearch để truyền searchTerm lên Home
        onSearch(searchTerm);
        setSearchTerm('');
    };

    return (
        <div className='navbar' ref={navbarRef}>
            <div className="navbar_left">
                <div className="layout_logoText">
                    FilmLag
                </div>
                <ul className="layout_menu">
                    <li>Trang chủ</li>
                    <li>Tv Shows</li>
                    <li>Movies</li>
                    <li>Danh sách yêu thích</li>
                    <li>FAQ</li>
                </ul>
            </div>
            <div className="navbar_right">
                <input 
                    type="text" 
                    placeholder='Tìm kiếm' 
                    className='search_film'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(); // Gọi hàm tìm kiếm khi nhấn Enter
                        }
                    }}
                />
                <img 
                    src={search_icon} 
                    className='icons' 
                    alt="" 
                    onClick={handleSearch} 
                />
                
                <img src={bell_icon} className='icons' alt="" />
                <div className="navbar_profile">
                    <img src={profile_img} className='profile' alt="" />
                    <img src={caret_icon} className='' alt="" />
                    <div className="dropdown">
                        <p onClick={handleProfileClick}>
                            ProFile
                        </p>
                        <p onClick={logout}>
                            Logout
                        </p>
                    </div>
                </div>
            </div>
         
        </div>
    );
}

export default Navbar;