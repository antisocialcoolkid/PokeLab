/* =========================================================
   POKELAB DATA
   ========================================================= */

const API = "https://pokeapi.co/api/v2";

const STARTERS = [
    "bulbasaur",
    "charmander",
    "squirtle"
];

const game = {
    team: [],
    route: 1,
    coins: 500,
    currentPokemon: null,
    enemyPokemon: null,
    battleRunning: false,
    isBossBattle: false
};


/* ---------------------------------------------------------
   OBTENER POKÉMON
--------------------------------------------------------- */

async function getPokemon(name) {

    const response =
        await fetch(
            `${API}/pokemon/${name.toLowerCase()}`
        );

    if (!response.ok) {
        throw new Error(
            "No se pudo cargar " + name
        );
    }

    const data =
        await response.json();


    const hp =
        data.stats.find(
            stat =>
                stat.stat.name === "hp"
        )?.base_stat || 50;


    const attack =
        data.stats.find(
            stat =>
                stat.stat.name === "attack"
        )?.base_stat || 50;


    const defense =
        data.stats.find(
            stat =>
                stat.stat.name === "defense"
        )?.base_stat || 50;


    const speed =
        data.stats.find(
            stat =>
                stat.stat.name === "speed"
        )?.base_stat || 50;


    const types =
        data.types.map(
            type =>
                type.type.name
        );


    const moves =
        data.moves
            .slice(0, 4)
            .map(move => ({
                name: move.move.name
            }));


    const pokemon = {

        id: data.id,

        name:
            capitalize(
                data.name
            ),

        level: 5,

        types,

        stats: {

            hp,

            attack,

            defense,

            speed

        },

        currentHP: hp,

        image:
            data.sprites
                .other?.["official-artwork"]
                ?.front_default
                ||
            data.sprites.front_default,

        sprite:
            data.sprites.front_default,

        shiny:
            data.sprites
                .other?.["official-artwork"]
                ?.front_shiny
                ||
            null,

        moves

    };


    return pokemon;

}


/* ---------------------------------------------------------
   POKÉMON ALEATORIO
--------------------------------------------------------- */

function randomWildName() {

    /*
     * Actualmente usamos Pokémon
     * de las primeras regiones para
     * los encuentros.
     *
     * La Pokédex, en cambio,
     * podrá mostrar todos.
     */

    const id =
        Math.floor(
            Math.random() * 1025
        ) + 1;


    return String(id);

}


/* ---------------------------------------------------------
   CAPITALIZAR
--------------------------------------------------------- */

function capitalize(text) {

    return text
        .charAt(0)
        .toUpperCase()
        + text.slice(1);

}
