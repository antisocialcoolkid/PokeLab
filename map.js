let currentNodes = [];


function generateMap() {

    const container =
        document.getElementById(
            "mapNodes"
        );

    container.innerHTML = "";


    currentNodes = [];


    for (
        let layer = 0;
        layer < 5;
        layer++
    ) {

        const column =
            document.createElement(
                "div"
            );

        column.className =
            "map-column";


        let count = 1;


        if (
            layer === 1 ||
            layer === 2 ||
            layer === 3
        ) {
            count = 2;
        }


        if (layer === 4) {
            count = 1;
        }


        for (
            let i = 0;
            i < count;
            i++
        ) {

            let type;


            if (layer === 4) {

                type = "boss";

            } else {

                const types = [
                    "battle",
                    "battle",
                    "capture",
                    "item"
                ];

                type =
                    types[
                        Math.floor(
                            Math.random() *
                            types.length
                        )
                    ];

            }


            const node =
                document.createElement(
                    "div"
                );

            node.className =
                `map-node ${type}`;


            node.textContent =
                nodeIcon(type);


            node.onclick = () =>
                selectMapNode(type);


            column.appendChild(node);


            currentNodes.push({
                type
            });

        }


        container.appendChild(column);

    }

}


function nodeIcon(type) {

    if (type === "battle")
        return "⚔️";

    if (type === "capture")
        return "🐾";

    if (type === "item")
        return "🎁";

    if (type === "boss")
        return "👑";

    return "?";

}


async function selectMapNode(type) {

    if (game.battleRunning)
        return;


    if (
        type === "battle" ||
        type === "boss"
    ) {

        await startBattle();

        return;

    }


    if (type === "capture") {

        await showCapture();

        return;

    }


    if (type === "item") {

        game.coins += 100;

        alert(
            "Encontraste ₽100!"
        );

        game.route++;

        saveGame();

        startAdventure();

    }

}
