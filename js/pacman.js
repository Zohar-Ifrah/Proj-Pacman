'use strict'

const PACMAN = '<img src="img/pacman.gif"/>'
var gPacman
var gFoodAte = 0
var gFoodToEat = 56
var gIsSuper = false
var gDeg
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) {
        if (gIsSuper) {
            eatGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    } else if (nextCell === FOOD) {
        handleFood()
    }
    else if (nextCell === CHERRY) {
        updateScore(10)
    }
    else if (nextCell === POWER_FOOD) {
        if (gIsSuper) return
        handlePowerFood()
    }

    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, cahngePacmanDir(gDeg))
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // figure out nextLocation + change gif diraction
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            gDeg = -90
            break
        case 'ArrowDown':
            nextLocation.i++
            gDeg = 90
            break
        case 'ArrowLeft':
            nextLocation.j--
            gDeg = 180
            break
        case 'ArrowRight':
            nextLocation.j++
            gDeg = 0
            break
    }
    return nextLocation
}

function cahngePacmanDir() {
    return `<div style="transform: rotate(${gDeg}deg)">${PACMAN}</div>`
}

function handleFood() {
    updateScore(1)
    gFoodAte++
    if (gFoodAte === gFoodToEat) victory()
}

function handlePowerFood() {
    gIsSuper = true
    renderGhosts()
    setTimeout(() => {
        gIsSuper = false
        renderGhosts()
    }, 5000);
}