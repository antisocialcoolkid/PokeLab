/* =========================================================
   POKELAB
   data.js — COMPLETE
========================================================= */

const POKEAPI = "https://pokeapi.co/api/v2";

/* =========================================================
   STARTERS
========================================================= */

const STARTERS = [
    {
        id: 1,
        name: "Bulbasaur",
        level: 6
    },
    {
        id: 4,
        name: "Charmander",
        level: 6
    },
    {
        id: 7,
        name: "Squirtle",
        level: 6
    }
];


/* =========================================================
   MOVES
========================================================= */

const MOVES = {

    tackle: {
        name: "Placaje",
        power: 40,
        accuracy: 100
    },

    scratch: {
        name: "Arañazo",
        power: 40,
        accuracy: 100
    },

    growl: {
        name: "Gruñido",
        power: 0,
        accuracy: 100
    },

    vineWhip: {
        name: "Látigo Cepa",
        power: 45,
        accuracy: 100
    },

    ember: {
        name: "Ascuas",
        power: 40,
        accuracy: 100
    },

    waterGun: {
        name: "Pistola Agua",
        power: 40,
        accuracy: 100
    },

    bite: {
        name: "Mordisco",
        power: 60,
        accuracy: 100
    },

    quickAttack: {
        name: "Ataque Rápido",
        power: 40,
        accuracy: 100
    }

};


/* =========================================================
   POKEMON BASE
========================================================= */

const POKEMON_DATA = {

    bulbasaur: {
        id: 1,
        name: "Bulbasaur",
        type: ["Planta", "Veneno"],
        baseHP: 45,
        attack: 49,
        defense: 49,
        speed: 45,
        moves: [
            "tackle",
            "growl",
            "vineWhip"
        ]
    },

    ivysaur: {
        id: 2,
        name: "Ivysaur",
        type: ["Planta", "Veneno"],
        baseHP: 60,
        attack: 62,
        defense: 63,
        speed: 60,
        moves: [
            "tackle",
            "growl",
            "vineWhip"
        ]
    },

    venusaur: {
        id: 3,
        name: "Venusaur",
        type: ["Planta", "Veneno"],
        baseHP: 80,
        attack: 82,
        defense: 83,
        speed: 80,
        moves: [
            "tackle",
            "vineWhip",
            "bite"
        ]
    },

    charmander: {
        id: 4,
        name: "Charmander",
        type: ["Fuego"],
        baseHP: 39,
        attack: 52,
        defense: 43,
        speed: 65,
        moves: [
            "scratch",
            "growl",
            "ember"
        ]
    },

    charmeleon: {
        id: 5,
        name: "Charmeleon",
        type: ["Fuego"],
        baseHP: 58,
        attack: 64,
        defense: 58,
        speed: 80,
        moves: [
            "scratch",
            "ember",
            "bite"
        ]
    },

    charizard: {
        id: 6,
        name: "Charizard",
        type: ["Fuego", "Volador"],
        baseHP: 78,
        attack: 84,
        defense: 78,
        speed: 100,
        moves: [
            "scratch",
            "ember",
            "bite"
        ]
    },

    squirtle: {
        id: 7,
        name: "Squirtle",
        type: ["Agua"],
        baseHP: 44,
        attack: 48,
        defense: 65,
        speed: 43,
        moves: [
            "tackle",
            "growl",
            "waterGun"
        ]
    },

    wartortle: {
        id: 8,
        name: "Wartortle",
        type: ["Agua"],
        baseHP: 59,
        attack: 63,
        defense: 80,
        speed: 58,
        moves: [
            "tackle",
            "waterGun",
            "bite"
        ]
    },

    blastoise: {
        id: 9,
        name: "Blastoise",
        type: ["Agua"],
        baseHP: 79,
        attack: 83,
        defense: 100,
        speed: 78,
        moves: [
            "tackle",
            "waterGun",
            "bite"
        ]
    },

    caterpie: {
        id: 10,
        name: "Caterpie",
        type: ["Bicho"],
        baseHP: 45,
        attack: 30,
        defense: 35,
        speed: 45,
        moves: ["tackle"]
    },

    weedle: {
        id: 13,
        name: "Weedle",
        type: ["Bicho", "Veneno"],
        baseHP: 40,
        attack: 35,
        defense: 30,
        speed: 50,
        moves: ["tackle"]
    },

    pidgey: {
        id: 16,
        name: "Pidgey",
        type: ["Normal", "Volador"],
        baseHP: 40,
        attack: 45,
        defense: 40,
        speed: 56,
        moves: [
            "tackle",
            "quickAttack"
        ]
    },

    rattata: {
        id: 19,
        name: "Rattata",
        type: ["Normal"],
        baseHP: 30,
        attack: 56,
        defense: 35,
        speed: 72,
        moves: [
            "tackle",
            "quickAttack"
        ]
    },

    pikachu: {
        id: 25,
        name: "Pikachu",
        type: ["Eléctrico"],
        baseHP: 35,
        attack: 55,
        defense: 40,
        speed: 90,
        moves: [
            "quickAttack",
            "tackle"
        ]
    },

    raichu: {
        id: 26,
        name: "Raichu",
        type: ["Eléctrico"],
        baseHP: 60,
        attack: 90,
        defense: 55,
        speed: 110,
        moves: [
            "quickAttack",
            "tackle"
        ]
    },

    zubat: {
        id: 41,
        name: "Zubat",
        type: ["Veneno", "Volador"],
        baseHP: 40,
        attack: 45,
        defense: 35,
        speed: 55,
        moves: [
            "tackle",
            "bite"
        ]
    },

    geodude: {
        id: 74,
        name: "Geodude",
        type: ["Roca", "Tierra"],
        baseHP: 40,
        attack: 80,
        defense: 100,
        speed: 20,
        moves: [
            "tackle"
        ]
    },

    magikarp: {
        id: 129,
        name: "Magikarp",
        type: ["Agua"],
        baseHP: 20,
        attack: 10,
        defense: 55,
        speed: 80,
        moves: [
            "tackle"
        ]
    },

    eevee: {
        id: 133,
        name: "Eevee",
        type: ["Normal"],
        baseHP: 55,
        attack: 55,
        defense: 50,
        speed: 55,
        moves: [
            "tackle",
            "quickAttack"
        ]
    },

    dratini: {
        id: 147,
        name: "Dratini",
        type: ["Dragón"],
        baseHP: 41,
        attack: 64,
        defense: 45,
        speed: 50,
        moves: [
            "tackle",
            "bite"
        ]
    }

};


