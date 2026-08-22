let activePlayer;
let activeEnemy;

function startBattle() {

    activePlayer = {
        ...game.team[0]
    };

    const base =
        enemies[
            Math.floor(
                Math.random() * enemies.length
            )
        ];

    activeEnemy = {
        ...base
    };

    showScreen("battle");

    renderBattle();
}

function renderBattle() {

    document.getElementById("enemyName")
        .textContent = activeEnemy.name;

    document.getElementById("enemySprite")
        .textContent = activeEnemy.icon;

    document.getElementById("enemyHP")
        .textContent =
        `HP ${activeEnemy.hp}`;

    document.getElementById("playerName")
        .textContent = activePlayer.name;

    document.getElementById("playerSprite")
        .textContent = activePlayer.icon;

    document.getElementById("playerHP")
        .textContent =
        `HP ${activePlayer.hp}`;

    renderMoves();
}

function renderMoves() {

    const container =
        document.getElementById("moves");

    container.innerHTML = "";

    activePlayer.moves.forEach(move => {

        const button =
            document.createElement("button");

        button.textContent =
            move.name;

        button.onclick = () =>
            playerAttack(move);

        container.appendChild(button);

    });
}

function playerAttack(move) {

    const damage =
        move.power +
        Math.floor(Math.random() * 5);

    activeEnemy.hp -= damage;

    log(
        `${activePlayer.name} usa ${move.name}!`
    );

    if (activeEnemy.hp <= 0) {

        activeEnemy.hp = 0;

        renderBattle();

        setTimeout(() => {

            log("¡Has ganado!");

            setTimeout(() => {
                finishBattle();
            },700);

        },300);

        return;
    }

    renderBattle();

    setTimeout(enemyAttack,700);
}

function enemyAttack() {

    const damage =
        activeEnemy.attack +
        Math.floor(Math.random() * 4);

    activePlayer.hp -= damage;

    log(
        `${activeEnemy.name} ataca!`
    );

    if (activePlayer.hp <= 0) {

        activePlayer.hp = 0;

        renderBattle();

        setTimeout(() => {

            alert("GAME OVER");

            resetGame();

            showScreen("menu");

        },500);

        return;
    }

    renderBattle();
}

function log(text) {

    document.getElementById("battleLog")
        .textContent = text;
}
