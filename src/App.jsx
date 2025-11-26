import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Pokemon from './pages/PokemonPage/Pokemon.jsx';
import MainPage from './pages/MainPage/MainPage.jsx';
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage.jsx';

function App() {
    const [count, setCount] = useState(0)
    return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
        <Route path="/pokemon" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    );
}

export default App;