/* =========================================================
   POKÉMON PARA ENCUENTROS
========================================================= */

const WILD_POKEMON = [
    10,
    13,
    16,
    19,
    25,
    41,
    74,
    129,
    133,
    147
];


/* =========================================================
   NOMBRES PARA POKÉDEX
========================================================= */

const GENERATION_RANGES = {

    1: [1, 151],

    2: [152, 251],

    3: [252, 386],

    4: [387, 493],

    5: [494, 649],

    6: [650, 721],

    7: [722, 809],

    8: [810, 905],

    9: [906, 1025]

};


/* =========================================================
   SPRITES
========================================================= */

function getSprite(id) {

    return (
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    );

}


function getFrontSprite(id) {

    return (
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    );

}


/* =========================================================
   UTILIDADES
========================================================= */

function normalizeName(name) {

    return String(name)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");

}


function getPokemonDataById(id) {

    const found = Object.values(POKEMON_DATA)
        .find(pokemon => pokemon.id === Number(id));

    return found || null;

}


/* =========================================================
   CREAR POKÉMON
========================================================= */

function createPokemon(id, level = 5) {

    id = Number(id);

    let base = getPokemonDataById(id);


    /*
       Si todavía no existe en nuestra base local,
       creamos una versión básica usando sus datos
       de la PokéAPI.
    */

    if (!base) {

        base = {
            id: id,
            name: `Pokémon #${id}`,
            type: ["Normal"],
            baseHP: 50,
            attack: 50,
            defense: 50,
            speed: 50,
            moves: ["tackle"]
        };

    }


    const hp = calculateHP(
        base.baseHP,
        level
    );


    return {

        uid:
            Date.now() +
            Math.random(),

        id:
            base.id,

        name:
            base.name,

        type:
            [...base.type],

        level:
            Number(level),

        maxHP:
            hp,

        hp:
            hp,

        attack:
            calculateStat(
                base.attack,
                level
            ),

        defense:
            calculateStat(
                base.defense,
                level
            ),

        speed:
            calculateStat(
                base.speed,
                level
            ),

        moves:
            [...base.moves],

        fainted:
            false,

        sprite:
            getSprite(base.id)

    };

}


