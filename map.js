/* =========================================================
   POKELAB — map.js
========================================================= */

const ROUTES = {

    1: [
        {
            type: "battle",
            icon: "⚔️",
            label: "ENTRENADOR"
        },
        {
            type: "capture",
            icon: "🌿",
            label: "HIERBA"
        },
        {
            type: "item",
            icon: "🎒",
            label: "OBJETO"
        },
        {
            type: "heal",
            icon: "🏥",
            label: "CENTRO"
        },
        {
            type: "battle",
            icon: "⚔️",
            label: "ENTRENADOR"
        },
        {
            type: "boss",
            icon: "👑",
            label: "JEFE"
        }
    ],

    2: [
        {
            type: "capture",
            icon: "🌿",
            label: "HIERBA"
        },
        {
            type: "battle",
            icon: "⚔️",
            label: "ENTRENADOR"
        },
        {
            type: "item",
            icon: "🎒",
            label: "OBJETO"
        },
        {
            type: "capture",
            icon: "🌿",
            label: "HIERBA"
        },
        {
            type: "heal",
            icon: "🏥",
            label: "CENTRO"
        },
        {
            type: "boss",
            icon: "👑",
            label: "JEFE"
        }
    ],

    3: [
        {
            type: "battle",
            icon: "⚔️",
            label: "ENTRENADOR"
        },
        {
            type: "battle",
            icon: "⚔️",
            label: "ENTRENADOR"
        },
        {
            type: "capture",
            icon: "🌿",
            label: "HIERBA"
        },
        {
            type: "item",
            icon: "🎒",
            label: "OBJETO"
        },
        {
            type: "heal",
            icon: "🏥",
            label: "CENTRO"
        },
        {
            type: "boss",
            icon: "👑",
            label: "JEFE"
        }
    ]

};

function renderMap() {

    const container =
        $("mapNodes");

    if (!container) return;

    container.innerHTML = "";

    const route =
        ROUTES[game.route] ||
        ROUTES[1];

    const columns = [];

    route.forEach(
        (node, index) => {

            if (
                index % 2 === 0
            ) {

                columns.push([]);

            }

            columns[
                columns.length - 1
            ].push(node);

        }
    );

    columns.forEach(
        (column, columnIndex) => {

            const wrapper =
                document.createElement("div");

            wrapper.className =
                "map-column";

            column.forEach(
                (node, nodeIndex) => {

                    const button =
                        document.createElement("button");

                    button.className =
                        `map-node ${node.type}`;

                    button.innerHTML = `
                        <div class="map-node-icon">
                            ${node.icon}
                        </div>

                        <div class="map-node-label">
                            ${node.label}
                        </div>
                    `;

                    button.onclick =
                        () => handleMapNode(node);

                    wrapper.appendChild(
                        button
                    );

                }
            );

            container.appendChild(
                wrapper
            );

        }
    );

    const routeNumber =
        $("routeNumber");

    if (routeNumber) {

        routeNumber.textContent =
            game.route;

    }

}

function handleMapNode(node) {

    switch (node.type) {

        case "battle":

            startRandomBattle(false);

            break;

        case "capture":

            openCapture();

            break;

        case "item":

            getMapItem();

            break;

        case "heal":

            showScreen("heal");

            break;

        case "boss":

            startRandomBattle(true);

            break;

    }

}

function openCapture() {

    showScreen("capture");

    const container =
        $("captureList");

    if (!container) return;

    container.innerHTML = "";

    const options =
        getCaptureOptions();

    options.forEach(
        pokemon => {

            const card =
                document.createElement("button");

            card.className =
                "starter-card";

            card.innerHTML = `
                <img
                    src="${pokemon.sprite}"
                    alt="${pokemon.name}"
                >

                <h2>
                    ${pokemon.name}
                </h2>

                <p>
                    Nv. ${pokemon.level}
                </p>
            `;

            card.onclick =
                () => capturePokemon(
                    pokemon
                );

            container.appendChild(
                card
            );

        }
    );

}

function getMapItem() {

    const items = [
        "Poción",
        "Superpoción",
        "Poké Ball"
    ];

    const item =
        items[
            Math.floor(
                Math.random() *
                items.length
            )
        ];

    const rewards = {
        "Poción": 50,
        "Superpoción": 100,
        "Poké Ball": 75
    };

    const amount =
        rewards[item];

    game.coins += amount;

    saveCurrentGame();

    updateHeader();

    alert(
        `¡Encontraste ${item}!\n\n+₽${amount}`
    );

}

window.renderMap = renderMap;
window.openCapture = openCapture;
window.handleMapNode = handleMapNode;
window.getMapItem = getMapItem;
