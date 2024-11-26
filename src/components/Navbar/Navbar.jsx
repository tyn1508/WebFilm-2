import React, { useRef, useEffect } from 'react';
import './Navbar.css';

import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
    const navbarRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                navbarRef.current.classList.add('nav-dark');
            } else {
                navbarRef.current.classList.remove('nav-dark');
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='navbar' ref={navbarRef}> {/* Thêm ref vào navbar */}
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
                        <p onClick={()=>{logout()}}>
                            Logout
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;