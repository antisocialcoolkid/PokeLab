let currentMap = [];

function generateMap() {

    currentMap = [];

    const types = [
        "battle",
        "battle",
        "catch",
        "item"
    ];

    for (let layer = 0; layer < 4; layer++) {

        const nodes = [];

        const count = layer === 0 ? 1 : 3;

        for (let i = 0; i < count; i++) {

            let type;

            if (layer === 3) {
                type = "BOSS";
            } else {
                type =
                    types[
                        Math.floor(
                            Math.random() * types.length
                        )
                    ];
            }

            nodes.push({
                id: `${layer}-${i}`,
                type:type,
                unlocked:layer === 0
            });

        }

        currentMap.push(nodes);
    }

    renderMap();
}

function renderMap() {

    const container =
        document.getElementById("mapNodes");

    container.innerHTML = "";

    currentMap.forEach((layer,index) => {

        layer.forEach(node => {

            const button =
                document.createElement("div");

            button.className =
                `node ${node.type.toLowerCase()}`;

            button.innerHTML =
                getNodeIcon(node.type);

            button.onclick = () =>
                selectNode(node);

            container.appendChild(button);

        });

    });

}

function getNodeIcon(type) {

    switch(type) {

        case "battle":
            return "⚔️";

        case "catch":
            return "🐾";

        case "item":
            return "🎁";

        case "BOSS":
            return "👑";

        default:
            return "?";
    }
}
