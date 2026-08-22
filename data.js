const API = "https://pokeapi.co/api/v2";


// Pokémon para los starters
const STARTERS = [
    "bulbasaur",
    "charmander",
    "squirtle",
    "pikachu"
];


// Pokémon que pueden aparecer
const WILD_POOL = [
    "caterpie",
    "weedle",
    "pidgey",
    "rattata",
    "zubat",
    "geodude",
    "pikachu",
    "eevee",
    "sandshrew",
    "ekans",
    "oddish",
    "bellsprout",
    "psyduck",
    "growlithe",
    "machop",
    "gastly",
    "dratini"
];


const game = {

    team: [],

    route: 1,

    coins: 500,

    currentPokemon: null,

    enemyPokemon: null,

    battleRunning: false

};


async function getPokemon(name) {

    const response = await fetch(
        `${API}/pokemon/${name}`
    );

    if (!response.ok) {
        throw new Error("Pokémon no encontrado");
    }

    const data = await response.json();

    return {

        id: data.id,

        name:
            data.name
            .charAt(0)
            .toUpperCase()
            +
            data.name.slice(1),

        image:
            data.sprites.other
            ?.["official-artwork"]
            ?.front_default
            ||
            data.sprites.front_default,

        sprite:
            data.sprites.front_default,

        types:
            data.types.map(
                x => x.type.name
            ),

        stats: {

            hp:
                data.stats[0].base_stat,

            attack:
                data.stats[1].base_stat,

            defense:
                data.stats[2].base_stat,

            specialAttack:
                data.stats[3].base_stat,

            specialDefense:
                data.stats[4].base_stat,

            speed:
                data.stats[5].base_stat

        },

        moves:
            data.moves
            .slice(0, 4)
            .map(x => ({
                name:
                    x.move.name
            }))

    };

}


function randomWildName() {

    return WILD_POOL[
        Math.floor(
            Math.random() *
            WILD_POOL.length
        )
    ];

}
