import React, { useEffect, useState } from 'react';
import { auth, getFavorites, removeFavoriteAndMovie } from '../../firebase';
import { Link } from 'react-router-dom';
import './Favorites.css'; // Import file CSS

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const renderFavorites = () => {
        if (favorites.length === 0) {
            return <p>Không có phim nào trong danh sách yêu thích.</p>;
        }

        return (
            <ul>
                {favorites.map((fav) => (
                    <li key={fav.id}>
                        <Link to={`/player/${fav.itemId}`}>
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`} 
                                alt={fav.title}
                            />
                            <h3>{fav.title}</h3>
                        </Link>
                        <button onClick={() => handleRemoveFavorite(fav.id, fav.itemId)}>Xóa</button>
                    </li>
                ))}
            </ul>
        );
    };

    const handleRemoveFavorite = async (favoriteId, movieId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phim này khỏi danh sách yêu thích?")) {
            await removeFavoriteAndMovie(favoriteId, movieId);
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