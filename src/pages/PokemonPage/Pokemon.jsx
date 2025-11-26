import './Pokemon.css';
import PokemonInfo from '../../components/PokemonInfo/PokemonInfo';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
export default function Pokemon() {
    return (
        <div className='abc'>
        <Header/>
        <PokemonInfo/>
        <div className='def'>
        <Footer/> 
        </div>
        </div>
    );
}