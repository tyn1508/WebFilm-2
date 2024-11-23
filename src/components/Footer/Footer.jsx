import './Footer.css';
import Home from '../../pages/Home/Home';
import youtube_icon from '../../assets/youtube_icon.png';
import twitter_icon from '../../assets/twitter_icon.png';
import instagram_icon from '../../assets/instagram_icon.png';
import facebook_icon from '../../assets/facebook_icon.png';

const Footer = () => {
  return (
    <div className="footer">
      <h3>Phim chất lượng cao online của <span className="highlight" href= "Home.jsx">FilmLag </span>khác gì so với các trang phim khác?</h3>
      <ul>
        <li>Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân giải HD (720p) là cao nhất.</li>
        <li>Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần phim online thông thường - đây là yếu tố quyết định độ nét của phim (thậm chí còn quan trọng hơn độ phân giải).</li>
        <li>Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang phim khác (kể cả Youtube).</li>
        <li>Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải cao.</li>
        <li>Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề của riêng mình để xem online.</li>
        <li>Có lựa chọn hiện phụ đề song ngữ (tức hiện đồng thời cả tiếng Anh & tiếng Việt), phù hợp với những người muốn học tiếng Anh qua phụ đề phim.</li>
      </ul>
      <div className="footer_icon">
        <img src={youtube_icon} alt="YouTube" />
        <img src={twitter_icon} alt="Twitter" />
        <img src={instagram_icon} alt="Instagram" />
        <img src={facebook_icon} alt="Facebook" />
      </div>
    </div>
  );
};

export default Footer;
