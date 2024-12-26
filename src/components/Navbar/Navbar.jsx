import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { auth, logout } from '../../firebase';

const Navbar = ({ onSearch, onTvShowClick, onLogoClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái cho hamburger menu
    const [searchTerm, setSearchTerm] = useState('');
    const navbarRef = useRef();
    const navigate = useNavigate();

    
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

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            alert('Vui lòng nhập từ khóa tìm kiếm.');
            return;
        }
        onSearch(searchTerm);
        setSearchTerm('');
    };

    const handleLogoClick = () => {
        onSearch('');
        onLogoClick();
        navigate('/');
    };

    const handleProfileClick = () => {
        if (auth.currentUser) {
            navigate('/update');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="navbar" ref={navbarRef}>
            <div className="navbar_left">
                <div className="layout_logoText" onClick={handleLogoClick}>
                    FilmLag
                </div>
                <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <ul className={`layout_menu ${isMenuOpen ? 'open' : ''}`}>
                    <li onClick={handleLogoClick}>Trang chủ</li>
                    <li onClick={onTvShowClick}>Tv Shows</li>
                    <li>Movies</li>
                    <li>
                        <Link to="/favorites">Danh sách yêu thích</Link>
                    </li>
                    <li>FAQ</li>
                </ul>
            </div>
            <div className="navbar_right">
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="search_film"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                />
                <img src={search_icon} className="icons" alt="Search" onClick={handleSearch} />
                <img src={bell_icon} className="icons" alt="Notifications" />
                <div className="navbar_profile">
                    <img src={profile_img} className="profile" alt="Profile" />
                    <img src={caret_icon} className="caret" alt="Dropdown" />
                    <div className="dropdown">
                        <p onClick={handleProfileClick}>Profile</p>
                        <p onClick={logout}>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
