const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const popSound = document.getElementById("pop");
const drawSound = document.getElementById("draw");
const winSound = document.getElementById("win");
const clickSound = document.getElementById("click");




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
const winline=[
    [1, -110, 0],
    [0, -28, 0],
    [0, 52, 0],
    [-80, -30, 90],
    [0, -28, 90],
    [82, -30, 90],
    [0, -30, 45],
    [0, -30, 135]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    playerColor(this,cellIndex);
    checkWinner();
    playClickSound();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn 🤔`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            drawline();
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
        document.querySelector(".line").style.width="320px";
        playWinSound();
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw! 😒`;
        playDrawSound();
        running = false;
    }
    else{
        changePlayer();
    }
}

function drawline(){

    const lineDiv = document.querySelector(".line");

    // Find the index of the winning condition
    let winIndex = -1;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA != "" && cellA === cellB && cellB === cellC) {
            winIndex = i;
            break;
        }
    }

    // If a winning condition is found, draw the line
    if (winIndex !== -1) {
        const transformation = winline[winIndex];
        applyTransformation(transformation);
    }
}

// Function to apply transformation to the div
function applyTransformation(transformation) {
    const lineDiv = document.querySelector(".line");
    lineDiv.style.transform = `translate(${transformation[0]}px, ${transformation[1]}px) rotate(${transformation[2]}deg)`;


}


function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    document.querySelector(".line").style.width="0px";
    statusText.textContent = `Player ${currentPlayer}'s turn 🤔`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    playSound();
}

function playerColor(cell, index){
    if(currentPlayer=="X"){
        for(cellIndex in cells){
            cells.forEach(cellIndex=>cell.style.color = "#F6CACA");
        }
    }
    else if(currentPlayer=="O"){
        for(cellIndex in cells){
            cells.forEach(cellIndex=>cell.style.color = "#87A0B2");
        }
    }
}

function playSound() {
    popSound.play();
}

function playDrawSound() {
    drawSound.play();
}

function playWinSound() {
    winSound.play();
}

function playClickSound() {
    clickSound.play();
}
