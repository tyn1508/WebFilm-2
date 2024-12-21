import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';

import { auth, logout } from '../../firebase';

const Navbar = ({ onSearch }) => {
    const navbarRef = useRef();
    const navigate = useNavigate();
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
        if (auth.currentUser) {
            navigate('/update');
        } else {
            navigate('/login');
        }
    };

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            alert('Vui lòng nhập từ khóa tìm kiếm.');
            return;
        }
        try {
            const results = await onSearch(searchTerm);
            if (results.length === 0) {
                alert('Không tìm thấy kết quả nào.');
            }
        } catch (error) {
            console.error("Error during search:", error);
            alert('Đã xảy ra lỗi trong quá trình tìm kiếm.');
        }
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
                    <li >
                    <Link to="/favorites">Danh sách yêu thích</Link>
                    </li>
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
                    alt="Search" 
                    onClick={handleSearch} 
                />
                
                <img src={bell_icon} className='icons' alt="Notifications" />
                <div className="navbar_profile">
                    <img src={profile_img} className='profile' alt="Profile" />
                    <img src={caret_icon} className='caret' alt="Dropdown" />
                    <div className="dropdown">
                        <div className="dropdown-content">
                            <p onClick={handleProfileClick}>
                                Profile
                            </p>
                            <p onClick={logout}>
                                Logout
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;