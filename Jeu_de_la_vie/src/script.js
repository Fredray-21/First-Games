class Cell {
    constructor() {
        this.active = false;
        this.i = 0;
        this.j = 0;
    }

    toggle() {
        this.active = !this.active;
    }

    click(id) {
        this.toggle();
        this.update(id);
        console.log(id);
    }

    update(id) {
        let td = document.getElementById(id);
        td.className = this.active ? "active" : "";
    }

    nextState() {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // Skip the cell itself
                if (board[this.i + i] && board[this.i + i][this.j + j] && board[this.i + i][this.j + j].active) {
                    count++;
                }
            }
        }

        if (this.active) {
            return count >= 2 && count <= 3; // Survive if 2 or 3 neighbors are alive
        } else {
            return count === 3; // Become alive if exactly 3 neighbors are alive
        }
    }
}

const colSize = 90;
const rowSize = 43;
let generation = 0;

// Création du tableau de cellules
let board = new Array(rowSize).fill(null).map((_, i) =>
    new Array(colSize).fill(null).map((_, j) => {
        let cellObj = new Cell();
        cellObj.i = i;
        cellObj.j = j;
        return cellObj;
    })
);

let root = document.getElementById("root");
let table = document.createElement("table");
let isRunning = false;

const buttonStart = document.getElementById("start");
buttonStart.addEventListener("click", () => {
    isRunning = !isRunning;
    buttonStart.innerText = isRunning ? "Stop" : "Start";
    buttonStart.className = isRunning ? "stop" : "start";
});

const buttonClear = document.getElementById("clear");
buttonClear.addEventListener("click", () => {
    isRunning = false;
    buttonStart.innerText = "Start";
    buttonStart.className = "start";
    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < colSize; j++) {
            board[i][j].active = false;
            board[i][j].update(i + "-" + j);
        }
    }
    generation = 0;
    updateGenerationCounter();
});

const speedRange = document.getElementById("speed");
speedRange.addEventListener("input", () => {
    clearInterval(interval);
    interval = setInterval(updateBoard, (speedRange.value / 20) * 200);
});

root.appendChild(table);

for (let i = 0; i < rowSize; i++) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    for (let j = 0; j < colSize; j++) {
        let td = document.createElement("td");
        td.id = i + "-" + j;
        td.className = board[i][j].active ? "active" : "";
        td.addEventListener("click", () => {
            board[i][j].click(i + "-" + j);
        });
        tr.appendChild(td);
    }
}

function updateBoard() {
    if (!isRunning) return;
    generation++;
    let newBoard = board.map((row, i) => row.map((cell, j) => {
        let newCell = new Cell();
        newCell.i = i;
        newCell.j = j;
        newCell.active = cell.nextState(); // Calculer le prochain état
        return newCell;
    }));

    for (let i = 0; i < rowSize; i++) {
        for (let j = 0; j < colSize; j++) {
            board[i][j].active = newBoard[i][j].active;
            board[i][j].update(i + "-" + j);
        }
    }

   updateGenerationCounter();
}

updateGenerationCounter = () => {
    const generationCounter = document.getElementById("generation");
    generationCounter.innerText = "Generation: " + generation;

}

let interval = setInterval(updateBoard, 1000);


