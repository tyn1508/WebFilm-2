import { useEffect, useState } from 'react';
import { auth, getFavorites, removeFavoriteAndMovie } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import './Favorites.css';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
            <ul className="favorites-list">
                {favorites.map((fav) => (
                    <li key={fav.id} className="favorite-item">
                        <Link to={`/player/${fav.itemId}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                                alt={fav.title}
                                className="movie-poster" // Thêm lớp cho hình ảnh phim
                            />
                            <h3>{fav.title}</h3>
                        </Link>
                        <button className="favorite-button" onClick={() => handleRemoveFavorite(fav.id)}>
                            Xóa
                        </button>
                    </li>
                ))}
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
            <img className="img_button" src={back_arrow_icon} alt="Back" onClick={() => { navigate(-1) }} />
            <h2>Danh sách phim yêu thích</h2>
            {renderFavorites()}

        </div>
    );
};

export default Favorites;