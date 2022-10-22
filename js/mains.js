console.log('is this working')

/*------Variables------*/

// sandwiches
const hamBurger = 1,
    hotDog = 2,
    meatballSub = 3,
    italianHoagie = 4,
    phillyCheese = 5;

const sandwichesArray = [hamBurger, hotDog, meatballSub, italianHoagie, phillyCheese]

const hamBurgerImg = new Image(50, 50)
hamBurgerImg.src = "images/hamburger1.png"

const hotDogImg = new Image(75, 50)
hotDogImg.src = "images/hotdog2.png"

const meatBallSubImg = new Image(125, 50)
meatBallSubImg.src = "images/meatball.png"

const italianHoagieImg = new Image(600, 300)
italianHoagieImg.src = "images/subsandwich.png"

const italianHoagieImg1 = new Image(175, 50)
italianHoagieImg1.src = "images/subsandwich.png"

const phillyCheeseImg = new Image(200, 50)
phillyCheeseImg.src = "images/phillycheese.png"

//sounds
// const eatSound,
//     missSound;

//colors
const breadColor = "rgb(246, 167, 96)",
    tomatoColor = "rgb(246,98,83)",
    lettuceColor = "rgb(134, 178, 79)",
    yellow = "rgb(242, 195, 56)",
    salmon = "rgb(231,163,158)";

const welcomeTagTxt1 = "Welcome to Battle Sandwich"
const welcomeTagTxt2 = "are you hungry enough to win?</br>Click Sandwich to scarf"
const mainGameHeaderTxt = "Battle Sandwich - Prepare to Eat"

//board size selections
let numberOfRows = 10,
    numberOfColumns = 10;

//game play info
let playerHits,
    computerHits,
    playerEats,
    computerEats,
    diffLevel,
    column,
    row;



/*-----Cached Elements------*/
body = document.querySelector('body')
    // console.log(body)
deliCounter = document.getElementById('deli-counter')
computerBoard = document.getElementById('computer')
playerBoard = document.getElementById('player')
welcomeTag1 = document.getElementById('header')
welcomeTag2 = document.getElementById('sub-header')
welcomeImg1 = document.getElementById("welcome-img")
mainGameArea = document.getElementById("main-game-area")
difficultyWindow = document.getElementById("select-difficulty")
justASnack = document.getElementById('easy')
iCouldEat = document.getElementById('medium')
famished = document.getElementById('hard')
gameInfoDisp = document.getElementById('game-info')



/*-------Functions-------*/


function createGameBoards(event) {
    if (event.target.id === 'easy') {
        numberOfRows = 6
        numberOfColumns = 6
        diffLevel = 3
    } else if (event.target.id === 'medium') {
        numberOfRows = 8
        numberOfColumns = 8
        diffLevel = 4
    } else if (event.target === ' hard') {
        numberOfRows = 10
        numberOfColumns = 10
        diffLevel = 5
    }

    mainGameArea.removeChild(difficultyWindow)
    hamBurgerDiv = document.createElement('div')
    hamBurgerDiv.innerHTML = hamBurgerImg
    gameInfoDisp.appendChild(hamBurgerImg)
    hotDogDiv = document.createElement('div')
    hotDogDiv.innerHTML = hotDogImg
    gameInfoDisp.appendChild(hotDogImg)
    meatBallDiv = document.createElement('div')
    gameInfoDisp.appendChild(meatBallSubImg)

    gameInfoDisp.appendChild(italianHoagieImg1)
    gameInfoDisp.appendChild(phillyCheeseImg)



    playerArray = new Array()
    for (let i = 0; i < numberOfRows; i++) {
        playerArray[i] = new Array()
        for (let k = 0; k < numberOfColumns; k++) {
            let square = document.createElement('div')
            square.setAttribute('class', 'player-square')
            square.setAttribute('id', 'p' + (i + 1) + '-' + (k + 1))
            square.innerText = i.toString() + k.toString()
            square.style.border = ('solid 2px black')
            square.style.backgroundColor = ('teal')
            square.style.gridColumnStart = i + 1
            square.style.gridColumnEnd = i + 2
            square.style.gridRowStart = k + 1
                // square.style.gridRowEnd = k = 2
            playerBoard.appendChild(square)
        }
    }
    for (let i = 0; i < numberOfRows; i++) {
        for (let k = 0; k < numberOfRows; k++) {
            playerArray[i].push(-1)
        }
    }

    computerArray = new Array()
    for (let i = 0; i < numberOfRows; i++) {
        computerArray[i] = new Array()
        for (let k = 0; k < numberOfColumns; k++) {
            let square = document.createElement('div')
            square.setAttribute('class', 'computer-square')
            square.setAttribute('id', 'c' + (i) + '-' + (k))
                // c = i + 1, r = k + 1
            square.innerText = i.toString() + k.toString()
            square.style.border = ('solid 2px black')
            square.style.backgroundColor = ('orange')

            square.style.gridColumnStart = i + 1
            square.style.gridColumnEnd = i + 2
            square.style.gridRowStart = k + 1

            computerBoard.appendChild(square)
                // console.log(square)
        }
    }
    for (let i = 0; i < numberOfRows; i++) {
        for (let k = 0; k < numberOfRows; k++) {
            computerArray[i].push(-1)
        }
    }
}

