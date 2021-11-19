const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
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


const cellElements = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const messageText = document.querySelector(".message-text");
const messageContainer = document.querySelector(".winning-message");
const restartButton = document.querySelector("#restartButton");

let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setHoverBoardClass();
  messageContainer.classList.remove("show");
}

function handleClick(event) {
  const cell = event.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  cell.classList.add(currentClass);
  let IS_DRAW = false;
  if (checkWin(currentClass)) {
    endGame(IS_DRAW);
  } else if (checkDraw()) {
    IS_DRAW = true;
    endGame(IS_DRAW);
  } else {
    circleTurn = !circleTurn;
    setHoverBoardClass();
  }
}

function setHoverBoardClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) board.classList.add(CIRCLE_CLASS);
  else board.classList.add(X_CLASS);
}

function checkWin(currentClass) {
  return winning_combinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function checkDraw() {
  return [...cellElements].every((item) => {
    return (
      item.classList.contains(X_CLASS) || item.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(IS_DRAW) {
  if(IS_DRAW){
    messageText.innerText = "Draw!!";
  }
  else
  messageText.innerText = circleTurn? "O wins!!" : "X wins!!";
  messageContainer.classList.add("show");
}
