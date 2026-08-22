function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });

    document
        .getElementById(id)
        .classList.add("active");

}


async function newRun() {

    game.team = [];

    game.route = 1;

    game.coins = 500;

    game.currentPokemon = null;

    game.enemyPokemon = null;

    saveGame();

    await showStarters();

}


async function showStarters() {

    showScreen("starter");

    const container =
        document.getElementById(
            "starterList"
        );

    container.innerHTML =
        "<p>Cargando Pokémon...</p>";


    const starters =
        await Promise.all(
            STARTERS.map(
                name =>
                    getPokemon(name)
            )
        );


    container.innerHTML = "";


    starters.forEach(pokemon => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "pokemon-card";

        card.innerHTML = `

            <img
                src="${pokemon.image}"
                alt="${pokemon.name}"
            >

            <h2>
                ${pokemon.name}
            </h2>

            <div class="types">

                ${pokemon.types
                    .map(type =>
                        `<span class="type">
                            ${type}
                        </span>`
                    )
                    .join("")}

            </div>

            <p>
                HP ${pokemon.stats.hp}
            </p>

        `;


        card.onclick = () => {

            game.team.push({

                ...pokemon,

                level: 5,

                currentHP:
                    pokemon.stats.hp

            });

            saveGame();

            startAdventure();

        };


        container.appendChild(card);

    });

}


function startAdventure() {

    showScreen("map");

    updateUI();

    generateMap();

}


function updateUI() {

    document
        .getElementById("teamInfo")
        .textContent =
        `TEAM ${game.team.length}/6`;

    document
        .getElementById("coins")
        .textContent =
        `₽ ${game.coins}`;

    document
        .getElementById("routeNumber")
        .textContent =
        game.route;


    const team =
        document.getElementById(
            "team"
        );

    team.innerHTML = "";


    game.team.forEach(pokemon => {

        const element =
            document.createElement(
                "div"
            );

        element.className =
            "team-pokemon";

        element.innerHTML = `

            <img
                src="${pokemon.image}"
            >

            <div>
                ${pokemon.name}
            </div>

            <small>
                Lv.${pokemon.level}
            </small>

        `;

        team.appendChild(element);

    });

}


function saveGame() {

    localStorage.setItem(
        "pokelab_save",
        JSON.stringify(game)
    );

}


function loadRun() {

    const saved =
        localStorage.getItem(
            "pokelab_save"
        );

    if (!saved) {

        alert(
            "No tienes una partida guardada."
        );

        return;

    }


    const data =
        JSON.parse(saved);


    Object.assign(
        game,
        data
    );


    if (!game.team.length) {

        showStarters();

        return;

    }


    startAdventure();

}


function gameOver() {

    showScreen("gameover");

}


function skipCapture() {

    game.route++;

    saveGame();

    startAdventure();

}