function getStartingSquare() {
    startingSquare = Math.floor(Math.random() * (numberOfColumns * numberOfRows))
    console.log(startingSquare)
        //0=north, 1=east, 2=south, 3=west

    directionOfSandwich = Math.floor(Math.random() * 7)
    console.log('direction = ' + directionOfSandwich)
    startingSquare = startingSquare.toString()
    if (startingSquare.length === 1) {
        column = 0, row = startingSquare
    } else {
        startingSquare = startingSquare.toString()
        column = startingSquare.charAt(0)
        row = startingSquare.charAt(1)

    }

    column = parseInt(column), row = parseInt(row)
    console.log('First column value: ' + column)
    console.log('First row value: ' + row)

    if (row >= numberOfRows) {
        console.log('restart function Starting Square')
        getStartingSquare()
    }
    if (column >= numberOfRows) {
        console.log('restart function Starting Square')
        getStartingSquare()
    }
    console.log('starting square')
    console.log(column)
    console.log(row)

    if (computerArray[row][column] === 1) {
        getStartingSquare()
    }
}

function compSandwichPlacement(sandwich) {
    // compPlacementArray = computerArray
    getStartingSquare()

    firstSqaure = document.getElementById('c' + column + '-' + row)
    firstSqaure.style.backgroundColor = 'red'
    console.log('Array: ' + computerArray[row][column])
    computerArray[row][column] = 1


    // console.log(sandwich)

    // places sandwich on tiles
    for (let i = 1; i < sandwich; i++) {
        if (directionOfSandwich == 0 || directionOfSandwich == 4) {
            if ((row + 1 - sandwich) <= 0) {
                // console.log('reverse direction')
                square = document.getElementById('c' + (column) + '-' + (row + i))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + computerArray[row + i][column])
                computerArray[row + i][column] = 1
            } else {
                square = document.getElementById('c' + (column) + '-' + (row - i))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + computerArray[row - i][column])
                computerArray[row - i][column] = 1
            }

        } else if (directionOfSandwich == 1 || directionOfSandwich == 5) {
            if ((column - 1 + sandwich) >= (numberOfColumns - 1)) {
                // console.log('reverse direction')
                square = document.getElementById('c' + (column - i) + '-' + (row))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + computerArray[row][column - i])
                computerArray[row][column - i] = 1
            } else {
                square = document.getElementById('c' + (column + i) + '-' + (row))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + computerArray[row][column - i])
                computerArray[row][column - i] = 1

            }
        } else if (directionOfSandwich == 2 || directionOfSandwich == 6) {
            if ((row + sandwich) >= (numberOfRows - 1)) {
                // console.log('reverse direction')
                square = document.getElementById('c' + (column) + '-' + (row - i))
                console.log(square)
                square.style.backgroundColor = 'red'
                console.log('Array: ' + computerArray[row - i][column])
                computerArray[row - i][column] = 1
            } else {
                square = document.getElementById('c' + (column) + '-' + (row + i))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + computerArray[row + i][column])
                computerArray[row + i][column] = 1
            }
        } else if (directionOfSandwich == 3 || directionOfSandwich == 7) {
            if ((column + 1 - sandwich) <= 0) {
                // console.log('reverse direction')
                square = document.getElementById('c' + (column + i) + '-' + (row))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + computerArray[row][column + i])
                computerArray[row][column + i] = 1
            } else {
                square = document.getElementById('c' + (column - i) + '-' + (row))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + computerArray[row][column - i])
                computerArray[row][column - i] = 1
            }
        }
    }
    console.log(computerArray)
}

