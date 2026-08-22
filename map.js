/* =========================================================
   POKELAB — MAP SYSTEM
   ========================================================= */

let currentMapNode = null;
let mapLocked = false;


/* ---------------------------------------------------------
   CREAR MAPA
--------------------------------------------------------- */

function generateMap() {

    const container = document.getElementById("mapNodes");

    if (!container) return;

    container.innerHTML = "";

    const map = [

        {
            id: 1,
            nodes: [
                { type: "battle" }
            ]
        },

        {
            id: 2,
            nodes: [
                { type: "battle" },
                { type: "item" }
            ]
        },

        {
            id: 3,
            nodes: [
                { type: "battle" },
                { type: "capture" },
                { type: "heal" }
            ]
        },

        {
            id: 4,
            nodes: [
                { type: "battle" },
                { type: "item" }
            ]
        },

        {
            id: 5,
            nodes: [
                { type: "boss" }
            ]
        }

    ];


    map.forEach((column, columnIndex) => {

        const columnElement =
            document.createElement("div");

        columnElement.className =
            "map-column";


        column.nodes.forEach((nodeData, nodeIndex) => {

            const node =
                createMapNode(
                    nodeData,
                    columnIndex,
                    nodeIndex
                );

            columnElement.appendChild(node);

        });


        container.appendChild(columnElement);

    });

}


/* ---------------------------------------------------------
   CREAR NODO
--------------------------------------------------------- */

function createMapNode(nodeData, columnIndex, nodeIndex) {

    const node =
        document.createElement("button");

    node.type = "button";

    node.className =
        `map-node ${nodeData.type}`;

    node.dataset.column =
        columnIndex;

    node.dataset.index =
        nodeIndex;


    const icon =
        getNodeIcon(nodeData.type);

    const title =
        getNodeTitle(nodeData.type);


    node.innerHTML = `

        <span class="map-node-icon">
            ${icon}
        </span>

        <span class="map-node-label">
            ${title}
        </span>

    `;


    node.addEventListener("click", () => {

        if (mapLocked) return;

        selectMapNode(nodeData.type);

    });


    return node;

}


/* ---------------------------------------------------------
   ICONOS
--------------------------------------------------------- */

function getNodeIcon(type) {

    switch (type) {

        case "battle":
            return "⚔";

        case "capture":
            return "●";

        case "item":
            return "▣";

        case "heal":
            return "✚";

        case "boss":
            return "♛";

        default:
            return "?";

    }

}


/* ---------------------------------------------------------
   NOMBRES
--------------------------------------------------------- */

function getNodeTitle(type) {

    switch (type) {

        case "battle":
            return "COMBATE";

        case "capture":
            return "ENCUENTRO";

        case "item":
            return "OBJETO";

        case "heal":
            return "CENTRO";

        case "boss":
            return "JEFE";

        default:
            return "???";

    }

}


/* ---------------------------------------------------------
   SELECCIONAR NODO
--------------------------------------------------------- */

async function selectMapNode(type) {

    if (mapLocked) return;

    mapLocked = true;


    switch (type) {

        case "battle":

            await startBattle();

            break;


        case "boss":

            await startBossBattle();

            break;


        case "capture":

            await showCapture();

            break;


        case "heal":

            openPokemonCenter();

            break;


        case "item":

            collectItem();

            break;

    }


    mapLocked = false;

}


/* ---------------------------------------------------------
   JEFE
--------------------------------------------------------- */

async function startBossBattle() {

    game.isBossBattle = true;

    await startBattle();

}


/* ---------------------------------------------------------
   CENTRO POKÉMON
--------------------------------------------------------- */

function openPokemonCenter() {

    showScreen("heal");

}


/* ---------------------------------------------------------
   CURAR EQUIPO
--------------------------------------------------------- */

function healTeam() {

    if (!game.team) return;


    game.team.forEach(pokemon => {

        pokemon.currentHP =
            pokemon.stats.hp;

    });


    saveGame();


    showPokemonCenterAnimation();

}


/* ---------------------------------------------------------
   ANIMACIÓN CENTRO
--------------------------------------------------------- */

function showPokemonCenterAnimation() {

    const message =
        document.querySelector(
            "#heal .center-box p"
        );


    if (message) {

        message.textContent =
            "Curando a tus Pokémon...";

    }


    setTimeout(() => {

        if (message) {

            message.textContent =
                "¡Tus Pokémon están completamente recuperados!";

        }


        setTimeout(() => {

            game.route++;

            saveGame();

            startAdventure();

        }, 1200);

    }, 1000);

}


/* ---------------------------------------------------------
   OBJETOS
--------------------------------------------------------- */

function collectItem() {

    const rewards = [

        {
            type: "coins",
            amount: 100,
            text: "Encontraste ₽100."
        },

        {
            type: "coins",
            amount: 200,
            text: "Encontraste ₽200."
        },

        {
            type: "heal",
            amount: 0,
            text: "Encontraste una poción."
        }

    ];


    const reward =
        rewards[
            Math.floor(
                Math.random() *
                rewards.length
            )
        ];


    if (reward.type === "coins") {

        game.coins +=
            reward.amount;

    }


    if (reward.type === "heal") {

        healRandomPokemon();

    }


    saveGame();


    showItemMessage(
        reward.text
    );

}


/* ---------------------------------------------------------
   CURAR UN POKÉMON
--------------------------------------------------------- */

function healRandomPokemon() {

    const damaged =
        game.team.filter(
            pokemon =>
                pokemon.currentHP <
                pokemon.stats.hp
        );


    if (!damaged.length) return;


    const pokemon =
        damaged[
            Math.floor(
                Math.random() *
                damaged.length
            )
        ];


    const amount =
        Math.floor(
            pokemon.stats.hp * 0.30
        );


    pokemon.currentHP =
        Math.min(
            pokemon.stats.hp,
            pokemon.currentHP + amount
        );

}


/* ---------------------------------------------------------
   MENSAJE DE OBJETO
--------------------------------------------------------- */

function showItemMessage(text) {

    const oldScreen =
        document.querySelector(
            ".item-message"
        );


    if (oldScreen)
        oldScreen.remove();


    const message =
        document.createElement("div");


    message.className =
        "item-message";


    message.innerHTML = `

        <div class="item-message-box">

            <div class="item-ball">
                ●
            </div>

            <h2>
                ¡OBJETO ENCONTRADO!
            </h2>

            <p>
                ${text}
            </p>

            <button>
                CONTINUAR
            </button>

        </div>

    `;


    document.body.appendChild(message);


    message
        .querySelector("button")
        .onclick = () => {

            message.remove();

            game.route++;

            saveGame();

            startAdventure();

        };

}


/* ---------------------------------------------------------
   AVANZAR RUTA
--------------------------------------------------------- */

function nextRoute() {

    game.route++;

    saveGame();

    startAdventure();

}


/* ---------------------------------------------------------
   ACTUALIZAR MAPA
--------------------------------------------------------- */

function refreshMap() {

    generateMap();

}


/* ---------------------------------------------------------
   INICIAR
--------------------------------------------------------- */

window.addEventListener(
    "load",
    () => {

        if (
            typeof game !== "undefined"
        ) {

            generateMap();

        }

    }
);
