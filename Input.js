// SELECT ELEMENTS
const options = document.querySelector(".menu");
const gameOverElement = document.querySelector(".gameOver");

// SELECT BUTTONS
const computerBtn = options.querySelector(".ComputerAndAlgorithm");
const friendBtn = options.querySelector(".Human");
const xBtn = options.querySelector(".X");
const oBtn = options.querySelector(".O");
const playBtn = options.querySelector(".play");

// SOME VARIABLES TO STORE USER'S OPTIONS
let OPPONENT;
const player = new Object;

// ADD AND EVENT LISTENER TO EVERY BUTTON
computerBtn.addEventListener("click", function () {
    OPPONENT = "computer";

    switchActive(friendBtn, computerBtn);
});

friendBtn.addEventListener("click", function () {
    OPPONENT = "friend";

    switchActive(computerBtn, friendBtn);
});

xBtn.addEventListener("click", function () {
    player.man = "X";
    player.computer = "O";
    player.friend = "O";

    switchActive(oBtn, xBtn);
});

oBtn.addEventListener("click", function () {
    player.man = "O";
    player.computer = "X";
    player.friend = "X";

    switchActive(xBtn, oBtn);
});

playBtn.addEventListener("click", function () {
    // CHECK IF THE USER CHOSE AN OPPONENT
    if (!OPPONENT) {
        computerBtn.style.backgroundColor = "#f00";
        friendBtn.style.backgroundColor = "#f00";

        return;
    }

    // CHECK IF THE USER CHOSE A SYMBOL
    if (!player.man) {
        xBtn.style.backgroundColor = "#f00";
        oBtn.style.backgroundColor = "#f00";

        return;
    }

    // RUN THE GAME
    init(player, OPPONENT);
    options.classList.add("hide");
});

// SWITCH ACTIVE CLASS BETWEEN TWO ELEMENTS
function switchActive(off, on) {
    off.classList.remove("active");
    on.classList.add("active");
}

/** const options = document.querySelector(".menu");
const gameOver = document.querySelector(".gameOver");

const AIbtn = options.querySelector(".ComputerAndAlgorithm");
const humanBtn = options.querySelector(".Human");
const Xin = options.querySelector(".X");
const Oin = options.querySelector(".O");
const playBtn = options.querySelector(".play");

let OPPONENT;
const player = new Object;

AIbtn.addEventListener("click", function () {
    OPPONENT = "computer";
    switchActiveInput(humanBtn, AIbtn);
});

humanBtn.addEventListener("click", function () {
    OPPONENT = "friend";
    switchActiveInput(AIbtn, humanBtn);
});

Xin.addEventListener("click", function () {
    player.firstMove = "X";
    player.computer = "O";
    player.friend = "O";
    switchActiveInput(Oin, Xin);
});

Oin.addEventListener("click", function () {
    player.firstMove = "O";
    player.computer = "X";
    player.friend = "X";
    switchActiveInput(Xin, Oin);
});

playBtn.addEventListener("click", function () {
    if (!OPPONENT) {
        AIbtn.style.backgroundColor = "#f00";
        humanBtn.style.backgroundColor = "#f00";
        return;
    }
    if (!player.firstMove) {
        Xin.style.backgroundColor = "#f00";
        Oin.style.backgroundColor = "#f00";
        return;
    }
    init(player, OPPONENT);
    options.classList.add("hide");
});

function switchActiveInput(off, on) {
    off.classList.remove("active");
    on.classList.add("active");
}*/