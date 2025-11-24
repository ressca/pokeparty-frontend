import './PokemonsFights.css';
import PokemonsFightCards from '../pokemonsFightCards/pokemonsFightCards';
export default function PokemonsFights() {
    return (
        <section className="randomPokemonsSection">
            <PokemonsFightCards type="pewnie normalny" name="nie wiem" img="https://storage.googleapis.com/kagglesdsdata/datasets/1392907/2309103/Pokemon%20Dataset/aggron.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20251124%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20251124T181617Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=361f3a0a783860334ac4eeb09da1b0bebfe5f1be5ee45041a1cc89380f21c1bb6c72c094c35f368096efeb070e22d97936bd35742c2b372d1f333e260d12882f4feaa56819964774660471f13357d24796a0760e29fc6753edd5b6bea40ebc954d07f5f0b21297273f4c4b5433b9c1983a23a0c711753440346291c05054c4debe5fe11204107840177f7ac7e5336ee4668cf6b910f3962dd4d2f6103ccded7260643a8d9cd0c6e9bdf4ed862be038125f5bf8ce87da93440cb53810229d6243d1521b3f938b8c7396b647f64640431246cd87861be17c29dd50bbccddd50fcc4c1e930440b228acf826a9ea2b9bfb5a73c0bc878fc2840957e69caa8bc5733f"/>
 
            <PokemonsFightCards type="normalny" name="arceus" img="https://storage.googleapis.com/kagglesdsdata/datasets/1392907/2309103/Pokemon%20Dataset/arceus-normal.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20251124%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20251124T181617Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=c4130761ac55670ef32f12aed7895548668ed2f382dbe0ff87aa67f77e27b9dc52443c09f3d443b61ce3fe5f9d496031612bb7c9172bdd9175d03ada759b30eef7f73a2e44f92a9f939fd77ecf33bbfd1a6816115f1348fbaa716b148b22fe151f1304bb9b4df140badd261aba2ec118e11ed9fecc5326aab82968c35c995b975c2212cc5252e6eeda39e30419748f7f9fe60d0d78ed1ba867217f32473a5fc9079890476d67e6721ad2bd987bd9ceb12b8a256bdc62763009376653dd476622cc62e08ed5d9d52e73d8fe53cbeb020ea1b4634f69b4b4dfaa978371295669c33ebbb57088fada7e40da4bd23bcbdc0ffd3e0c828bb002f735e3c7fe559c0ba5"/>
        {/* Tu będą się wyświetlać pokemony z api */}
        </section>
    )
}