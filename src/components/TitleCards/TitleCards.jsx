import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category, searchTerm }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      let url;

      // Nếu có từ khóa tìm kiếm, sử dụng API tìm kiếm
      if (searchTerm) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi&query=${searchTerm}`;
      } else {
        // Handle different category types
        switch (category) {
          case 'trending_today':
            url = `https://api.themoviedb.org/3/trending/movie/day?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi`;
            break;
          case 'trending_week':
            url = `https://api.themoviedb.org/3/trending/movie/week?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi`;
            break;
          case 'discover_action':
            url = `https://api.themoviedb.org/3/discover/movie?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi&with_genres=28`; // Genre: Action
            break;
          case 'discover_comedy':
            url = `https://api.themoviedb.org/3/discover/movie?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi&with_genres=35`; // Genre: Comedy
            break;
          default:
            url = `https://api.themoviedb.org/3/movie/${category}?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi`;
        }
      }

      try {
        const response = await axios.get(url);
        setMovies(response.data.results.slice(0, 30)); // Fetch the first 30 movies
      } catch (error) {
        console.error('Error fetching the movies:', error);
      }
    };

    fetchMovies();
  }, [category, searchTerm]); // Thêm searchTerm vào dependency array

  return (
    <div className="title-cards">
      <h2>{searchTerm ? 'Kết quả tìm kiếm' : title}</h2>
      <div className="card-list">
        <Swiper spaceBetween={30} slidesPerView={6}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <SwiperSlide key={movie.id} className="card">
                <Link style={{ textDecoration: "none" }} to={`/player/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="card">
              <h3>Không tìm thấy phim nào.</h3>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default TitleCards;