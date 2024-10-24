const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const queueX = [];
const queueO = [];

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer} - ход`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }

    if (currentPlayer == "X") {
        queueX.push(cellIndex);
        if (queueX.length > 3) {
            const oldCellIndex = queueX.shift(); // Удаляем старый ход
            options[oldCellIndex] = ""; // Очищаем ячейку
            cells[oldCellIndex].textContent = ""; // Обновляем визуально
        }
    } else {
        queueO.push(cellIndex);
        if (queueO.length > 3) {
            const oldCellIndex = queueO.shift(); // Удаляем старый ход
            options[oldCellIndex] = ""; // Очищаем ячейку
            cells[oldCellIndex].textContent = ""; // Обновляем визуально
        }
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer} - ход`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} побеждает!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Ничья!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer} - ход`;
    cells.forEach(cell => cell.textContent = "");
    queueX.length = 0; // Очищаем очередь для X
    queueO.length = 0; // Очищаем очередь для O
    running = true;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('restartBtn').click();
    }
});