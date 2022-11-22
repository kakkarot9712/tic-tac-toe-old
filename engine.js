let cellset = document.getElementsByClassName('cell')

// 0 is empty cell (yet to select)
// 1 is Cross (selected by player 1)
// 2 is Circle (selected by player 2)
let markergrid = [0, 0, 0, 0, 0, 0, 0, 0, 0]

// Win checking will happen only after 5 moves will be played.
let movesPlayed = 0

// Resetting grid to blank and calculate the score
const winningCombo = [
    [0, 1, 2], // 0 (3*0)+0 + (3*0)+1 + (3*0)+2
    [3, 4, 5], // 1 (3*1)+0 + (3*1)+1 + (3*1)+2
    [6, 7, 8], // 2 (3*2)+0 + (3*2)+1 + (3*2)+2

    [0, 3, 6], // 0 (0 + 0) + (3 + 0) + (6 + 0)
    [1, 4, 7], // 1 (0 + 1) + (3 + 1) + (6 + 1)
    [2, 5, 8], // 2 (0 + 2) + (3 + 2) + (6 + 2)

    [0, 4, 8], // 
    [2, 4, 6]
]

let p1_score = 0
let p2_score = 0

let p1_name = 'player1'
let p2_name = 'player2'

// First turn will be of player1
let turnOf = p1_name

let gameStarted = false

const resetAll = ()=>{
    alert("ending game!, score will be resetted and now you can also change the player names")
    restartGame()
    
    let s_card = document.getElementById('p1_s')
    s_card.innerText = 0
    let s_card2 = document.getElementById('p2_s')
    s_card2.innerText = 0

    movesPlayed = 0
    p1_score = p2_score = 0
}

document.getElementById('resetit').addEventListener('click', ()=>{
    resetAll()
    gameStarted = false
    document.getElementById('resetit').disabled = true
})

document.getElementById("gameMode").addEventListener('click', ()=>{
    if(!gameStarted){
        document.getElementById("gameMode").innerHTML = 'End Game'
    }
    else{
        document.getElementById("gameMode").innerHTML = 'Start Game'
    }
    restartGame()
    gameStarted = !gameStarted
    console.log(document.getElementById('resetit').disabled)
    document.getElementById('resetit').disabled = false
})

const restartGame = ()=>{
    markergrid = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    Array.from(document.getElementsByClassName("rounded")).forEach((img) => {
        img.src = './img/placeholder.png';
    });
    turnOf = p1_name
    movesPlayed = 0
}

const declareWinner = (player) => {
    if(player === p1_name){
        p1_score++;
        let s_card = document.getElementById('p1_s')
        s_card.innerText = p1_score
    }
    else if(player === p2_name){
        p2_score++;
        let s_card = document.getElementById('p2_s')
        s_card.innerText = p2_score
    }
    else{
        alert('No more moves Possible, game is tied!')
    }
    gameStarted = !gameStarted
    document.getElementById("gameMode").innerHTML = 'Start Game'
}

const setnames = document.getElementById('p-name-set')

setnames.addEventListener("click", (e)=>{
    e.preventDefault()
    
    if(gameStarted){
        alert('name changing is not allowed after game is started!, end the game to change names!')
        return
    }

    let p1 = document.getElementById("player1")
    p1_name = p1.value
    document.getElementById("p1_n").innerText = p1_name
    document.getElementById('p1-name').innerText = p1_name
    p1.value = ""

    let p2 = document.getElementById("player2")
    p2_name = p2.value
    document.getElementById("p2_n").innerText = p2_name
    document.getElementById('p2-name').innerText = p2_name
    p2.value = ""
})

const markdown = (event) => {
    if (!gameStarted){
        alert("Game is not started! start the game to start playing")
        return
    }

    if (markergrid[+event.target.id] !== 0){
        console.warn("invalid move, terminated")
        return
    }
    movesPlayed++
    markergrid[+event.target.id] = (turnOf === p1_name)?1:2;
    event.target.src = (turnOf === p1_name)?'./img/cross.png':'./img/circle.png';
    if(movesPlayed>=5){
        winningCombo.forEach(combination => {
            if((markergrid[combination[0]] === markergrid[combination[1]]) && (markergrid[combination[1]] === markergrid[combination[2]]) && (markergrid[combination[2]] !== 0)){
                console.log('winner is found', turnOf)
                declareWinner(turnOf)
                return
            }
        })
    }
    if(movesPlayed === 9){
        declareWinner(null)
        return
    }

    turnOf = (turnOf === p1_name)?p2_name : p1_name;
}

Array.from(cellset).forEach((cell) => {
    cell.addEventListener('click', markdown)
});
