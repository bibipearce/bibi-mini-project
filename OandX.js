
//retrieve elements we want to interact with
const board = document.getElementById('board') 
const squares = document.getElementsByClassName('square')

//make players to interact with the game/board
const players = ['X', 'O']
let currentPlayer = players[0]

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
            return true
        }
    }
    return false
}

function checkTie() {
    for (let i=0; i<squares.length; i++) {
        if (squares[i].textContent === '') {
            return false
        }
    }
    return true
}

//this is what happens when we want to restart
function restart() {
    for (let i=0; i<squares.length; i++) {
        squares[i].textContent = ""
    }
    message.textContent = "It is X's turn!"
    currentPlayer = players[0]
}


//we need a message/prompt when its a players turn/the game is won etc
const message = document.createElement('h2')
//created a message here and can add content and styles to it:
message.textContent = "It is X's turn!"
message.style.marginTop ="30px"
message.style.textAlign ="center"
board.after(message)
//need to look into this more



//copied from a website - doesn't work ???
for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', () => {
        if(squares[i].textContent !== ''){
            return
        }
        squares[i].textContent = currentPlayer
        if(checkWin(currentPlayer)) {
            message.textContent=`Game over! ${currentPlayer} wins!`
            return
        }
        if(checkTie()) {
            message.textContent= `Game is tied!`
            return
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0] 
        if(currentPlayer == players[0]) {
            message.textContent= `It is X's turn!`
        } else {
            message.textContent= `It is O's turn!`
        }     
    })   
}
