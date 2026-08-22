/* =========================================================
   POKELAB — game.js
========================================================= */

let game = {
    started: false,
    coins: 500,
    route: 1,
    team: [],
    defeated: [],
    dexSeen: [],
    currentPokemon: 0
};

function $(id) {
    return document.getElementById(id);
}

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = $(id);

    if (screen) {
        screen.classList.add("active");
    }
}

function newRun() {

    localStorage.removeItem("pokelab_save");

    game = {
        started: false,
        coins: 500,
        route: 1,
        team: [],
        defeated: [],
        dexSeen: [],
        currentPokemon: 0
    };

    showStarterSelection();
}

function showStarterSelection() {

    showScreen("starter");

    const container = $("starterList");

    if (!container) return;

    container.innerHTML = "";

    STARTERS.forEach(starter => {

        const pokemon =
            createPokemon(
                starter.id,
                starter.level
            );

        const card =
            document.createElement("button");

        card.className =
            "starter-card";

        card.innerHTML = `
            <img
                src="${pokemon.sprite}"
                alt="${pokemon.name}"
            >

            <h2>${pokemon.name}</h2>

            <p>
                Nv. ${pokemon.level}
                · ${pokemon.type.join(" / ")}
            </p>
        `;

        card.onclick = () => {
            chooseStarter(pokemon);
        };

        container.appendChild(card);

    });
}

function chooseStarter(pokemon) {

    game.started = true;

    game.team = [pokemon];

    game.currentPokemon = 0;

    game.dexSeen = [pokemon.id];

    saveCurrentGame();

    showMap();

}

function showMap() {

    showScreen("map");

    updateHeader();

    updateTeamUI();

    if (
        typeof renderMap === "function"
    ) {
        renderMap();
    }
}

function updateHeader() {

    const teamInfo = $("teamInfo");

    const coins = $("coins");

    if (teamInfo) {
        teamInfo.textContent =
            `${game.team.length}/6`;
    }

    if (coins) {
        coins.textContent =
            `₽ ${game.coins}`;
    }
}

function updateTeamUI() {

    const team =
        $("team");

    if (!team) return;

    team.innerHTML = "";

    game.team.forEach(
        (pokemon, index) => {

            const card =
                document.createElement("div");

            card.className =
                "team-pokemon";

            const hp =
                Math.max(
                    0,
                    pokemon.hp
                );

            const max =
                Math.max(
                    1,
                    pokemon.maxHP
                );

            card.innerHTML = `
                <img
                    src="${pokemon.sprite}"
                    alt="${pokemon.name}"
                >

                <strong>
                    ${pokemon.name}
                </strong>

                <small>
                    Nv. ${pokemon.level}
                </small>

                <small>
                    ❤️ ${hp}/${max}
                </small>
            `;

            if (
                index === game.currentPokemon
            ) {
                card.style.borderColor =
                    "#ffd92f";
            }

            if (
                pokemon.fainted ||
                pokemon.hp <= 0
            ) {
                card.style.opacity =
                    "0.45";
            }

            team.appendChild(card);

        }
    );

    updateHeader();
}

function saveCurrentGame() {

    saveGame({
        ...game
    });

}

function loadRun() {

    const saved =
        loadGameData();

    if (!saved || !saved.started) {

        alert(
            "No tienes ninguna partida guardada."
        );

        return;
    }

    game = saved;

    if (!Array.isArray(game.team)) {
        game.team = [];
    }

    showMap();
}

function healTeam() {

    game.team.forEach(pokemon => {

        pokemon.hp =
            pokemon.maxHP;

        pokemon.fainted =
            false;

    });

    game.currentPokemon = 0;

    saveCurrentGame();

    updateTeamUI();

    alert(
        "¡Tu equipo está completamente curado!"
    );

    showMap();
}

function addPokemon(pokemon) {

    if (
        game.team.length >= 6
    ) {

        alert(
            "Tu equipo ya tiene 6 Pokémon."
        );

        return false;
    }

    pokemon.fainted = false;

    pokemon.hp =
        pokemon.maxHP;

    game.team.push(
        pokemon
    );

    if (
        !game.dexSeen.includes(
            pokemon.id
        )
    ) {
        game.dexSeen.push(
            pokemon.id
        );
    }

    saveCurrentGame();

    updateTeamUI();

    return true;
}

function removeFaintedPokemon() {

    game.team.forEach(
        pokemon => {

            if (
                pokemon.hp <= 0
            ) {

                pokemon.hp = 0;

                pokemon.fainted = true;

            }

        }
    );

}

function hasUsablePokemon() {

    return game.team.some(
        pokemon =>
            !pokemon.fainted &&
            pokemon.hp > 0
    );

}

function getNextUsablePokemon() {

    for (
        let i = 0;
        i < game.team.length;
        i++
    ) {

        const pokemon =
            game.team[i];

        if (
            !pokemon.fainted &&
            pokemon.hp > 0
        ) {

            return i;

        }

    }

    return -1;
}

function checkGameOver() {

    removeFaintedPokemon();

    const alive =
        hasUsablePokemon();

    if (!alive) {

        game.currentPokemon = 0;

        saveCurrentGame();

        showScreen("gameover");

        return true;
    }

    return false;
}

function openSwitchMenu() {

    if (
        typeof renderSwitchMenu ===
        "function"
    ) {
        renderSwitchMenu();
    }

    showScreen("switch");
}

function closeSwitchMenu() {

    showScreen("battle");
}

function switchPokemon(index) {

    index =
        Number(index);

    if (
        !game.team[index]
    ) return false;

    const pokemon =
        game.team[index];

    if (
        pokemon.fainted ||
        pokemon.hp <= 0
    ) {

        alert(
            `${pokemon.name} está debilitado.`
        );

        return false;
    }

    game.currentPokemon =
        index;

    saveCurrentGame();

    if (
        typeof updateBattlePlayer ===
        "function"
    ) {

        updateBattlePlayer();

    }

    showScreen("battle");

    return true;
}

function markDexSeen(id) {

    id = Number(id);

    if (
        !game.dexSeen.includes(id)
    ) {

        game.dexSeen.push(id);

        saveCurrentGame();

    }
}

function skipCapture() {

    showMap();

}

function capturePokemon(pokemon) {

    const added =
        addPokemon(pokemon);

    if (added) {

        alert(
            `¡${pokemon.name} se unió a tu equipo!`
        );

    }

    showMap();

}

function openDex() {

    showScreen("dex");

    if (
        typeof loadDex === "function"
    ) {
        loadDex();
    }
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const saved =
            loadGameData();

        if (
            saved &&
            saved.started
        ) {

            game = saved;

        }

    }
);

window.newRun = newRun;
window.loadRun = loadRun;
window.showScreen = showScreen;
window.openDex = openDex;
window.healTeam = healTeam;
window.openSwitchMenu = openSwitchMenu;
window.closeSwitchMenu = closeSwitchMenu;
window.switchPokemon = switchPokemon;
window.skipCapture = skipCapture;
window.capturePokemon = capturePokemon;
