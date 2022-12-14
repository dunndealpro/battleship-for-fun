console.log('is this working')

/*------Variables------*/

// sandwiches
const hamBurger = 1,
    hotDog = 2,
    meatballSub = 3,
    italianHoagie = 4,
    phillyCheese = 5;



let hamBurgerImg = new Image(50, 50)
hamBurgerImg.src = "images/hamburger1.png"

let hotDogImg = new Image(100, 50)
hotDogImg.src = "images/hotdog2.png"

let meatBallSubImg = new Image(125, 50)
meatBallSubImg.src = "images/meatball.png"

let italianHoagieImg = new Image(600, 300)
italianHoagieImg.src = "images/subsandwich.png"

let italianHoagieImg1 = new Image(175, 50)
italianHoagieImg1.src = "images/subsandwich.png"

let phillyCheeseImg = new Image(200, 50)
phillyCheeseImg.src = "images/phillycheese.png"

let winImageImg = new Image(388, 509)
winImageImg.src = 'images/winimage.png'

let tomatoImg = new Image(50, 50)
tomatoImg.src = 'images/tomato.png'


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
    turnName,
    computerHits,
    playerEats,
    computerEats,
    diffLevel,
    column,
    row,
    directionOfSandwich,
    aRow,
    aCol,
    computerSquares,
    playerSquares,
    eatenPlayerHamburger = false,
    eatenPlayerHotDog = false,
    eatenPlayerMeatballSub = false,
    eatenPlayerItalianHoagie = false,
    eatenPlayerPhillyCheese = false,
    eatenCompHamburger = false,
    eatenCompHotDog = false,
    eatenCompMeatballSub = false,
    eatenCompItalianHoagie = false,
    eatenCompPhillyCheese = false,
    playerNullCount = 0,
    compNullCount = 0,
    firstSquare = [],
    playerHitLog = [],
    compHitLog = [],
    tempSquareC;
let flyWait = 3000 //wait time in milliseconds

/*-----Variable Arrays------*/
const sandwichesArray = [hamBurger, hotDog, meatballSub, italianHoagie, phillyCheese]
sandwichImgArray = [hamBurgerImg, hotDogImg, meatBallSubImg, italianHoagieImg1, phillyCheeseImg]
eatenPlayerSandwichsArray = [eatenPlayerHamburger, eatenPlayerHotDog, eatenPlayerMeatballSub, eatenPlayerItalianHoagie, eatenPlayerPhillyCheese]
eatenCompSandwichsArray = [eatenCompHamburger, eatenCompHotDog, eatenCompMeatballSub, eatenCompItalianHoagie, eatenCompPhillyCheese]

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
orderSandwiches = document.getElementById('place-sandwiches')
turnIndicator = document.getElementById('turn-indicator')
winView = document.getElementById('win-view')
resultsDisplay = document.getElementById('results')
newGame = document.getElementById('new-game')
exitGame = document.getElementById('exit')



/*-------Functions-------*/

// function init() {

//     welcomeTag1.style.visibility = 'visible'
//     welcomeTag2.style.visibility = 'visible'
//     welcomeTag1.innerText = welcomeTagTxt1
//     welcomeTag2.innerHTML = welcomeTagTxt2
//     welcomeImg1.appendChild(italianHoagieImg)
//     body.removeChild(mainGameArea)
//     body.removeChild(difficultyWindow)

//     body.removeChild(winView)

//     // mainGameArea.style.visibility = 'hidden'
// }


// function goToDeliBoard() {
//     body.removeChild(deliCounter)
//     body.appendChild(mainGameArea)

//     mainGameArea.appendChild(welcomeTag1)
//     mainGameArea.appendChild(difficultyWindow)
//     welcomeTag1.innerText = mainGameHeaderTxt
//         // deliCounter.style.visibility = "hidden"
//     welcomeTag1.style.visibility = 'visible'
//     welcomeTag2.style.visibility = 'hidden'
//     welcomeImg1.style.visibility = 'hidden'
//     mainGameArea.style.visibility = 'visible'
//     deliCounter.style.visibility = 'hidden'

//     // createGameBoards()
//     // compSandwichPlacement(phillyCheese)
//     // compSandwichPlacement(italianHoagie)
//     // compSandwichPlacement(meatballSub)
//     // compSandwichPlacement(hotDog)
//     // compSandwichPlacement(hamBurger)
//     // playerSandwichPlacement(phillyCheese)
//     // compute
// }

function exitGamePlay() {
    window.close()
}

