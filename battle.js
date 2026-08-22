async function startBattle() {

    game.battleRunning = true;


    const player =
        game.team[0];


    const enemy =
        await getPokemon(
            randomWildName()
        );


    enemy.level =
        Math.max(
            2,
            player.level
        );


    enemy.currentHP =
        enemy.stats.hp;


    game.currentPokemon =
        player;


    game.enemyPokemon =
        enemy;


    showScreen("battle");


    renderBattle();


    logBattle(
        `¡Un ${enemy.name} salvaje apareció!`
    );

}


function renderBattle() {

    const player =
        game.currentPokemon;

    const enemy =
        game.enemyPokemon;


    document
        .getElementById(
            "playerName"
        )
        .textContent =
        player.name;


    document
        .getElementById(
            "playerLevel"
        )
        .textContent =
        `Lv.${player.level}`;


    document
        .getElementById(
            "playerSprite"
        )
        .src =
        player.image;


    document
        .getElementById(
            "enemyName"
        )
        .textContent =
        enemy.name;


    document
        .getElementById(
            "enemyLevel"
        )
        .textContent =
        `Lv.${enemy.level}`;


    document
        .getElementById(
            "enemySprite"
        )
        .src =
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


    document
        .getElementById(
            "playerHPBar"
        )
        .style.width =
        playerPercent + "%";


    document
        .getElementById(
            "enemyHPBar"
        )
        .style.width =
        enemyPercent + "%";


    renderMoves();

}


function renderMoves() {

    const container =
        document.getElementById(
            "moves"
        );


    container.innerHTML = "";


    const moves =
        game.currentPokemon.moves
        .slice(0, 4);


    moves.forEach(
        (move, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                move.name
                .replaceAll(
                    "-",
                    " "
                );


            button.onclick = () =>
                playerAttack(index);


            container.appendChild(
                button
            );

        }
    );

}


async function playerAttack(index) {

    if (!game.battleRunning)
        return;


    game.battleRunning = false;


    const player =
        game.currentPokemon;


    const enemy =
        game.enemyPokemon;


    const move =
        player.moves[index];


    const damage =
        Math.floor(
            player.stats.attack /
            3
        )
        +
        5
        +
        Math.floor(
            Math.random() * 8
        );


    enemy.currentHP -= damage;


    if (
        enemy.currentHP < 0
    ) {

        enemy.currentHP = 0;

    }


    renderBattle();


    logBattle(
        `${player.name} usó ${move.name}!`
    );


    if (
        enemy.currentHP <= 0
    ) {

        await sleep(1000);

        victory();

        return;

    }


    await sleep(900);


    enemyAttack();

}


async function enemyAttack() {

    const player =
        game.currentPokemon;


    const enemy =
        game.enemyPokemon;


    const damage =
        Math.floor(
            enemy.stats.attack /
            3
        )
        +
        4
        +
        Math.floor(
            Math.random() * 6
        );


    player.currentHP -= damage;


    if (
        player.currentHP < 0
    ) {

        player.currentHP = 0;

    }


    renderBattle();


    logBattle(
        `${enemy.name} atacó!`
    );


    if (
        player.currentHP <= 0
    ) {

        await sleep(1000);

        gameOver();

        return;

    }


    game.battleRunning = true;

}


async function victory() {

    logBattle(
        `¡${game.enemyPokemon.name} fue derrotado!`
    );


    game.coins += 50;


    game.currentPokemon.level++;


    await sleep(1000);


    game.route++;


    saveGame();


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

            choices.push(
                pokemon
            );

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

            `;


            card.onclick = () => {

                if (
                    game.team.length < 6
                ) {

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

                }


                game.battleRunning =
                    false;


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

    document
        .getElementById(
            "battleLog"
        )
        .textContent =
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
