import './FavoritesPage.css';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import Leaderboard from '../../components/Leaderboard/Leaderboard.jsx';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function FavoritesPage() {
    const { token } = useAuth();
    const [rankingData, setRankingData] = useState([]);

    useEffect(() => {
        const fetchFavoritePokemons = async () => {
            if (!token) {
                setRankingData([]);
                return;
            }
            try {
                const res = await fetch(`${import.meta.env.VITE_POKEPARTY_API_URL}/users/favorite-pokemons`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                if (!res.ok) throw new Error("Failed to load favorite pokemons");
                const favs = await res.json();
                setRankingData(favs);
            } catch (error) {
                console.error("Failed to fetch favorite pokemons", error);
            }
        };

        fetchFavoritePokemons();
    }, [token]);

    return (
        <div className="favoritesPageBody">
            <Header />
            {
                token ? null : <div className="loginWarning">Please log in to see your favorite Pokemons!</div> 
                
            }

            <div className="mainContainer">
                {token && (
                    <Leaderboard 
                        title="Your Favorite Pokemons" 
                        tableColumns={["ID", "Image", "Name", "Types"]}
                        startRankingData={rankingData}
                        isLeaderboardPage={false}
                    />
                )}
            </div>
            <div className='footerContainer'>
                <Footer />
            </div>
        </div>
    );
}