function createGameBoards(event) {
    mainGameArea.appendChild(orderSandwiches)
    if (event.target.id === 'easy') {
        numberOfRows = 6
        numberOfColumns = 6
        diffLevel = 3
        updateSandwichImg()
    } else if (event.target.id === 'medium') {
        numberOfRows = 8
        numberOfColumns = 8
        diffLevel = 4
        updateSandwichImg()
    } else if (event.target.id === 'hard') {
        numberOfRows = 10
        numberOfColumns = 10
        diffLevel = 5
        updateSandwichImg()
    }
    mainGameArea.removeChild(difficultyWindow)

    playerArray = new Array()
    playerArray = []
    for (let i = 0; i < numberOfRows; i++) {
        playerArray[i] = new Array()
        for (let k = 0; k < numberOfColumns; k++) {
            let square = document.createElement('div')
            square.setAttribute('class', 'player-square')
            square.setAttribute('id', 'p' + (k + 1) + '-' + (i + 1))
            square.innerText = (k + 1).toString() + (i + 1).toString()
            square.style.border = ('solid 2px black')
            square.style.width = ((600 / numberOfColumns) + 'px')
            square.style.height = ((600 / numberOfRows) + 'px')
                // square.style.width = '100px'
                // square.style.height = '100px'
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
    computerArray = []
    for (let i = 0; i < numberOfRows; i++) {
        computerArray[i] = new Array()
        for (let k = 0; k < numberOfColumns; k++) {
            let square = document.createElement('div')
            square.setAttribute('class', 'computer-square')
            square.setAttribute('id', 'c' + (k + 1) + '-' + (i + 1))
                // c = i + 1, r = k + 1
            square.innerText = (k + 1).toString() + (i + 1).toString()
            square.style.border = ('solid 2px black')
            square.style.backgroundColor = ('orange')
            square.style.width = ((600 / numberOfColumns) + 'px')
            square.style.height = ((600 / numberOfRows) + 'px')

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


function updateSandwichImg() {
    for (let i = 0; i < diffLevel; i++) {
        gameInfoDisp.appendChild(sandwichImgArray[i])
            // console.log('getting hungry')
    }
    tomatoDiv = document.createElement('div')
    tomatoDiv.setAttribute('id', 'tomato')
        // tomatoDiv.appendChild(tomatoImg)
        // computerBoard.appendChild(tomatoDiv)
}

function playerOrder() {
    console.log('starting game')
    for (let i = 0; i < diffLevel; i++) {
        getStartingSquare()
        checkPlayerStartingSquare(sandwichesArray[i])
        playerSandwichPlacement(sandwichesArray[i])

    }
    for (let i = 0; i < diffLevel; i++) {
        getStartingSquare()
        checkComputerStartingSquare(sandwichesArray[i])
        compSandwichPlacement(sandwichesArray[i])
    }

    startGame()
    mainGameArea.removeChild(orderSandwiches)


}

function getStartingSquare() {
    row = 1 + Math.floor(Math.random() * (numberOfRows - 1 + 1))
    column = 1 + Math.floor(Math.random() * (numberOfColumns - 1 + 1))
        // 1: north, 2:east, 3:south: 4: west
    directionOfSandwich = 1 + Math.floor(Math.random() * (2 - 1 + 1))
    directionOfSandwich = parseInt(directionOfSandwich, 10)
        // console.log('start row = ' + row)
        // console.log('start column = ' + column)
        // console.log('start direction = ' + directionOfSandwich)
    aRow = row - 1
    aCol = column - 1

}

function checkPlayerStartingSquare(sandwich) {
    // console.log('checking sandwich: ', sandwich)
    // console.log('start check')
    // console.log('row = ' + row)
    // console.log('column = ' + column)


    if (directionOfSandwich === 1) {
        // console.log('start check north')
        if ((row - sandwich) >= 0) {
            for (let i = row; i > (row - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', row - sandwich)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (playerArray[i - 1][aCol] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        } else {
            console.log('start check reverse direction')
            for (let i = row; i < (sandwich + row); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + row)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (playerArray[i - 1][aCol] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else {
        // console.log('check good!') 
    }

    if (directionOfSandwich === 3) {
        console.log('start check  south')
        if ((row + sandwich) <= numberOfRows) {
            for (let i = row; i < (row + sandwich); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + row)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (playerArray[i - 1][aCol] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        } else {
            console.log('start check reverse direction')
            for (let i = row; i > (row - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', row - sandwich)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (playerArray[i - 1][aCol] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else {
        //  console.log('check good!')
    }

    if (directionOfSandwich === 2) {
        // console.log('start check east')
        if ((column + sandwich) <= numberOfColumns) {
            for (let i = column; i < (sandwich + column); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + column)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (playerArray[aRow][i - 1] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        } else {
            // console.log('start check reverse direction')
            for (let i = column; i > (column - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', column - sandwich)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (playerArray[aRow][i - 1] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else {
        // console.log('check good!')
    }

    if (directionOfSandwich === 4) {
        console.log('start check west')
        if ((column - sandwich) >= 0) {
            for (let i = column; i > (column - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', column - sandwich)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (playerArray[aRow][i - 1] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        } else {
            console.log('start check reverse direction')
            for (let i = column; i < (sandwich + column); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + column)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (playerArray[aRow][i - 1] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else {
        //  console.log('check good!')
    }


}


// function playerSandwichPlacement(sandwich) {

//     // getStartingSquare()

//     // checkStartingSquare(sandwich)
//     console.log('row = ' + row)
//     console.log('column = ' + column)
//     console.log('direction = ' + directionOfSandwich)

//     if (directionOfSandwich === 1) {
//         // console.log('north')
//         if ((row - sandwich) >= 0) {
//             for (let i = row; i > (row - sandwich); i--) {
//                 square = document.getElementById('p' + i + '-' + column)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(0,0,0,0)'
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[i - 1][aCol] = 1
//                     // lastDirectionOfSandwich = 1
//             }
//         } else {
//             // console.log('reverse direction')
//             for (let i = row; i < (sandwich + row); i++) {
//                 square = document.getElementById('p' + i + '-' + column)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(0,0,0,0)'
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[i - 1][aCol] = 1
//                     // lastDirectionOfSandwich = 3
//             }
//         }
//     }

//     if (directionOfSandwich === 3) {
//         // console.log('south')
//         if ((row + sandwich) <= numberOfRows) {
//             for (let i = row; i < (row + sandwich); i++) {
//                 square = document.getElementById('p' + i + '-' + column)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(0,0,0,0)'
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[i - 1][aCol] = 1
//                     // lastDirectionOfSandwich = 3
//             }
//         } else {
//             // console.log('reverse direction')
//             for (let i = row; i > (row - sandwich); i--) {
//                 square = document.getElementById('p' + i + '-' + column)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(0,0,0,0)'
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[i - 1][aCol] = 1
//                     // lastDirectionOfSandwich = 1
//             }
//         }
//     }

//     if (directionOfSandwich === 2) {
//         // console.log('east')
//         if ((column + sandwich) <= numberOfColumns) {
//             for (let i = column; i < (sandwich + column); i++) {
//                 square = document.getElementById('p' + row + '-' + i)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(0,0,0,0)'
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[aRow][i - 1] = 1
//                     // lastDirectionOfSandwich = 2
//             }
//         } else {
//             // console.log('reverse direction')
//             for (let i = column; i > (column - sandwich); i--) {
//                 square = document.getElementById('p' + row + '-' + i)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(0,0,0,0)'
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[aRow][i - 1] = 1
//                     // lastDirectionOfSandwich = 4
//             }
//         }
//     }

//     if (directionOfSandwich === 4) {
//         // console.log('west')
//         if ((column - sandwich) >= 0) {
//             for (let i = column; i > (column - sandwich); i--) {
//                 square = document.getElementById('p' + row + '-' + i)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(0,0,0,0)'
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[aRow][i - 1] = 1
//                     // lastDirectionOfSandwich = 4
//             }
//         } else {
//             // console.log('reverse direction')
//             for (let i = column; i < (sandwich + column); i++) {
//                 square = document.getElementById('p' + row + '-' + i)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(0,0,0,0)'
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[aRow][i - 1] = 1
//                     // lastDirectionOfSandwich = 2
//             }
//         }
//     }

//     // console.log(playerArray)
// }

/*with image placement*/
function playerSandwichPlacement(sandwich) {

    console.log('row = ' + row)
    console.log('column = ' + column)
    console.log('direction = ' + directionOfSandwich)

    if (directionOfSandwich === 1) {
        console.log('north')
        if ((row - sandwich) >= 0) {
            for (let i = row; i > (row - sandwich); i--) {
                square = document.getElementById('p' + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(255,0,0,0)'

                console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[i - 1][aCol] = 1
                lastDirectionOfSandwich = 1
                if (sandwich === 1) {
                    square.style.transform = 'rotate(-90deg)'
                }
                square.appendChild(sandwichImgArray[sandwich - 1])
                square.style.transform = 'rotate(90deg)'
                square.style.zIndex = "8"

            }
        } else {
            console.log('reverse direction')
            for (let i = row; i < (sandwich + row); i++) {
                square = document.getElementById('p' + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(255,0,0,0)'

                console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[i - 1][aCol] = 1
                lastDirectionOfSandwich = 3
                if (sandwich === 1) {
                    square.style.transform = 'rotate(90deg)'
                }

            }
            square.appendChild(sandwichImgArray[sandwich - 1])
            square.style.transform = 'rotate(-90deg)'
            square.style.zIndex = "8"
        }
    }

    if (directionOfSandwich === 3) {
        console.log('south')
        if ((row + sandwich) <= numberOfRows) {
            for (let i = row; i < (row + sandwich); i++) {
                square = document.getElementById('p' + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(255,0,0,0)'
                square.appendChild(sandwichImgArray[sandwich - 1])
                square.style.transform = 'rotate(-90deg)'
                square.style.zIndex = "8"
                console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[i - 1][aCol] = 1
                lastDirectionOfSandwich = 3
                if (sandwich === 1) {
                    square.style.transform = 'rotate(90deg)'
                }
            }
        } else {
            console.log('reverse direction')
            for (let i = row; i > (row - sandwich); i--) {
                square = document.getElementById('p' + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(255,0,0,0)'
                square.appendChild(sandwichImgArray[sandwich - 1])
                square.style.transform = 'rotate(90deg)'
                square.style.zIndex = "8"
                console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[i - 1][aCol] = 1
                lastDirectionOfSandwich = 1
                if (sandwich === 1) {
                    square.style.transform = 'rotate(-90deg)'
                }
            }
        }
    }

    if (directionOfSandwich === 2) {
        console.log('east')
        if ((column + sandwich) <= numberOfColumns) {
            for (let i = column; i < (sandwich + column); i++) {
                square = document.getElementById('p' + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(255,0,0,0)'
                square.appendChild(sandwichImgArray[sandwich - 1])
                square.style.transform = 'scaleX(-1)'
                square.style.zIndex = "8"
                console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 2
            }
        } else {
            console.log('reverse direction')
            for (let i = column; i > (column - sandwich); i--) {
                square = document.getElementById('p' + row + '-' + i)
                    // square.innerText = sandwich
                    //     // square.style.backgroundColor = 'rgba(255,0,0,0)'
                    //     // square.appendChild(sandwichImgArray[sandwich - 1])
                    //     // square.style.zIndex = "8"
                    //     // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 4
            }
        }
    }

    if (directionOfSandwich === 4) {
        console.log('west')
        if ((column - sandwich) >= 0) {
            for (let i = column; i > (column - sandwich); i--) {
                square = document.getElementById('p' + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(255,0,0,0)'
                square.appendChild(sandwichImgArray[sandwich - 1])
                square.style.zIndex = "8"
                console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 4
            }
        } else {
            console.log('reverse direction')
            for (let i = column; i < (sandwich + column); i++) {
                square = document.getElementById('p' + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(255,0,0,0)'
                square.appendChild(sandwichImgArray[sandwich - 1])
                square.style.transform = 'scaleX(-1)'
                square.style.zIndex = "8"
                console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 2
            }
        }
    }

    console.log(playerArray)
}

function checkComputerStartingSquare(sandwich) {
    // console.log('checking sandwich: ', sandwich)
    // console.log('start check')
    // console.log('row = ' + row)
    // console.log('column = ' + column)


    if (directionOfSandwich === 1) {
        // console.log('start check north')
        if ((row - sandwich) >= 0) {
            for (let i = row; i > (row - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', row - sandwich)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (computerArray[i - 1][aCol] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        } else {
            // console.log('start check reverse direction')
            for (let i = row; i < (sandwich + row); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + row)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (computerArray[i - 1][aCol] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else {
        // console.log('check good!')
    }

    if (directionOfSandwich === 3) {
        console.log('start check  south')
        if ((row + sandwich) <= numberOfRows) {
            for (let i = row; i < (row + sandwich); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + row)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (computerArray[i - 1][aCol] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        } else {
            console.log('start check reverse direction')
            for (let i = row; i > (row - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', row - sandwich)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (computerArray[i - 1][aCol] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else {
        //  console.log('check good!') 
    }

    if (directionOfSandwich === 2) {
        // console.log('start check east')
        if ((column + sandwich) <= numberOfColumns) {
            for (let i = column; i < (sandwich + column); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + column)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (computerArray[aRow][i - 1] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        } else {
            // console.log('start check reverse direction')
            for (let i = column; i > (column - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', column - sandwich)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (computerArray[aRow][i - 1] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else {
        // console.log('check good!') 
    }

    if (directionOfSandwich === 4) {
        console.log('start check west')
        if ((column - sandwich) >= 0) {
            for (let i = column; i > (column - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', column - sandwich)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (computerArray[aRow][i - 1] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        } else {
            console.log('start check reverse direction')
            for (let i = column; i < (sandwich + column); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + column)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (computerArray[aRow][i - 1] === 1) {
                    // console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else {
        // console.log('check good!')
    }


}

function compSandwichPlacement(sandwich) {

    // getStartingSquare()

    // checkStartingSquare(sandwich)
    // console.log('row = ' + row)
    // console.log('column = ' + column)
    // console.log('direction = ' + directionOfSandwich)

    if (directionOfSandwich === 1) {
        // console.log('north')
        if ((row - sandwich) >= 0) {
            for (let i = row; i > (row - sandwich); i--) {
                square = document.getElementById("c" + i + '-' + column)
                square.innerText = sandwich
                    // square.style.backgroundColor = 'red'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                computerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 1
            }
        } else {
            // console.log('reverse direction')
            for (let i = row; i < (sandwich + row); i++) {
                square = document.getElementById("c" + i + '-' + column)
                square.innerText = sandwich
                    // square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 3
            }
        }
    }

    if (directionOfSandwich === 3) {
        // console.log('south')
        if ((row + sandwich) <= numberOfRows) {
            for (let i = row; i < (row + sandwich); i++) {
                square = document.getElementById("c" + i + '-' + column)
                square.innerText = sandwich
                    // square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 3
            }
        } else {
            // console.log('reverse direction')
            for (let i = row; i > (row - sandwich); i--) {
                square = document.getElementById("c" + i + '-' + column)
                square.innerText = sandwich
                    // square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 1
            }
        }
    }

    if (directionOfSandwich === 2) {
        // console.log('east')
        if ((column + sandwich) <= numberOfColumns) {
            for (let i = column; i < (sandwich + column); i++) {
                square = document.getElementById("c" + row + '-' + i)
                square.innerText = sandwich
                    // square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 2
            }
        } else {
            // console.log('reverse direction')
            for (let i = column; i > (column - sandwich); i--) {
                square = document.getElementById("c" + row + '-' + i)
                square.innerText = sandwich
                    // square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 4
            }
        }
    }

    if (directionOfSandwich === 4) {
        // console.log('west')
        if ((column - sandwich) >= 0) {
            for (let i = column; i > (column - sandwich); i--) {
                square = document.getElementById("c" + row + '-' + i)
                square.innerText = sandwich
                    // square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 4
            }
        } else {
            // console.log('reverse direction')
            for (let i = column; i < (sandwich + column); i++) {
                square = document.getElementById("c" + row + '-' + i)
                square.innerText = sandwich
                    // square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 2
            }
        }
    }

    // console.log(computerArray)


}

function startGame() {
    turnIndicator.innerText = 'Player Turn'
    computerSquares = document.getElementsByClassName('computer-square')
    playerSquares = document.getElementsByClassName('player-square')

    for (let square of computerSquares) {
        square.addEventListener("click", computerSquareChosen);
    }
    playerTurn()
        // }
}

function computerSquareChosen(e) {

    turnName = "Player"
    console.log(e.target.id)

    // for (let square of computerSquares) {
    //     console.log('is this working?')
    //     square.removeEventListener("click", computerSquareChosen, true);
    // }
    tempCheckSquare = e.target.innerText
    tempSquare = e.target.id
    tempSquare = tempSquare.slice(1)
    tempSquare = tempSquare.split('-')
    console.log(tempSquare)
    tempRow = tempSquare[0]
    tempCol = tempSquare[1]
    flyTomatoP(e)
    if (computerArray[tempRow - 1][tempCol - 1] === 1) {
        setTimeout(() => {
            e.target.style.backgroundColor = "rgb(255, 0, 0)"
            console.log('hit')
            turnIndicator.innerText = 'HIT!'
            playerHitLog.push(tempCheckSquare)
            console.log(playerHitLog)
            checkPlayerEaten()
            checkPlayWin()
            setTimeout(computerTurnInit, 3000)
        }, flyWait);

    } else {
        setTimeout(() => {
            console.log('miss')
            e.target.style.backgroundColor = "white"
            turnIndicator.innerText = 'MISS!'
            setTimeout(computerTurnInit, 3000)
        }, flyWait);
    }


    // checkPlayerEaten()
    // checkForHamburger()
    // checkForWin()

}

function computerTurnInit() {
    turnIndicator.innerText = 'Comp Turn'
        // setTimeout(computerTurn, 1000)
    computerTurn()
}

function computerTurn() {
    turnName = "Comp"
    console.log('computer turn')
    cTempRow = 1 + Math.floor(Math.random() * (numberOfRows - 1 + 1))
    cTempCol = 1 + Math.floor(Math.random() * (numberOfColumns - 1 + 1))
    console.log(cTempRow), console.log(cTempCol)
    console.log(('p' + cTempRow + '-' + cTempCol))
    tempSquareC = document.getElementById('p' + cTempRow + '-' + cTempCol)
    console.log(tempSquareC)
    console.log(tempSquareC.x)
    flyTomatoC()
    if (playerArray[cTempRow - 1][cTempCol - 1] === 1) {
        setTimeout(() => {
            turnIndicator.innerText = 'Comp HIT!'
            tempSquareC.style.backgroundColor = 'red'
            compHitLog.push(tempCheckSquare)
            checkCompEaten()
            checkCompWin()
            setTimeout(playerTurn, 2000)
        }, 3000);
    } else {
        setTimeout(() => {
            turnIndicator.innerText = 'Comp Miss'
            tempSquareC.style.backgroundColor = 'white'
            checkCompEaten()
            checkCompWin()
            setTimeout(playerTurn, 2000)
        }, 3000);
    }

}

function playerTurn() {
    turnIndicator.innerText = 'Player Turn'
    for (let square of computerSquares) {
        square.addEventListener("click", computerSquareChosen);
    }
}

function flyTomatoP(e) {

    tempTom = document.createElement('div')
    tempTom.setAttribute('class', 'initial-state')
    tempTom.style.opacity = '0.0'
    tempTom.appendChild(tomatoImg)
    mainGameArea.appendChild(tempTom)
    let audio = new Audio('soundefx/TunePocket-Funny-Splat-Whoosh-Preview.mp3');
    setTimeout(() => {
        audio.play()
    }, 2000);

    tempInfo = e.target
    tempInfo = tempInfo.getBoundingClientRect()
    landingX = tempInfo.x
    landingY = tempInfo.y
    console.log(landingX)

    console.log(tempInfo)
        // tempTom.setAttribute('class', 't-ani')
    root = document.documentElement;
    offsetX = -90
    offsetY = -100
    tWidth = window.innerWidth - landingX + offsetX
    tHeight = window.innerHeight - landingY + offsetY
    root.style.setProperty('--landingX', tWidth + "px")
    root.style.setProperty('--landingY', tHeight + "px")
    root.style.setProperty('--landingX2', window.innerWidth / 2 + "px")
    root.style.setProperty('--landingY2', window.innerHeight / 2 + "px")
    console.log(window.innerWidth), console.log(window.innerHeight)
    console.log(root)
}

function flyTomatoC() {

    tempTom = document.createElement('div')
    tempTom.setAttribute('class', 'initial-state-c')
    tempTom.style.opacity = '0.0'
    tempTom.appendChild(tomatoImg)
    mainGameArea.appendChild(tempTom)
    let audio = new Audio('soundefx/TunePocket-Funny-Splat-Whoosh-Preview.mp3');
    setTimeout(() => {
        audio.play()
    }, 2000);


    tempInfoC = tempSquareC
    tempInfoC = tempInfoC.getBoundingClientRect()
    landingX = tempInfoC.x
    landingY = tempInfoC.y
    console.log(landingX)

    console.log(tempInfo)
        // tempTom.setAttribute('class', 't-ani')
    root = document.documentElement;
    offsetX = -90
    offsetY = -100
    tWidth = window.innerWidth - landingX + offsetX
    tHeight = window.innerHeight - landingY + offsetY
    root.style.setProperty('--landingX', tWidth + "px")
    root.style.setProperty('--landingY', tHeight + "px")
    root.style.setProperty('--landingX2', window.innerWidth / 2 + "px")
    root.style.setProperty('--landingY2', window.innerHeight / 2 + "px")
    console.log(window.innerWidth), console.log(window.innerHeight)
    console.log(root)
}

function checkPlayWin() {
    console.log('player null count')
    console.log(playerNullCount)
    if (playerNullCount === diffLevel) {
        // resultsDisplay = document.createElement('div')
        // resultsDisplay.setAttribute('id', 'result')

        console.log('player wins')
            // turnIndicator.innerText = 'Player Wins!'
            // mainGameArea.appendChild(resultsDisplay)
        resultsDisplay.innerText = 'Player Wins!'
        newGame.innerText = "I'm Still Hungy"
        exitGame.innerText = "No, I'm Full"
        mainGameArea.appendChild(winView)

        winView.appendChild(resultsDisplay)
        winView.appendChild(winImageImg)
        winView.appendChild(newGame)
        winView.appendChild(exitGame)

        newGame.addEventListener('click', reStart)
        exitGame.addEventListener('click', exitGamePlay)


        // resultView = document.createElement('div')
        // resultView.setAttribute('id', 'results')

    }
}

function checkCompWin() {
    console.log('comp null count')
    console.log(compNullCount)
    if (compNullCount === diffLevel) {
        console.log('comp wins')
        turnIndicator.innerText = 'Comp Wins!'
    }
}

function checkPlayerEaten() {
    console.log('player check start')

    for (let i = 0; i < diffLevel; i++) {
        console.log(sandwichesArray[i])
        console.log('player sandwich array: ' + eatenPlayerSandwichsArray[i])
        if (eatenPlayerSandwichsArray[i] === false) {
            console.log('hih shit')
            checkSandwiches[i]()
        }
    }


}

function checkCompEaten() {
    console.log('player comp start')

    for (let i = 0; i < diffLevel; i++) {
        console.log(sandwichesArray[i])
        console.log('player sandwich array: ' + eatenCompSandwichsArray[i])
        if (eatenCompSandwichsArray[i] === false) {
            console.log('hih shit')
            checkSandwiches[i]()
        }
    }

    // let compNullCount = 0
    // for (let i = 0; i < diffLevel; i++) {
    //     if (eatenCompSandwichsArray[i] === false) {
    //         checkSandwiches[i]()
    //     }
    // }
    // for (let i = 0; i < diffLevel; i++) {
    //     console.log('start counting nulls')
    //     if (eatenCompSandwichsArray[i] === null) {
    //         compNullCount += 1
    //     }

    // }

    // if (compNullCount === diffLevel) {
    //     turnIndicator.innerText = 'Comp Wins!'
    // }
}

// const checkPlayerSandwiches = [checkForHamburger(), checkForHotDog(), checkForMeatball(), checkForItalian(), checkForPhilly()]
const checkSandwiches = [checkForHamburger, checkForHotDog, checkForMeatball, checkForItalian, checkForPhilly]
    // console.log(checkSandwiches[0]())

// checkPlayerSandwiches[0]()

function checkForHamburger() {
    if (turnName === 'Player') {
        console.log(playerHitLog)
        if (playerHitLog.includes('1')) {
            // console.log("hamburger")
            turnIndicator.innerText = turnName + ' ate a Hamburger!'
            removeElement = playerHitLog.indexOf('1')
            playerHitLog.splice(removeElement, 1)
            eatenPlayerHamburger = true
            console.log('hburg ' + eatenPlayerHamburger)
        }
        if (eatenPlayerHamburger === true) {
            eatenPlayerHamburger = false
            console.log('hburg ' + eatenPlayerHamburger)
            playerNullCount += 1
        }
    } else if (turnName === 'Comp') {
        console.log(compHitLog)
        if (compHitLog.includes('1')) {
            // console.log("hamburger")
            turnIndicator.innerText = turnName + ' ate a Hamburger!'
            removeElement = compHitLog.indexOf('1')
            compHitLog.splice(removeElement, 1)
            eatenCompHamburger = null
        }
        if (eatenCompHamburger === true) {
            eatenCompHamburger = false
            console.log('hburg ' + eatenCompHamburger)
            compNullCount += 1
        }
    }

}

function checkForHotDog() {
    if (turnName === 'Player') {
        console.log('hotdog check')
        console.log(playerHitLog)
        tempLog = []
        for (let i = 0; i < playerHitLog.length; i++) {
            console.log('hotdog check huh')

            if (playerHitLog[i] === '2') {
                console.log('hotdog check huh')
                tempLog.push(playerHitLog[i])
            }
            if (tempLog.length === hotDog) {
                console.log('You ate a hot dog')
                turnIndicator.innerText = turnName + ' ate a hot dog!'
                eatenPlayerHotDog = true
            }
            if (eatenPlayerHotDog === true) {
                for (let i = 0; i < hotDog; i++) {
                    removeElement = playerHitLog.indexOf('2')
                    console.log('remove playerhitlog')
                    removed = playerHitLog.splice(removeElement, 1)
                    console.log(removed)
                    eatenPlayerHotDog = false
                        // console.log(playerNullCount)
                }
                playerNullCount += 1
            }
        }
    } else if (turnName === 'Comp') {

        tempLog = []
        for (let i = 0; i < playerHitLog.length; i++) {
            if (compHitLog[i] === '2') {
                tempLog.push(compHitLog[i])
            }
            if (tempLog.length === hotDog) {
                console.log('You ate a hot dog')
                turnIndicator.innerText = turnName + ' ate a hot dog!'
                eatenCompHotDog = true
            }
            if (eatenCompHotDog === true) {
                for (let i = 0; i < hotDog; i++) {
                    removeElement = compHitLog.indexOf('2')
                    compHitLog.splice(removeElement, 1)
                    eatenCompHotDog = false
                }
                compNullCount += 1
            }
        }
    }
}

function checkForMeatball() {
    // check for meatball here
    // console.log('player meatball check')
    // console.log(playerHitLog)
    if (turnName === 'Player') {
        console.log('player meatball check')
        console.log(playerHitLog)
        tempLog = []
        for (let i = 0; i < playerHitLog.length; i++) {
            if (playerHitLog[i] === '3') {
                tempLog.push(playerHitLog[i])
            }
            if (tempLog.length === meatballSub) {
                console.log('You ate a meatball')
                turnIndicator.innerText = turnName + ' ate a meatball sub!'
                eatenPlayerMeatballSub = true
                console.log(eatenPlayerMeatballSub)
            }
            if (eatenPlayerMeatballSub === true) {
                for (let i = 0; i < meatballSub; i++) {
                    removeElement = playerHitLog.indexOf('3')
                    playerHitLog.splice(removeElement, 1)
                    eatenPlayerMeatballSub = false
                }
                playerNullCount += 1
            }
        }
    } else if (turnName === 'Comp') {
        tempLog = []
        for (let i = 0; i < playerHitLog.length; i++) {
            if (compHitLog[i] === '3') {
                tempLog.push(compHitLog[i])
            }
            if (tempLog.length === meatballSub) {
                console.log('You ate a meatball')
                turnIndicator.innerText = turnName + ' ate a meatball sub!'
                eatenCompMeatballSub = true
            }
            if (eatenCompMeatballSub === true) {
                for (let i = 0; i < meatballSub; i++) {
                    removeElement = compHitLog.indexOf('3')
                    compHitLog.splice(removeElement, 1)
                    eatenCompMeatballSub = false
                }
                compNullCount += 1
            }
        }
    }
}

function checkForItalian() {
    //check for Italian here
    if (turnName === 'Player') {
        tempLog = []
        for (let i = 0; i < playerHitLog.length; i++) {
            if (playerHitLog[i] === '4') {
                tempLog.push(playerHitLog[i])
            }
            if (tempLog.length === italianHoagie) {
                console.log('You ate an Italian Hoagie')
                turnIndicator.innerText = turnName + ' ate an Italian Hoagie!'
                eatenPlayerItalianHoagie = true
            }
            if (eatenPlayerItalianHoagie === true) {
                for (let i = 0; i < italianHoagie; i++) {
                    removeElement = playerHitLog.indexOf('4')
                    playerHitLog.splice(removeElement, 1)
                    eatenPlayerItalianHoagie = false
                }
                playerNullCount += 1
            }
        }
    } else if (turnName === 'Comp') {
        tempLog = []
        for (let i = 0; i < compHitLog.length; i++) {
            if (compHitLog[i] === '4') {
                tempLog.push(compHitLog[i])
            }
            if (tempLog.length === italianHoagie) {
                console.log('You ate an Italian Hoagie')
                turnIndicator.innerText = turnName + ' ate an Italian Hoagie!'
                eatenCompItalianHoagie = true
            }
            if (eatenCompItalianHoagie === true) {
                for (let i = 0; i < italianHoagie; i++) {
                    removeElement = compHitLog.indexOf('3')
                    playerHitLog.splice(removeElement, 1)
                    eatenCompMeatballSub = false
                }
                compNullCount += 1
            }
        }
    }
}

function checkForPhilly() {
    // check for philly here
    if (turnName === 'Player') {
        tempLog = []
        for (let i = 0; i < playerHitLog.length; i++) {
            if (playerHitLog[i] === '5') {
                tempLog.push(playerHitLog[i])
            }
            if (tempLog.length === phillyCheese) {
                console.log('You ate a philly cheese')
                turnIndicator.innerText = turnName + ' ate a Philly Cheesesteak!'
                eatenPlayerPhillyCheese = true
            }
            if (eatenPlayerPhillyCheese === true) {
                for (let i = 0; i < phillyCheese; i++) {
                    removeElement = playerHitLog.indexOf('5')
                    playerHitLog.splice(removeElement, 1)
                    eatenPlayerPhillyCheese = false
                }
                playerNullCount += 1
            }
        }
    } else if (turnName === 'Comp') {
        tempLog = []
        for (let i = 0; i < compHitLog.length; i++) {
            if (compHitLog[i] === '5') {
                tempLog.push(compHitLog[i])
            }
            if (tempLog.length === phillyCheese) {
                console.log('You ate a philly cheese')
                turnIndicator.innerText = turnName + ' ate a Philly Cheesesteak!'
                eatenCompPhillyCheese = true
            }
            if (eatenCompPhillyCheese === true) {
                for (let i = 0; i < phillyCheese; i++) {
                    removeElement = compHitLog.indexOf('5')
                    playerHitLog.splice(removeElement, 1)
                    eatenCompPhillyCheese = false
                }
                compNullCount += 1
            }
        }
    }
}



// function computerSquareChosen(e) {
//     console.log(e.target.id)

//     e.target.style.backgroundColor = "rgb(255, 255, 0)"
//     tempSquare = e.target.id
//     tempSquare = tempSquare.slice(1)
//     tempSquare = tempSquare.split('-')
//     console.log(tempSquare)
//     tempRow = tempSquare[0]
//     tempCol = tempSquare[1]
//     if (computerArray[tempRow - 1][tempCol - 1] === 1) {
//         console.log('hit')
//         turnIndicator.innerText = 'HIT!'
//     } else {
//         console.log('miss')
//         turnIndicator.innerText = 'MISS!'
//     }
//     setTimeout(computerTurnInit, 2000)
// }




// const computerSquareChosen = e => {
//     console.log(e.target.id); // Get ID of Clicked Element
// }

// for (let square of computerSquares) {
//     button.addEventListener("click", computerSquareChosen);
// }


function goToDeliBoard() {
    body.removeChild(deliCounter)
    body.appendChild(mainGameArea)
        // mainGameArea.appendChild(orderSandwiches)

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
    mainGameArea.removeChild(orderSandwiches)
    body.removeChild(mainGameArea)
    body.removeChild(difficultyWindow)

    body.removeChild(winView)

    // mainGameArea.style.visibility = 'hidden'
}

function reStart() {
    // mainGameArea.appendChild(orderSandwiches)
    turnIndicator.innerText = ''
    playerNullCount = 0
    compNullCount = 0
    clearBoards()
    body.appendChild(deliCounter)
    body.removeChild(mainGameArea)
    mainGameArea.removeChild(winView)
        // body.removeChild(winView)
    welcomeTag1.style.visibility = 'visible'
    welcomeTag2.style.visibility = 'visible'
    welcomeTag1.innerText = welcomeTagTxt1
    welcomeTag2.innerHTML = welcomeTagTxt2
    welcomeImg1.appendChild(italianHoagieImg)
        // body.removeChild(difficultyWindow)
        // body.removeChild(mainGameArea)
        // body.removeChild(difficultyWindow)
    body.appendChild(deliCounter)

    // mainGameArea.style.visibility = 'hidden'

    goToDeliBoard()

}

function resetWin() {

}

function clearBoards() {
    cSquare = document.getElementsByClassName('computer-square')
    for (let i = 0; i < numberOfColumns * numberOfRows; i++) {
        computerBoard.removeChild(cSquare[0])
        console.log(cSquare)
    }
    pSquare = document.getElementsByClassName('player-square')
    console.log(pSquare)
    for (let i = 0; i < (numberOfColumns * numberOfRows); i++) {
        playerBoard.removeChild(pSquare[0])
    }

}







init()

/*------EventListenrs------- */
welcomeImg1.addEventListener('click', goToDeliBoard)
justASnack.addEventListener('click', createGameBoards)
iCouldEat.addEventListener('click', createGameBoards)
famished.addEventListener('click', createGameBoards)
orderSandwiches.addEventListener('click', playerOrder)




/*------scrap pad ------*/