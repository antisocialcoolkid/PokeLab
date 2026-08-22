let battleBusy = false;


async function startBattle() {

    const available = game.team.filter(
        pokemon => pokemon.currentHP > 0
    );

    if (!available.length) {

        gameOver();

        return;
    }

    game.currentPokemon = available[0];

    const enemy = await getPokemon(
        randomWildName()
    );

    enemy.level =
        Math.max(
            5,
            game.route + 3
        );

    enemy.currentHP =
        enemy.stats.hp;

    game.enemyPokemon = enemy;

    game.battleRunning = true;

    showScreen("battle");

    updateBattleTeam();

    renderBattle();

    logBattle(
        `¡${enemy.name} salvaje apareció!`
    );
}


function updateBattleTeam() {

    const alive = game.team.filter(
        pokemon => pokemon.currentHP > 0
    ).length;

    document.getElementById(
        "battleTeamCount"
    ).textContent =
        `${alive}/${game.team.length} disponibles`;
}


function renderBattle() {

    const player =
        game.currentPokemon;

    const enemy =
        game.enemyPokemon;

    if (!player || !enemy)
        return;

    document.getElementById(
        "playerName"
    ).textContent =
        player.name;

    document.getElementById(
        "playerLevel"
    ).textContent =
        `Lv.${player.level}`;

    document.getElementById(
        "playerSprite"
    ).src =
        player.image;

    document.getElementById(
        "enemyName"
    ).textContent =
        enemy.name;

    document.getElementById(
        "enemyLevel"
    ).textContent =
        `Lv.${enemy.level}`;

    document.getElementById(
        "enemySprite"
    ).src =
        enemy.image;


    const playerPercent =
        Math.max(
            0,
            player.currentHP /
            player.stats.hp *
            100
        );

    const enemyPercent =
        Math.max(
            0,
            enemy.currentHP /
            enemy.stats.hp *
            100
        );


    document.getElementById(
        "playerHPBar"
    ).style.width =
        playerPercent + "%";

    document.getElementById(
        "enemyHPBar"
    ).style.width =
        enemyPercent + "%";


    document.getElementById(
        "playerHPText"
    ).textContent =
        `${player.currentHP} / ${player.stats.hp}`;

    document.getElementById(
        "enemyHPText"
    ).textContent =
        `${enemy.currentHP} / ${enemy.stats.hp}`;


    renderMoves();

    updateBattleTeam();
}


function renderMoves() {

    const container =
        document.getElementById("moves");

    container.innerHTML = "";

    if (
        !game.currentPokemon ||
        game.currentPokemon.currentHP <= 0
    ) {
        return;
    }


    const moves =
        game.currentPokemon.moves.slice(0,4);


    moves.forEach(
        (move,index) => {

            const button =
                document.createElement("button");

            button.textContent =
                move.name
                .replaceAll("-"," ");

            button.onclick = () =>
                playerAttack(index);

            container.appendChild(button);

        }
    );
}


async function playerAttack(index) {

    if (battleBusy)
        return;

    battleBusy = true;


    const player =
        game.currentPokemon;

    const enemy =
        game.enemyPokemon;

    const move =
        player.moves[index];


    const damage =
        calculateDamage(
            player,
            enemy,
            move
        );


    enemy.currentHP -= damage;

    if (enemy.currentHP < 0)
        enemy.currentHP = 0;


    renderBattle();

    logBattle(
        `${player.name} usó ${move.name.replaceAll("-", " ")}.`
    );


    if (enemy.currentHP <= 0) {

        await sleep(900);

        await victory();

        battleBusy = false;

        return;
    }


    await sleep(800);

    enemyAttack();

}


function calculateDamage(
    attacker,
    defender,
    move
) {

    const base =
        Math.floor(
            attacker.stats.attack / 3
        ) + 5;

    const random =
        Math.floor(
            Math.random() * 7
        );

    let damage =
        base + random;


    if (
        attacker.types.includes("fire") &&
        defender.types.includes("grass")
    ) {
        damage *= 2;

        logBattle(
            "¡Es supereficaz!"
        );
    }


    if (
        attacker.types.includes("water") &&
        defender.types.includes("fire")
    ) {
        damage *= 2;
    }


    if (
        attacker.types.includes("grass") &&
        defender.types.includes("water")
    ) {
        damage *= 2;
    }


    if (
        attacker.types.includes("electric") &&
        defender.types.includes("water")
    ) {
        damage *= 2;
    }


    return Math.max(
        1,
        Math.floor(damage)
    );
}


