function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

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

    game.battleRunning = false;

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
                name => getPokemon(name)
            )
        );


    container.innerHTML = "";


    starters.forEach(
        pokemon => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "pokemon-card";


            card.innerHTML = `

                <img
                    src="${pokemon.image}"
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

                pokemon.level = 5;

                pokemon.currentHP =
                    pokemon.stats.hp;


                game.team.push(
                    pokemon
                );


                saveGame();

                startAdventure();

            };


            container.appendChild(
                card
            );

        }
    );

}


function startAdventure() {

    showScreen("map");

    updateUI();

    generateMap();

}


function updateUI() {

    const alive =
        game.team.filter(
            pokemon =>
                pokemon.currentHP > 0
        ).length;


    document.getElementById(
        "teamInfo"
    ).textContent =
        `${alive}/${game.team.length} vivos`;


    document.getElementById(
        "coins"
    ).textContent =
        `₽ ${game.coins}`;


    document.getElementById(
        "routeNumber"
    ).textContent =
        game.route;


    const container =
        document.getElementById(
            "team"
        );


    container.innerHTML = "";


    game.team.forEach(
        pokemon => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "team-pokemon";


            if (
                pokemon.currentHP <= 0
            ) {

                element.classList.add(
                    "fainted"
                );

            }


            element.innerHTML = `

                <img src="${pokemon.image}">

                <div>
                    ${pokemon.name}
                </div>

                <small>
                    Lv.${pokemon.level}
                </small>

                <br>

                <small>
                    HP
                    ${pokemon.currentHP}
                    /
                    ${pokemon.stats.hp}
                </small>

            `;


            container.appendChild(
                element
            );

        }
    );

}


function healTeam() {

    game.team.forEach(
        pokemon => {

            pokemon.currentHP =
                pokemon.stats.hp;

        }
    );


    saveGame();

    startAdventure();

}


function gameOver() {

    game.battleRunning = false;

    showScreen("gameover");

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
            "No existe una partida guardada."
        );

        return;

    }


    const data =
        JSON.parse(saved);


    Object.assign(
        game,
        data
    );


    if (
        !game.team ||
        game.team.length === 0
    ) {

        showStarters();

        return;

    }


    startAdventure();

}


function skipCapture() {

    game.route++;

    saveGame();

    startAdventure();

}


function showDex() {

    alert(
        "Pokédex de PokeLab\n\n" +
        "La Pokédex completa llegará próximamente."
    );

}
