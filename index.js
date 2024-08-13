

const init = () => {
    let n = 3;
    const players = ["X", "O"];
    let winner = "";
    let currPlayer = 0;
    const X_CLASS = "X";
    const O_CLASS = "O";
    let totalCells = Math.pow(n, 2);
    let isDraw = false;
    let board = document.getElementById("game-board");
    const winning_combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const disableAllCells = (cells) => {
        cells.forEach((item) => item.classList.add("disabled"))
    }
    const calculateWinner = () => {
        const cells = document.querySelectorAll(".cell");
        const cellClasses = Array.from(cells).map(cell => cell.classList.contains(X_CLASS) ? X_CLASS : (cell.classList.contains(O_CLASS) ? O_CLASS : null));
        for (let item of winning_combinations) {
            const [a, b, c] = item;
            if (cellClasses[a] && (cellClasses[a] == cellClasses[b]) && (cellClasses[b] == cellClasses[c])) {
                winner = cellClasses[a];
                disableAllCells(cells);
                return;
            }
        }
        if (cellClasses.filter(Boolean).length == totalCells && !winner)
            isDraw = true;
    }

    const onCellClick = (event) => {
        const element = event.target;
        element.innerText = players[currPlayer];
        element.classList.add(players[currPlayer], "disabled");
        const gameStatus = document.getElementById("game-status");
        calculateWinner();
        if (winner) {
            const innerText  =  `Player ${winner} wins!`;
            gameStatus.setAttribute("aria-live", innerText )
            gameStatus.innerText = innerText;
        } else if (isDraw) {
            const innerText = `It's a draw!`
            gameStatus.setAttribute("aria-live", innerText);
            gameStatus.innerText = innerText;
        }
        else {
            currPlayer = (currPlayer + 1) % players.length;
            const innerText = `Player ${players[currPlayer]}'s turn`;
            gameStatus.innerText = innerText;
            gameStatus.setAttribute("aria-live", innerText);
        }
    }

    const drawBoard = () => {
        let noOfCells = Math.pow(n, 2);
        while (noOfCells != 0) {
            let cell = document.createElement("button");
            cell.className = "cell";
            cell.addEventListener("click", onCellClick);
            board.appendChild(cell);
            noOfCells--;
        }
    }
    const startGame = () => {
        const gameStatus = document.getElementById("game-status");
        gameStatus.innerText = `Player ${players[currPlayer]}'s turn`;
        board.setAttribute("aria-live", "Game has Started");
        drawBoard();
    }
   
    const resetGame = () => {
        board.innerHTML = "";
        currPlayer=0;
        winner = "";
        isDraw = false;
        drawBoard();
    }
    startGame();
    document.querySelector("#reset").addEventListener("click", resetGame);
}

init();