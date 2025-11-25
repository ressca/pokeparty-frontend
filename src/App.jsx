import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokemon from "./components/pages/PokemonPage/Pokemon";


function App() {
    const [count, setCount] = useState(0)
    return (
    <Router>
      <Routes>
        <Route path="/"/>
        <Route path="/Pokemon" element={<Pokemon />} />
      </Routes>
    </Router>
    );
}

export default App