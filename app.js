const p2 = document.getElementById("p2");
const p1 = document.getElementById("p1");
const box = document.getElementsByClassName("box");
const clearGame = document.getElementById("clear-button");
const singleBtn = document.getElementById("single-btn");
const multiBtn = document.getElementById("multi-btn");
const gameContainer = document.getElementById('board-container');
const winnerContainer = document.getElementById("winner-container");

 
let game = true;
let checkWinner = "";
let playerTurn = randNum;
let counter = 0;
let boxTaken = [];
let getPlayer = "";
let newBoard = false;
let board = ["", "", "", "", "", "", "", "", ""];
 
const gameBoard = 
[
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]];
 
function multiplayer() {
   document.getElementById("multi-btn").classList.add("playerMode");
 
   if (getPlayer === "singlePlayer") {
       window.location.reload();
       document.getElementById("single-btn").classList.add("playerMode");
       document.getElementById("multi-btn").classList.remove("playerMode");
   }
   randNum();
   getPlayer = "multiplayer";
   function switchPlayer(event) {
 
       if (game) {
           winnerContainer.innerHTML = "";
 
           let play = event.target;
           const cellGrid = play.getAttribute("cellGrid");
           if (play.innerText === "") {
               if (playerTurn == "O") {
                   document.getElementById("p2").classList.add("grid-board");
                   document.getElementById("p1").classList.remove("grid-board");
                   playerTurn = "X";
               } else if (playerTurn == "X") {
                   document.getElementById("p1").classList.add("grid-board");
                   document.getElementById("p2").classList.remove("grid-board");
                   playerTurn = "O"
               }
           }
 
           if (board[cellGrid] === "") {
               board[cellGrid] = playerTurn;
               if (play.innerText === "") {
                   play.innerText = playerTurn;
               }
           }
       }
 
       for (let i = 0; i < gameBoard.length; i++) {
 
           let subArr = gameBoard[i];
           let firstElement = board[subArr[0]];
           let secondElement = board[subArr[1]];
           let thirdElement = board[subArr[2]];
 
           if(firstElement == "" || secondElement == "" || thirdElement == "") {
               continue;
           }
 
           if (firstElement == secondElement && secondElement == thirdElement && game == true) {
 
               const winnerArr = gameBoard[i];
               for (let i = 0; i < winnerArr.length; i++) {
                   const elementId = winnerArr[i];
                   document.getElementById(elementId).classList.add("win-sequence");
               }
 
               if (playerTurn === "X") {
                   if (document.getElementById("p1").value.length > 0) {
                       winnerContainer.innerHTML = document.getElementById("p1").value + " won!";
                   } else {
                       winnerContainer.innerHTML = "Player X Won!";
                   }
 
               } else if (playerTurn === "O") {
 
                   if (document.getElementById("p2").value.length > 0) {
                       winnerContainer.innerHTML = document.getElementById("p2").value + " won!";
                   } else {
                       winnerContainer.innerHTML = "Player O Won!";
                   }
               }
               checkWinner = playerTurn;
               game = false;
           }
       }
       if (!board.includes("") && game) {
           winnerContainer.innerHTML = "Draw";
           document.getElementById("input-names").classList.add("grid-ttt");
           document.getElementById("p1").classList.remove("grid-board");
           document.getElementById("p2").classList.remove("grid-board");
       }
   }
   gameContainer.addEventListener("click", switchPlayer);
}
 
winnerContainer.innerHTML = "click a box to start!";
 