async function enemyAttack() {

    const player =
        game.currentPokemon;

    const enemy =
        game.enemyPokemon;


    const damage =
        Math.floor(
            enemy.stats.attack / 3
        )
        +
        4
        +
        Math.floor(
            Math.random() * 7
        );


    player.currentHP -= damage;


    if (player.currentHP < 0)
        player.currentHP = 0;


    renderBattle();

    logBattle(
        `${enemy.name} atacó.`
    );


    if (player.currentHP <= 0) {

        await sleep(700);

        await pokemonFainted();

        battleBusy = false;

        return;
    }


    battleBusy = false;

}


async function pokemonFainted() {

    const fainted =
        game.currentPokemon;


    fainted.currentHP = 0;


    renderBattle();


    logBattle(
        `¡${fainted.name} se debilitó!`
    );


    await sleep(900);


    const alive =
        game.team.filter(
            pokemon =>
                pokemon.currentHP > 0
        );


    /*
     * AQUÍ ESTÁ LA SOLUCIÓN:
     * si quedan Pokémon vivos,
     * NO termina la partida.
     */

    if (alive.length > 0) {

        openSwitchMenu(true);

        return;
    }


    gameOver();

}


function openSwitchMenu(force = false) {

    if (
        !force &&
        battleBusy
    ) {
        return;
    }


    showScreen("switch");


    const container =
        document.getElementById(
            "switchList"
        );


    container.innerHTML = "";


    game.team.forEach(
        (pokemon,index) => {

            const disabled =
                pokemon.currentHP <= 0 ||
                pokemon === game.currentPokemon;


            const element =
                document.createElement("div");


            element.className =
                "switch-pokemon";


            if (disabled)
                element.classList.add(
                    "disabled"
                );


            element.innerHTML = `

                <img src="${pokemon.image}">

                <div>

                    <b>
                        ${pokemon.name}
                    </b>

                    <br>

                    <small>
                        Lv.${pokemon.level}
                    </small>

                    <br>

                    <small>
                        HP:
                        ${pokemon.currentHP}
                        /
                        ${pokemon.stats.hp}
                    </small>

                </div>

            `;


            if (!disabled) {

                element.onclick = () =>
                    switchPokemon(index);

            }


            container.appendChild(
                element
            );

        }
    );


}


function closeSwitchMenu() {

    showScreen("battle");

}


async function switchPokemon(index) {

    const pokemon =
        game.team[index];


    if (
        pokemon.currentHP <= 0 ||
        pokemon === game.currentPokemon
    ) {
        return;
    }


    game.currentPokemon =
        pokemon;


    showScreen("battle");

    renderBattle();


    logBattle(
        `¡Adelante, ${pokemon.name}!`
    );


    /*
     * Cambiar Pokémon consume el turno,
     * así que el enemigo ataca.
     */

    await sleep(800);

    if (
        game.enemyPokemon.currentHP > 0
    ) {

        enemyAttack();

    }

}


async function victory() {

    const winner =
        game.currentPokemon;


    winner.level++;


    game.coins += 50;


    logBattle(
        `¡${game.enemyPokemon.name} fue derrotado!`
    );


    saveGame();


    await sleep(1000);


    battleBusy = false;

    game.battleRunning = false;


    await showCapture();

}


async function showCapture() {

    showScreen("capture");


    const container =
        document.getElementById(
            "captureList"
        );


    container.innerHTML =
        "<p>Cargando Pokémon...</p>";


    const choices = [];


    while (
        choices.length < 3
    ) {

        const pokemon =
            await getPokemon(
                randomWildName()
            );


        if (
            !choices.some(
                x => x.id === pokemon.id
            )
        ) {

            choices.push(pokemon);

        }

    }


    container.innerHTML = "";


    choices.forEach(
        pokemon => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "pokemon-card";


            card.innerHTML = `

                <img src="${pokemon.image}">

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

            `;


            card.onclick = () => {

                if (
                    game.team.length >= 6
                ) {

                    alert(
                        "Tu equipo ya tiene 6 Pokémon."
                    );

                    return;

                }


                pokemon.level =
                    Math.max(
                        5,
                        game.route + 4
                    );


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


function logBattle(text) {

    document.getElementById(
        "battleLog"
    ).textContent =
        text;

}


function sleep(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}
