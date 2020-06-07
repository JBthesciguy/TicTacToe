function init(player, OPPONENT) {
    // SELECT CANAVS
    const canvas = document.getElementById("cvs");
    const ctx = canvas.getContext("2d");

    // BOARD VARIABLES
    let board = [];
    const COLUMN = 3;
    const ROW = 3;
    const SPACE_SIZE = 150;

    // STORE PLAYER'S MOVES
    let gameData = new Array(9);

    // By default the first player to play is the human
    let currentPlayer = player.man;

    // load X & O images
    const xImage = new Image();
    xImage.src = "img/X.png";

    const oImage = new Image();
    oImage.src = "img/O.png";

    // Win combinations
    const COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // FOR GAME OVER CHECK
    let GAME_OVER = false;

    // DRAW THE BOARD
    function drawBoard() {
        // WE give every space a unique id
        // So we know exactly where to put the player's move on the gameData Array
        let id = 0
        for (let i = 0; i < ROW; i++) {
            board[i] = [];
            for (let j = 0; j < COLUMN; j++) {
                board[i][j] = id;
                id++;

                // draw the spaces
                ctx.strokeStyle = "#000";
                ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
            }
        }
    }
    drawBoard();

    // ON PLAYER'S CLICK
    canvas.addEventListener("click", function (event) {

        // IF IT's A GAME OVER? EXIT
        if (GAME_OVER) return;

        // X & Y position of mouse click relative to the canvas
        let X = event.clientX - canvas.getBoundingClientRect().x;
        let Y = event.clientY - canvas.getBoundingClientRect().y;

        // WE CALCULATE i & j of the clicked SPACE
        let i = Math.floor(Y / SPACE_SIZE);
        let j = Math.floor(X / SPACE_SIZE);

        // Get the id of the space the player clicked on
        let id = board[i][j];

        // Prevent the player to play the same space twice
        if (gameData[id]) return;

        // store the player's move to gameData
        gameData[id] = currentPlayer;

        // draw the move on board
        drawOnBoard(currentPlayer, i, j);

        // Check if the play wins
        if (isWinner(gameData, currentPlayer)) {
            showGameOver(currentPlayer);
            GAME_OVER = true;
            return;
        }

        // check if it's a tie game
        if (isTie(gameData)) {
            showGameOver("tie");
            GAME_OVER = true;
            return;
        }

        // GIVE TURN TO THE OTHER PLAYER
        currentPlayer = currentPlayer == player.man ? player.friend : player.man;
    });

    // check for a winner
    function isWinner(gameData, player) {
        for (let i = 0; i < COMBOS.length; i++) {
            let won = true;

            for (let j = 0; j < COMBOS[i].length; j++) {
                let id = COMBOS[i][j];
                won = gameData[id] == player && won;
            }

            if (won) {
                return true;
            }
        }
        return false;
    }

    // Check for a tie game
    function isTie(gameData) {
        let isBoardFill = true;
        for (let i = 0; i < gameData.length; i++) {
            isBoardFill = gameData[i] && isBoardFill;
        }
        if (isBoardFill) {
            return true;
        }
        return false;
    }

    // SHOW GAME OVER
    function showGameOver(player) {
        let message = player == "tie" ? "Oops No Winner" : "The Winner is";
        let imgSrc = `img/${player}.png`;

        gameOverElement.innerHTML = `
            <h1>${message}</1>
            <img class="winner-img" src=${imgSrc} </img>
            <div class="play" onclick="location.reload()">Play Again!</div>
        `;

        gameOverElement.classList.remove("hide");
    }

    // draw on board
    function drawOnBoard(player, i, j) {
        let img = player == "X" ? xImage : oImage;

        // the x,y positon of the image are the x,y of the clicked space
        ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE);
    }
}

/**function init(player, OPPONENT) {
    canvas = document.getElementById("cvs");
    ctx = canvas.getContext("2d");

    let inputData = new Array(9);
    let OXinputpos = [];
    const column = 3;
    const row = 3;
    const SQUARE_SIZE = 150;

    let currentPlayer = player.firstMove;

    const Ximage = new Image();
    Ximage.src = "img/X.png";

    const Oimage = new Image();
    Oimage.src = "img/O.png";

    winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    let game_Over = False;

    function drawBoard() {
        let InputDataPositions = 0;
        for (var i = 0; i < row; i++) {
            OXinputpos[i] = [];
            for (var j = 0; j < column; j++) {
                OXinputpos[i][j] = InputDataPositions;
                InputDataPositions++;
                ctx.strokeStyle = "#000";
                ctx.strokeRect(j * SQUARE_SIZE, i * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
            }
        }
    }

    drawBoard();

    canvas.addEventListener("click", function (event) {
        if (game_Over) {
            return
        }

        // Retrieves the coordinates of the player input
        let X = event.clientX - canvas.getBoundingClientRect().x;
        let Y = event.clientY - canvas.getBoundingClientRect().y;

        // Converts it to 2d array address
        let i = Math.floor(Y / SQUARE_SIZE);
        let j = Math.floor(X / SQUARE_SIZE);

        // Gives each input a 1d array address i.e. [0, 0] = 0 ... [2, 2] = 8
        let InputDataPositions = OXinputpos[i][j];

        if (inputData[InputDataPositions]) {
            return;
        }

        inputData[InputDataPositions] = currentPlayer;

        drawPieceOnBoard(currentPlayer, i, j);

        if (isWinner(inputData, currentPlayer)) {
            displayGameOver(currentPlayer);
            game_Over = true;
        }

        if (isTie(inputData)) {
            displayGameOver("tie");
            game_Over = true;
        }

        function isWinner(inputData, player) {
            for (var i = 0; i < winCombos.length; i++) {
                let won = true;
                for (var j = 0; j < winCombos[i].length; j++) {
                    let BoardInputID = winCombos[i][j];
                    won = inputData[BoardInputID] == player && won;
                }
                if (won) {
                    return true;
                }
            }
            return false;
        }

        function isTie(inputData) {
            let boardIsFilled = true;
            for (var i = 0; i < inputData.length; i++) {
                boardIsFilled = inputData[i] && boardIsFilled;
            }
            if (boardIsFilled) {
                return true;
            }
            return false;
        }

        function displayGameOver(player) {
            let display = player == "tie" ? "No winner" : "The winner is";
            let imgSrc = 'img/${player}.png';

            gameOver.innerHTML =
                '<h1>${display}</h1> <img class = "winner-img" src = $ {imgSrc} < /img> <div class = "play" onclick = "location.reload()" > Play Again! < /div>';

            gameOver.classList.remove("hide");
        }


        function drawPieceOnBoard(player, i, j) {
            let img = player == "X" ? Ximage : Oimage;
            ctx.drawImage(img, j * SQUARE_SIZE, i * SQUARE_SIZE);
        }

    });
} */