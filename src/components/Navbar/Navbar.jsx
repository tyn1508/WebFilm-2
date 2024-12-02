import React, { useRef, useEffect, useState } from 'react';
import './Navbar.css';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { db } from '../../firebase'; // Nhập Firestore
import { collection, query, where, getDocs } from 'firebase/firestore'; // Nhập các phương thức Firestore
import { auth } from '../../firebase'; // Nhập Firebase auth

const Navbar = () => {
    const navbarRef = useRef();
    const [userName, setUserName] = useState('');
    const [ setEmail] = useState('');

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

    useEffect(() => {
        const user = auth.currentUser ; // Lấy thông tin người dùng hiện tại
        if (user) {
            setEmail(user.email); // Lưu email của người dùng
            fetchUserNameByEmail(user.email); // Gọi hàm để lấy tên người dùng
        }
    }, []);

    // Hàm để lấy tên người dùng từ Firestore dựa trên email
    const fetchUserNameByEmail = async (email) => {
        const usersRef = collection(db, 'user'); // Tham chiếu đến bộ sưu tập users
        const q = query(usersRef, where('email', '==', email)); // Tạo truy vấn

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    setUserName(userData.name); // Cập nhật trạng thái tên người dùng
                });
            } else {
                console.log("Không tìm thấy người dùng với email:", email);
            }
        } catch (error) {
            console.error("Lỗi khi lấy tên người dùng:", error);
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
                <p>Chào mừng, {userName || 'Khách'}</p> {/* Hiển thị tên người dùng */}
                <img src={bell_icon} className='icons' alt="" />
                <div className="navbar_profile">
                    <img src={profile_img} className='profile' alt="" />
                    <img src={caret_icon} className='' alt="" />
                    <div className="dropdown">
                        <p>Profile</p>
                        <p>Settings</p>
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