let game = {

    team: [],

    route: 0,

    coins: 500

};

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen =>
            screen.classList.remove("active")
        );

    document
        .getElementById(id)
        .classList.add("active");
}

function newRun() {

    game = {

        team: [],

        route: 0,

        coins: 500

    };

    saveGame();

    showStarter();

}

function showStarter() {

    showScreen("starter");

    const list =
        document.getElementById("starterList");

    list.innerHTML = "";

    creatures.forEach(creature => {

        const card =
            document.createElement("div");

        card.className =
            "creature-card";

        card.innerHTML = `
            <div class="creature-icon">
                ${creature.icon}
            </div>

            <h3>${creature.name}</h3>

            <p>${creature.type}</p>

            <p>
                HP ${creature.hp}
                |
                ATK ${creature.attack}
            </p>
        `;

        card.onclick = () => {

            game.team.push({
                ...creature
            });

            saveGame();

            startAdventure();

        };

        list.appendChild(card);

    });

}

function startAdventure() {

    showScreen("map");

    generateMap();

    updateTeam();

}

function selectNode(node) {

    if (node.type === "battle") {

        startBattle();

        return;
    }

    if (node.type === "catch") {

        showCatch();

        return;
    }

    if (node.type === "item") {

        game.coins += 100;

        alert(
            "¡Encontraste 100 monedas!"
        );

        startAdventure();

        return;
    }

    if (node.type === "BOSS") {

        startBattle();

    }

}

function showCatch() {

    showScreen("catch");

    const container =
        document.getElementById("catchList");

    container.innerHTML = "";

    const choices =
        [...creatures]
        .sort(() => Math.random() - .5)
        .slice(0,3);

    choices.forEach(creature => {

        const card =
            document.createElement("div");

        card.className =
            "creature-card";

        card.innerHTML = `
            <div class="creature-icon">
                ${creature.icon}
            </div>

            <h3>${creature.name}</h3>

            <p>${creature.type}</p>
        `;

        card.onclick = () => {

            if (game.team.length < 6) {

                game.team.push({
                    ...creature
                });

            }

            saveGame();

            startAdventure();

        };

        container.appendChild(card);

    });

}

function skipCatch() {

    startAdventure();

}

function finishBattle() {

    game.route++;

    saveGame();

    showCatch();

}

function updateTeam() {

    document.getElementById("teamInfo")
        .textContent =
        `TEAM ${game.team.length}/6`;
}

function saveGame() {

    localStorage.setItem(
        "pokelab_save",
        JSON.stringify(game)
    );

}

function loadRun() {

    const save =
        localStorage.getItem(
            "pokelab_save"
        );

    if (!save) {

        alert("No hay una partida guardada.");

        return;
    }

    game = JSON.parse(save);

    startAdventure();

}

function resetGame() {

    localStorage.removeItem(
        "pokelab_save"
    );

    game = {

        team:[],

        route:0,

        coins:500

    };

}
