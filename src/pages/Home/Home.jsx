import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import './Home.css';

import hero_banner from '../../assets/hero_banner.jpg';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isTvShowSearch, setIsTvShowSearch] = useState(false); // Trạng thái để theo dõi loại tìm kiếm

  const categories = [
    { title: 'Phim Phổ Biến', category: 'popular' },
    { title: 'Phim Đánh Giá Cao', category: 'top_rated' },
    { title: 'Phim Đang Chiếu', category: 'now_playing' },
    { title: 'Phim Thịnh Hành (Hôm Nay)', category: 'trending_today' },
    { title: 'Phim Thịnh Hành (Tuần)', category: 'trending_week' },
    { title: 'Phim Hành Động', category: 'discover_action' }, 
    { title: 'Phim Hài Hước', category: 'discover_comedy' }, 
  ];

  const handleTvShowClick = () => {
    setSearchTerm(''); // Đặt lại searchTerm
    setIsTvShowSearch(true); // Đặt trạng thái tìm kiếm TV Shows
  };

  const handleLogoClick = () => {
    setSearchTerm(''); // Đặt lại searchTerm về chuỗi rỗng
    setIsTvShowSearch(false); // Đặt lại trạng thái tìm kiếm TV Shows
  };

  return (
    <div className="home">
      <Navbar onSearch={setSearchTerm} onTvShowClick={handleTvShowClick} onLogoClick={handleLogoClick} />
      {/* Ẩn banner nếu có searchTerm hoặc đang tìm kiếm TV Shows */}
      {!searchTerm && !isTvShowSearch && (
        <div className="hero">
          <img src={hero_banner} alt="hero banner" className="banner-img" />
          <div className="hero_caption">
            <div className="hero_btns">
              <button className="btn">
                <img src={play_icon} alt="Play"/> Play
              </button>
              <button className="btn dark_btn">
                <img src={info_icon} alt="More Info" /> More Info
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="more_cards">
        {searchTerm ? (
          <TitleCards title="Kết quả tìm kiếm" category="search" searchTerm={searchTerm} />
        ) : isTvShowSearch ? (
          <TitleCards title="Kết quả TV Shows" category="tv" searchTerm={searchTerm} /> // Hiển thị kết quả TV Shows
        ) : (
          categories.map((cat, index) => (
            <TitleCards key={index} title={cat.title} category={cat.category} searchTerm={searchTerm} />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;