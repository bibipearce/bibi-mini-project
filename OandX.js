
//retrieve elements we want to interact with
const board = document.getElementById('board') 
const squares = document.getElementsByClassName('square')
const restartButton = document.getElementById('restartButton')
const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')

//make players to interact with the game/board
const players = ['X', 'O']
let currentPlayer = players[0] //first player is X
//allow players to enter names for personalisation
function playersNames () {
    if (currentPlayer === 'X') {
        return player1.value || 'Player 1' //need to keep 'or player 1' incase no name is entered
    } else {
        return player2.value || 'Player 2'
    }
}

//we need to define how the game can be won and check for that
//these are combos of squares that will equate a win
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

//this is saying if the text in each box of a winning combo is all X or O, then that player wins
function checkWin(currentPlayer) {
    for (let i=0; i<winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i]
        if (squares[a].textContent === currentPlayer && 
            squares[b].textContent === currentPlayer && 
            squares[c].textContent === currentPlayer
        ) {
            return [a, b, c]
        }
    }
    return null
}

//this is checking if every square is full (with anything)
function checkTie() {
    for (let i=0; i<squares.length; i++) {
        if (squares[i].textContent === '') {
            return false
        }
    }
    return true
}

let gameActive = true //this will later allow the game to be played or not

//this is what happens when we want to restart
//clears board and highlighted squares (if any) and resets
function restart() {
    for (let i=0; i<squares.length; i++) {
        squares[i].textContent = "";
        squares[i].classList.remove('winner');
    }
    message.textContent = `It is ${playersNames()}'s turn!`; //have to double click button to get correct player message ?? needs fixing
    currentPlayer = players[0];
    gameActive = true;
}
restartButton.addEventListener('click', restart) //allows us to execute that function when button is clicked


//we need a message/prompt when its a players turn/the game is won etc
const message = document.createElement('h2')
//created a message here and can add content and styles to it:
message.textContent = `It is ${playersNames()}'s turn!`
message.style.marginTop ="30px"
message.style.textAlign ="center"
board.after(message)
//need to look into this more as not sure why created here and not html/css


//logic to add all functions etc above together and create correct messages
//loop so win/ties are continously looked for each go
for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', () => { //when squares are clicked...
        if (!gameActive) return //if game is won, exit loop so board is no longer interactive
        
        if(squares[i].textContent !== ''){ //doesn't allow us to use squares already used
            return
        }
        squares[i].textContent = currentPlayer //put current players symbol in square
        
        if(checkWin(currentPlayer)) {
            message.textContent=`Game over! ${playersNames()} wins!`
        
            checkWin(currentPlayer).forEach(a => {
            squares[a].classList.add('winner') //highlights winning combo of squares using winner from css
        })
            
        gameActive = false //game no longer active after a win
            return
        }
        
        if(checkTie()) {
            message.textContent= `Game is tied!`
            gameActive = false 
            return
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0] 
        message.textContent = `It is ${playersNames()}'s turn!` //switches between players in the message, whilst game is active
    })   
}
