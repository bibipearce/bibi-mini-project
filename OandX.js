
//retrieve elements we want to interact with
const board = document.getElementById('board') 
const squares = document.getElementsByClassName('square')
const restartButton = document.getElementById('restartButton')
const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')

//make players to interact with the game/board
const players = ['X', 'O']
let currentPlayer = players[0]
//allow players to enter names for personalisation
function playersNames () {
    if (currentPlayer === 'X') {
        return player1.value || 'Player 1'
    } else {
        return player2.value || 'Player 2'
    }
}

//we need to define how the game can be won and check for that
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

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
function restart() {
    for (let i=0; i<squares.length; i++) {
        squares[i].textContent = "";
        squares[i].classList.remove('winner');
    }
    message.textContent = `It is ${playersNames()}'s turn!`;
    currentPlayer = players[0];
    gameActive = true;
}
restartButton.addEventListener('click', restart)


//we need a message/prompt when its a players turn/the game is won etc
const message = document.createElement('h2')
//created a message here and can add content and styles to it:
message.textContent = `It is ${playersNames()}'s turn!`
message.style.marginTop ="30px"
message.style.textAlign ="center"
board.after(message)
//need to look into this more


//logic to add all this together and create correct message
//loop so win/ties are continously looked for
for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', () => {
        if (!gameActive) return
        
        if(squares[i].textContent !== ''){
            return
        }
        squares[i].textContent = currentPlayer
        
        if(checkWin(currentPlayer)) {
            message.textContent=`Game over! ${playersNames()} wins!`
        
            checkWin(currentPlayer).forEach(a => {
            squares[a].classList.add('winner')
        })
            
        gameActive = false
            return
        }
        
        if(checkTie()) {
            message.textContent= `Game is tied!`
            gameActive = false
            return
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0] 
        message.textContent = `It is ${playersNames()}'s turn!`
    })   
}