function playerSandwichPlacement(sandwich) {
    // compPlacementArray = computerArray
    getStartingSquare()

    firstSqaure = document.getElementById('p' + column + '-' + row)
    firstSqaure.style.backgroundColor = 'red'
    console.log('Array: ' + playerArray[row][column])
    playerArray[row][column] = 1


    // console.log(sandwich)

    // places sandwich on tiles
    for (let i = 1; i < sandwich; i++) {
        if (directionOfSandwich == 0 || directionOfSandwich == 4) {
            if ((row + 1 - sandwich) <= 0) {
                // console.log('reverse direction')
                square = document.getElementById('p' + (column) + '-' + (row + i))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + playerArray[row + i][column])
                playerArray[row + i][column] = 1
            } else {
                square = document.getElementById('p' + (column) + '-' + (row - i))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + playerArray[row - i][column])
                playerArray[row - i][column] = 1
            }

        } else if (directionOfSandwich == 1 || directionOfSandwich == 5) {
            if ((column - 1 + sandwich) >= (numberOfColumns - 1)) {
                // console.log('reverse direction')
                square = document.getElementById('p' + (column - i) + '-' + (row))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + playerArray[row][column - i])
                playerArray[row][column - i] = 1
            } else {
                square = document.getElementById('p' + (column + i) + '-' + (row))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + playerArray[row][column - i])
                playerArray[row][column - i] = 1

            }
        } else if (directionOfSandwich == 2 || directionOfSandwich == 6) {
            if ((row + sandwich) >= (numberOfRows - 1)) {
                // console.log('reverse direction')
                square = document.getElementById('p' + (column) + '-' + (row - i))
                console.log(square)
                square.style.backgroundColor = 'red'
                console.log('Array: ' + playerArray[row - i][column])
                playerArray[row - i][column] = 1
            } else {
                square = document.getElementById('p' + (column) + '-' + (row + i))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + playerArray[row + i][column])
                playerArray[row + i][column] = 1
            }
        } else if (directionOfSandwich == 3 || directionOfSandwich == 7) {
            if ((column + 1 - sandwich) <= 0) {
                // console.log('reverse direction')
                square = document.getElementById('p' + (column + i) + '-' + (row))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + playerArray[row][column + i])
                playerArray[row][column + i] = 1
            } else {
                square = document.getElementById('p' + (column - i) + '-' + (row))
                square.style.backgroundColor = 'red'
                console.log('Array: ' + playerArray[row][column - i])
                playerArray[row][column - i] = 1
            }
        }
    }
    console.log(playerArray)
}

function placeSandwiches() {

}

// function selectDifficulty() {
//     if (difficulty = 1)
// }

// compSandwichPlacement()

function goToDeliBoard() {
    body.removeChild(deliCounter)
    body.appendChild(mainGameArea)

    mainGameArea.appendChild(welcomeTag1)
    mainGameArea.appendChild(difficultyWindow)
    welcomeTag1.innerText = mainGameHeaderTxt
        // deliCounter.style.visibility = "hidden"
    welcomeTag1.style.visibility = 'visible'
    welcomeTag2.style.visibility = 'hidden'
    welcomeImg1.style.visibility = 'hidden'
    mainGameArea.style.visibility = 'visible'
    deliCounter.style.visibility = 'hidden'

    // createGameBoards()
    // compSandwichPlacement(phillyCheese)
    // compSandwichPlacement(italianHoagie)
    // compSandwichPlacement(meatballSub)
    // compSandwichPlacement(hotDog)
    // compSandwichPlacement(hamBurger)
    // playerSandwichPlacement(phillyCheese)
    // compute
}

function init() {
    welcomeTag1.style.visibility = 'visible'
    welcomeTag2.style.visibility = 'visible'
    welcomeTag1.innerText = welcomeTagTxt1
    welcomeTag2.innerHTML = welcomeTagTxt2
    welcomeImg1.appendChild(italianHoagieImg)
    body.removeChild(mainGameArea)
    body.removeChild(difficultyWindow)
        // mainGameArea.style.visibility = 'hidden'
}

init()

/*------EventListenrs------- */
welcomeImg1.addEventListener('click', goToDeliBoard)
justASnack.addEventListener('click', createGameBoards)
iCouldEat.addEventListener('click', createGameBoards)
famished.addEventListener('click', createGameBoards)