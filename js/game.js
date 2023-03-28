'use strict'

const WALL = '🗄'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍬'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gIntervalCherry = 0

function onInit() {
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard, '.board-container')
    resetGame()
    gGame.isOn = true
    gIntervalCherry = setInterval(addCherry, 15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = POWER_FOOD
    board[1][8] = POWER_FOOD
    board[8][1] = POWER_FOOD
    board[8][8] = POWER_FOOD
    return board
}

function updateScore(diff) {
    // update model 
    gGame.score += diff
    // update dom
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    updateModal(false)
    tempWinLOSEfunc()
}

function resetGame() {
    var elModal = document.querySelector('.modal')
    var elScore = document.querySelector('h2 span')
    elModal.style.display = 'none'
    gGame.score = 0
    elScore.innerText = 0
    gFoodAte = 0
}

function victory() {
    updateModal(true)
    tempWinLOSEfunc()
}

function updateModal(isWin) {
    var elModal = document.querySelector('.modal')
    var elWinLoseMsg = document.querySelector('.win-lose-msg')
    if (isWin) elWinLoseMsg.innerText = 'You Win!'
    else elWinLoseMsg.innerText = 'You Lose'
    elModal.style.display = 'block'
}

function tempWinLOSEfunc() {
    gGame.isOn = false
    renderCell(gPacman.location, EMPTY)
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
}

function addCherry() {
    var openPos = getEmptyPos()
    if (!openPos) return
    gBoard[openPos.i][openPos.j] = CHERRY
    renderCell(openPos, CHERRY)
}

function getEmptyPos() {
    const emptyPoss = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyPoss.push({ i, j })
            }
        }
    }
    var randIdx = getRandomIntInclusive(0, emptyPoss.length - 1)
    return emptyPoss[randIdx]
}