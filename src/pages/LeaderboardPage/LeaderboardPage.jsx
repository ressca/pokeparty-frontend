import { useState, useEffect } from 'react';
import './LeaderboardPage.css';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import Leaderboard from '../../components/Leaderboard/Leaderboard.jsx';

export default function LeaderboardPage() {
    const [rankingData, setRankingData] = useState([]);

    useEffect(() => {
        const fetchPopularity = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_POKEPARTY_API_URL}/popularity/`);
                let data = await res.json();

                data.sort((a, b) => b.elo - a.elo);
                setRankingData(data);
            } catch (error) {
                console.error("Failed to fetch popularity", error);
            }
        };


        fetchPopularity();
    }, []);

    return (
        <div className="leaderboardPageBody">
            <Header />
            <div className="mainContainer">
                <Leaderboard 
                    title={"Most liked pokemons By Elo"}
                    tableColumns={["Rank", "ID", "Image", "Name", "Types", "Elo"]}
                    startRankingData={rankingData}
                    isLeaderboardPage={true}
                />
            </div>
            <div className='footerContainer'>
                <Footer />
            </div>
        </div>
    );
}