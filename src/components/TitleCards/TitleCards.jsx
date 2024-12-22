import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import { addFavorite, removeFavorite, auth, getFavorites } from '../../firebase';

const TitleCards = ({ title, category, searchTerm }) => {
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user);
                const userFavorites = await getFavorites(user.uid);
                setFavorites(userFavorites);
            } else {
                setCurrentUser(null);
                setFavorites([]); // Reset favorites if no user is logged in
            }
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            let url;

            if (searchTerm) {
                url = `https://api.themoviedb.org/3/search/movie?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi&query=${searchTerm}`;
            } else {
                switch (category) {
                    case 'trending_today':
                        url = `https://api.themoviedb.org/3/trending/movie/day?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi`;
                        break;
                    case 'trending_week':
                        url = `https://api.themoviedb.org/3/trending/movie/week?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi`;
                        break;
                    case 'discover_action':
                        url = `https://api.themoviedb.org/3/discover/movie?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi&with_genres=28`;
                        break;
                    case 'discover_comedy':
                        url = `https://api.themoviedb.org/3/discover/movie?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi&with_genres=35`;
                        break;
                    default:
                        url = `https://api.themoviedb.org/3/movie/${category}?api_key=2d46f4e24149ef00c1c8d78ebf573d06&language=vi`;
                }
            }

            try {
                const response = await axios.get(url);
                setMovies(response.data.results.slice(0, 30)); // Limit to 30 movies
            } catch (error) {
                console.error('Error fetching the movies:', error);
            }
        };

        fetchMovies();
    }, [category, searchTerm]);

    const toggleFavorite = async (movie) => {
        if (!currentUser || !currentUser.uid) {
            alert("Vui lòng đăng nhập để thêm phim vào danh sách yêu thích.");
            return;
        }

        if (!movie || !movie.id) {
            console.error("Movie is undefined or does not have an ID.");
            return;
        }

        const isFavorite = favorites.some(fav => fav.itemId === movie.id);

        try {
            if (isFavorite) {
                const favoriteToRemove = favorites.find(fav => fav.itemId === movie.id);
                await removeFavorite(favoriteToRemove.id); // Xóa khỏi Firestore
                const updatedFavorites = favorites.filter(fav => fav.itemId !== movie.id);
                setFavorites(updatedFavorites);
                console.log(`${movie.title} đã được xóa khỏi danh sách yêu thích.`);
            } else {
                await addFavorite(currentUser.uid, movie.id); // Thêm vào Firestore
                const updatedFavorites = [...favorites, { itemId: movie.id, title: movie.title }];
                setFavorites(updatedFavorites);
                console.log(`${movie.title} đã được thêm vào danh sách yêu thích.`);
            }
        } catch (error) {
            console.error("Lỗi khi thay đổi yêu thích:", error);
        }
    };
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
                                <div className="button-group"> {/* Nhóm các nút */}
                                    <Link to={`/player/${movie.id}`}>
                                        <button className="play-button">Play</button> {/* Nút Play */}
                                    </Link>
                                    <button onClick={() => toggleFavorite(movie)}>
                                        {Array.isArray(favorites) && movie && movie.id && favorites.some(fav => fav.itemId === movie.id) ? 'Đã theo dõi' : 'Theo dõi'}
                                    </button>
                                </div>
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