/* =========================================================
   STATS
========================================================= */

function calculateHP(base, level) {

    return Math.max(
        1,
        Math.floor(
            ((2 * base + 31) * level) / 100
        ) + level + 10
    );

}


function calculateStat(base, level) {

    return Math.max(
        1,
        Math.floor(
            ((2 * base + 31) * level) / 100
        ) + 5
    );

}


/* =========================================================
   DEX API
========================================================= */

async function getPokemonFromAPI(id) {

    try {

        const response =
            await fetch(
                `${POKEAPI}/pokemon/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Pokémon no encontrado"
            );

        }


        return await response.json();

    }

    catch (error) {

        console.error(
            "PokeAPI:",
            error
        );

        return null;

    }

}


/* =========================================================
   GENERACIÓN
========================================================= */

function getGenerationFromId(id) {

    id = Number(id);


    for (
        const generation in GENERATION_RANGES
    ) {

        const [
            min,
            max
        ] =
            GENERATION_RANGES[generation];


        if (
            id >= min &&
            id <= max
        ) {

            return Number(
                generation
            );

        }

    }


    return 9;

}


/* =========================================================
   DATOS DE POKÉDEX
========================================================= */

const TYPE_TRANSLATIONS = {

    normal: "Normal",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    grass: "Planta",
    ice: "Hielo",
    fighting: "Lucha",
    poison: "Veneno",
    ground: "Tierra",
    flying: "Volador",
    psychic: "Psíquico",
    bug: "Bicho",
    rock: "Roca",
    ghost: "Fantasma",
    dragon: "Dragón",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada"

};


/* =========================================================
   GUARDADO
========================================================= */

const SAVE_KEY =
    "pokelab_save";


function saveGame(data) {

    try {

        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(data)
        );

        return true;

    }

    catch (error) {

        console.error(
            "No se pudo guardar:",
            error
        );

        return false;

    }

}


function loadGameData() {

    try {

        const data =
            localStorage.getItem(
                SAVE_KEY
            );


        if (!data) {

            return null;

        }


        return JSON.parse(
            data
        );

    }

    catch (error) {

        console.error(
            "Save corrupto:",
            error
        );

        return null;

    }

}


/* =========================================================
   BORRAR PARTIDA
========================================================= */

function deleteSave() {

    localStorage.removeItem(
        SAVE_KEY
    );

}


/* =========================================================
   POKÉMON ALEATORIO
========================================================= */

function randomWildPokemon() {

    const id =
        WILD_POKEMON[
            Math.floor(
                Math.random() *
                WILD_POKEMON.length
            )
        ];


    return createPokemon(
        id,
        Math.floor(
            Math.random() * 3
        ) + 4
    );

}


/* =========================================================
   CAPTURA
========================================================= */

function getCaptureOptions() {

    const options = [];


    while (
        options.length < 3
    ) {

        const pokemon =
            randomWildPokemon();


        if (
            !options.some(
                p =>
                    p.id === pokemon.id
            )
        ) {

            options.push(
                pokemon
            );

        }

    }


    return options;

}


/* =========================================================
   EXPORT GLOBAL
========================================================= */

window.PokeLabData = {

    STARTERS,

    MOVES,

    POKEMON_DATA,

    WILD_POKEMON,

    GENERATION_RANGES,

    TYPE_TRANSLATIONS,

    getSprite,

    getFrontSprite,

    getPokemonDataById,

    createPokemon,

    getPokemonFromAPI,

    getGenerationFromId,

    saveGame,

    loadGameData,

    deleteSave,

    randomWildPokemon,

    getCaptureOptions

};
