import React, { useEffect, useState } from 'react';
import { auth, getFavorites, removeFavoriteAndMovie } from '../../firebase'; // Đảm bảo bạn đã import các hàm từ firebase
import { Link } from 'react-router-dom';
import './Favorites.css'; // Import file CSS nếu cần

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm lấy danh sách yêu thích
    const fetchFavorites = async (userId) => {
        try {
            const userFavorites = await getFavorites(userId);
            setFavorites(userFavorites);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                await fetchFavorites(user.uid);
            } else {
                setFavorites([]);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // Hàm hiển thị danh sách yêu thích
    const renderFavorites = () => {
        if (favorites.length === 0) {
            return <p>Không có phim nào trong danh sách yêu thích.</p>;
        }

        return (
            <ul>
                {favorites && favorites.length > 0 ? (
                    favorites.map((fav) => (
                        <li key={fav.id}>
                            <Link to={`/player/${fav.itemId}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                                    alt={fav.title}
                                />
                                <h3>{fav.title}</h3>
                            </Link>
                            <button onClick={() => handleRemoveFavorite(fav.id)}>Xóa</button>
                        </li>
                    ))
                ) : (
                    <p>Không có mục yêu thích nào.</p>
                )}
            </ul>
        );
    };

    // Hàm xử lý xóa phim khỏi danh sách yêu thích
    const handleRemoveFavorite = async (favoriteId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phim này khỏi danh sách yêu thích?")) {
            await removeFavoriteAndMovie(favoriteId);
            setFavorites(favorites.filter(fav => fav.id !== favoriteId));
        }
    };

    if (loading) {
        return <p>Đang tải danh sách yêu thích...</p>;
    }

    return (
        <div className="favorites">
            <h2>Danh sách phim yêu thích</h2>
            {renderFavorites()}
        </div>
    );
};

export default Favorites;