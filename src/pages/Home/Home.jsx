import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import './Home.css';

import hero_banner from '../../assets/hero_banner.jpg';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';

const Home = () => {
  // Define all TMDB categories
  const categories = [
    { title: 'Phim Phổ Biến', category: 'popular' },
    { title: 'Phim Đánh Giá Cao', category: 'top_rated' },
    { title: 'Phim Đang Chiếu', category: 'now_playing' },
    { title: 'Phim Thịnh Hành (Hôm Nay)', category: 'trending_today' },
    { title: 'Phim Thịnh Hành (Tuần)', category: 'trending_week' },
    { title: 'Phim Hành Động', category: 'discover_action' }, // Example with genre filter
    { title: 'Phim Hài Hước', category: 'discover_comedy' }, // Example with genre filter
  ];

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="hero banner" className="banner-img" />
        <div className="hero_caption">
          <div className="hero_btns">
            <button className="btn">
              <img src={play_icon} alt="Play" /> Play
            </button>
            <button className="btn dark_btn">
              <img src={info_icon} alt="More Info" /> More Info
            </button>
          </div>
        </div>
      </div>
      <div className="more_cards">
        {categories.map((cat, index) => (
          <TitleCards key={index} title={cat.title} category={cat.category} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
