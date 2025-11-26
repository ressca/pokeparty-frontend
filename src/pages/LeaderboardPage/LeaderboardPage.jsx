import './LeaderboardPage.css';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import Leaderboard from '../../components/Leaderboard/Leaderboard.jsx';

export default function LeaderboardPage() {
    return (
        <div className="leaderboardPageBody">
            <Header />
            <div className="mainContainer">
                <Leaderboard />
            </div>
            <div className='footerContainer'>
                <Footer />
            </div>
        </div>
    );
}