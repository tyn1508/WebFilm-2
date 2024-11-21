import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDQ2ZjRlMjQxNDllZjAwYzFjOGQ3OGViZjU3M2QwNiIsIm5iZiI6MTczMjE3NDE2NC45NTM0Mywic3ViIjoiNjcyYTFjZjM4M2U2MmYwNWM2YjU3YzQyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.20QD5mu_EXjnwxKrK1NIlvRguQ5-mOd0cuO7DyEMXRc',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setApiData(data.results[0]);
        }
      } catch (err) {
        console.error('Error fetching video data:', err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={() => { navigate(-2) }} />
      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`}
        width="90%"
        height="90%"
        title={apiData.name || 'Trailer'}
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at || "N/A"}</p>
        <p>{apiData.name || "N/A"}</p>
        <p>{apiData.type || "N/A"}</p>
      </div>
    </div>
  );
};

export default Player;
