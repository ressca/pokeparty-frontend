import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Pokemon from './pages/PokemonPage/Pokemon.jsx';
import MainPage from './pages/MainPage/MainPage.jsx';

function App() {
    const [count, setCount] = useState(0)
    return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/Pokemon" element={<Pokemon />} />
      </Routes>
    </Router>
    );
}

export default App