function singlePlayer() {
   winnerContainer.innerHTML = "click a box to start!";
   document.getElementById("single-btn").classList.add("playerMode");
 
   if (getPlayer === "multiplayer") {
       window.location.reload();
       document.getElementById("multi-btn").classList.add("playerMode");
       document.getElementById("single-btn").classList.remove("playerMode");
   }
   getPlayer = "singlePlayer";
   p2.value = "Computer";
   function switchPlayerOne(event) {
 
       if (game) {
           winnerContainer.innerHTML = "";
           let play = event.target;
           const cellGrid = play.getAttribute("cellGrid");
 
           if (board[cellGrid] === "") {
               board[cellGrid] = "X";
               if (play.innerText === "") {
                   play.innerText = "X";
                   for (let i = 0; i < board.length; i++) {
                       if (board[i] === "") {
                           boxTaken.push(i);
                           counter++;
                       }
                   }
 
                   let randPos = Math.floor(Math.random() * boxTaken.length);
                   randPos = boxTaken[randPos];
 
                   for (let i = 0; i < gameBoard.length; i++) {
                       let subArr = gameBoard[i];
                       let firstElement = board[subArr[0]];
                       let secondElement = board[subArr[1]];
                       let thirdElement = board[subArr[2]];
 
                       if (firstElement != "" && secondElement != "" || thirdElement != "" && secondElement != "") {
                           if (firstElement === secondElement || secondElement === thirdElement) {
                               for (let j = 0; j < subArr.length; j++) {
                                   if (board[subArr[j]] === "" && newBoard === false && game) {
                                       document.getElementById(subArr[j]).innerHTML = "O";
                                       board[subArr[j]] = "O";
                                       newBoard = true;
                                   }
                               }
                           }
                       }
                   }
                   if (game && boxTaken.length > 0 && newBoard === false) {
                       document.getElementById(randPos).innerHTML = "O";
                       board[randPos] = "O";
                       newBoard = true;
                   }
               }
               newBoard = false;
               boxTaken = [];
           }
 
           for (let i = 0; i < gameBoard.length; i++) {
               let subArr = gameBoard[i];
 
               let firstElement = board[subArr[0]];
               let secondElement = board[subArr[1]];
               let thirdElement = board[subArr[2]]
 
               if (firstElement === "" || secondElement === "" || thirdElement === "") {
                continue;
               }
 
               if (firstElement === secondElement && secondElement === thirdElement && game) 
               {   const winnerArr = gameBoard[i];
                   for (let i = 0; i < winnerArr.length; i++) {
                       const elementId = winnerArr[i];
                      
                       document.getElementById(elementId).classList.add("win-sequence");
                   }
                   if (firstElement === "X" || secondElement === "X" || thirdElement === "X" ) {
                       winnerContainer.innerHTML = "You won!";
                       checkWinner = "X"
                       game = false;
                   } else if (secondElement == "O") {
                       winnerContainer.innerText = "Computer Won!";
                       game = false;
                   }
               }
           }
           if (!board.searchElement("") && game) {
               winnerContainer.innerHTML = "Tie!";
               document.getElementById("input-names").classList.add("grid-ttt");
               game = false;
           }
       }
   }
   gameContainer.addEventListener("click", switchPlayerOne);
}
 
function randNum() {
   const randNum = Math.floor(Math.random() * 2);
   if (randNum === 0) {
       playerTurn = "O";
       document.getElementById("p1").classList.add("grid-board");
       document.getElementById("p2").classList.remove("grid-board");
   } else if (randNum === 1) {
       playerTurn = "X";
       document.getElementById("p2").classList.add("grid-board");
       document.getElementById("p1").classList.remove("grid-board");
   }
}
 
function resetBtn() {
   playerTurn = randNum;
   counter = 0;
   newBoard = false;
   game = true;
   checkWinner = "";
   board = ["", "", "", "", "", "", "", "", ""];
   boxTaken = [];
   
   for (let i = 0; i < 9; i++) {
       document.getElementById(i).innerHTML = "";
   }
   for (let i = 0; i < 9; i++) {
       document.getElementById(i).classList.remove("win-sequence");
   }
   if (getPlayer === "singlePlayer") {
   } else if (getPlayer === "multiplayer") {
       multiplayer();
   }
   document.getElementById("p1").classList.remove("grid-board");
   document.getElementById("p2").classList.remove("grid-board");
   document.getElementById("input-names").classList.remove("grid-ttt");
}
 
multiBtn.addEventListener("click", multiplayer);
singleBtn.addEventListener("click", singlePlayer);
clearGame.addEventListener("click", resetBtn);
