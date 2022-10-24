console.log('is this working')

/*------Variables------*/

// sandwiches
const hamBurger = 1,
    hotDog = 2,
    meatballSub = 3,
    italianHoagie = 4,
    phillyCheese = 5;

const sandwichesArray = [hamBurger, hotDog, meatballSub, italianHoagie, phillyCheese]

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

sandwichImgArray = [hamBurgerImg, hotDogImg, meatBallSubImg, italianHoagieImg1, phillyCheeseImg]

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
    firstSquare = [],
    playerHitLog = [],
    computerHitLog = [];



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



/*-------Functions-------*/


function createGameBoards(event) {
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
    // computerSquares = document.getElementsByClassName('computer-square')
    // console.log(computerSquares)
    // const computerSquareChosen = e => {
    //     console.log(e.target.id); // Get ID of Clicked Element
    // }

    // for (let square of computerSquares) {
    //     square.addEventListener("click", computerSquareChosen);
    // }
    // computerSquares = document.getElementsByClassName('computer-square')
    // playerSquares = document.getElementsByClassName('player-square')
    // console.log(computerSquares)

    // for (let square of computerSquares) {
    //     square.addEventListener("click", computerSquareChosen);
    // }
}


function updateSandwichImg() {
    for (let i = 0; i < diffLevel; i++) {
        gameInfoDisp.appendChild(sandwichImgArray[i])
            // console.log('getting hungry')
    }
}

function playerOrder() {
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


}

function getStartingSquare() {
    row = 1 + Math.floor(Math.random() * (numberOfRows - 1 + 1))
    column = 1 + Math.floor(Math.random() * (numberOfColumns - 1 + 1))
        // 1: north, 2:east, 3:south: 4: west
    directionOfSandwich = 1 + Math.floor(Math.random() * (2 - 1 + 1))
    directionOfSandwich = parseInt(directionOfSandwich, 10)
    console.log('start row = ' + row)
    console.log('start column = ' + column)
    console.log('start direction = ' + directionOfSandwich)
    aRow = row - 1
    aCol = column - 1

}

function checkPlayerStartingSquare(sandwich) {
    console.log('checking sandwich: ', sandwich)
    console.log('start check')
    console.log('row = ' + row)
    console.log('column = ' + column)


    if (directionOfSandwich === 1) {
        console.log('start check north')
        if ((row - sandwich) >= 0) {
            for (let i = row; i > (row - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', row - sandwich)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (playerArray[i - 1][aCol] === 1) {
                    console.log('!!!GET NEW START!!!')
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
                    console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else { console.log('check good!') }

    if (directionOfSandwich === 3) {
        console.log('start check  south')
        if ((row + sandwich) <= numberOfRows) {
            for (let i = row; i < (row + sandwich); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + row)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (playerArray[i - 1][aCol] === 1) {
                    console.log('!!!GET NEW START!!!')
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
                    console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else { console.log('check good!') }

    if (directionOfSandwich === 2) {
        console.log('start check east')
        if ((column + sandwich) <= numberOfColumns) {
            for (let i = column; i < (sandwich + column); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + column)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (playerArray[aRow][i - 1] === 1) {
                    console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        } else {
            console.log('start check reverse direction')
            for (let i = column; i > (column - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', column - sandwich)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (playerArray[aRow][i - 1] === 1) {
                    console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else { console.log('check good!') }

    if (directionOfSandwich === 4) {
        console.log('start check west')
        if ((column - sandwich) >= 0) {
            for (let i = column; i > (column - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', column - sandwich)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (playerArray[aRow][i - 1] === 1) {
                    console.log('!!!GET NEW START!!!')
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
                    console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkPlayerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else { console.log('check good!') }


}


function playerSandwichPlacement(sandwich) {

    // getStartingSquare()

    // checkStartingSquare(sandwich)
    console.log('row = ' + row)
    console.log('column = ' + column)
    console.log('direction = ' + directionOfSandwich)

    if (directionOfSandwich === 1) {
        console.log('north')
        if ((row - sandwich) >= 0) {
            for (let i = row; i > (row - sandwich); i--) {
                square = document.getElementById('p' + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(0,0,0,0)'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 1
            }
        } else {
            console.log('reverse direction')
            for (let i = row; i < (sandwich + row); i++) {
                square = document.getElementById('p' + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(0,0,0,0)'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 3
            }
        }
    }

    if (directionOfSandwich === 3) {
        console.log('south')
        if ((row + sandwich) <= numberOfRows) {
            for (let i = row; i < (row + sandwich); i++) {
                square = document.getElementById('p' + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(0,0,0,0)'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 3
            }
        } else {
            console.log('reverse direction')
            for (let i = row; i > (row - sandwich); i--) {
                square = document.getElementById('p' + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(0,0,0,0)'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 1
            }
        }
    }

    if (directionOfSandwich === 2) {
        console.log('east')
        if ((column + sandwich) <= numberOfColumns) {
            for (let i = column; i < (sandwich + column); i++) {
                square = document.getElementById('p' + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(0,0,0,0)'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 2
            }
        } else {
            console.log('reverse direction')
            for (let i = column; i > (column - sandwich); i--) {
                square = document.getElementById('p' + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(0,0,0,0)'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
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
                square.style.backgroundColor = 'rgba(0,0,0,0)'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 4
            }
        } else {
            console.log('reverse direction')
            for (let i = column; i < (sandwich + column); i++) {
                square = document.getElementById('p' + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'rgba(0,0,0,0)'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 2
            }
        }
    }

    console.log(playerArray)
}



/*with image placement*/
// function playerSandwichPlacement(sandwich) {

//     console.log('row = ' + row)
//     console.log('column = ' + column)
//     console.log('direction = ' + directionOfSandwich)

//     if (directionOfSandwich === 1) {
//         console.log('north')
//         if ((row - sandwich) >= 0) {
//             for (let i = row; i > (row - sandwich); i--) {
//                 square = document.getElementById('p' + i + '-' + column)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(255,0,0,0)'
//                     // square.appendChild(sandwichImgArray[sandwich - 1])
//                     // square.style.transform = 'rotate(90deg)'
//                     // square.style.zIndex = "8"
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[i - 1][aCol] = 1
//                     // lastDirectionOfSandwich = 1
//                     // if (sandwich === 1) {
//                     //     square.style.transform = 'rotate(-90deg)'
//                     // }

//             }
//         } else {
//             console.log('reverse direction')
//             for (let i = row; i < (sandwich + row); i++) {
//                 square = document.getElementById('p' + i + '-' + column)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(255,0,0,0)'
//                     // square.appendChild(sandwichImgArray[sandwich - 1])
//                     // square.style.transform = 'rotate(-90deg)'
//                     // square.style.zIndex = "8"
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[i - 1][aCol] = 1
//                     // lastDirectionOfSandwich = 3
//                     // if (sandwich === 1) {
//                     //     square.style.transform = 'rotate(90deg)'
//                     // }

//             }
//         }
//     }

//     if (directionOfSandwich === 3) {
//         console.log('south')
//         if ((row + sandwich) <= numberOfRows) {
//             for (let i = row; i < (row + sandwich); i++) {
//                 square = document.getElementById('p' + i + '-' + column)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(255,0,0,0)'
//                     // square.appendChild(sandwichImgArray[sandwich - 1])
//                     // square.style.transform = 'rotate(-90deg)'
//                     // square.style.zIndex = "8"
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[i - 1][aCol] = 1
//                     // lastDirectionOfSandwich = 3
//                     // if (sandwich === 1) {
//                     //     square.style.transform = 'rotate(90deg)'
//                     // }
//             }
//         } else {
//             console.log('reverse direction')
//             for (let i = row; i > (row - sandwich); i--) {
//                 square = document.getElementById('p' + i + '-' + column)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(255,0,0,0)'
//                     // square.appendChild(sandwichImgArray[sandwich - 1])
//                     // square.style.transform = 'rotate(90deg)'
//                     // square.style.zIndex = "8"
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[i - 1][aCol] = 1
//                     // lastDirectionOfSandwich = 1
//                     // if (sandwich === 1) {
//                     //     square.style.transform = 'rotate(-90deg)'
//                     // }
//             }
//         }
//     }

//     if (directionOfSandwich === 2) {
//         console.log('east')
//         if ((column + sandwich) <= numberOfColumns) {
//             for (let i = column; i < (sandwich + column); i++) {
//                 square = document.getElementById('p' + row + '-' + i)
//                 square.innerText = sandwich
//                     // square.style.backgroundColor = 'rgba(255,0,0,0)'
//                     // square.appendChild(sandwichImgArray[sandwich - 1])
//                     // square.style.transform = 'scaleX(-1)'
//                     // square.style.zIndex = "8"
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[aRow][i - 1] = 1
//                     // lastDirectionOfSandwich = 2
//             }
//         } else {
//             console.log('reverse direction')
//             for (let i = column; i > (column - sandwich); i--) {
//                 square = document.getElementById('p' + row + '-' + i)
//                 square.innerText = sandwich
//                     // square.style.backgroundColor = 'rgba(255,0,0,0)'
//                     // square.appendChild(sandwichImgArray[sandwich - 1])
//                     // square.style.zIndex = "8"
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[aRow][i - 1] = 1
//                     // lastDirectionOfSandwich = 4
//             }
//         }
//     }

//     if (directionOfSandwich === 4) {
//         console.log('west')
//         if ((column - sandwich) >= 0) {
//             for (let i = column; i > (column - sandwich); i--) {
//                 square = document.getElementById('p' + row + '-' + i)
//                 square.innerText = sandwich
//                     // square.style.backgroundColor = 'rgba(255,0,0,0)'
//                     // square.appendChild(sandwichImgArray[sandwich - 1])
//                     // square.style.zIndex = "8"
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[aRow][i - 1] = 1
//                     // lastDirectionOfSandwich = 4
//             }
//         } else {
//             console.log('reverse direction')
//             for (let i = column; i < (sandwich + column); i++) {
//                 square = document.getElementById('p' + row + '-' + i)
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'rgba(255,0,0,0)'
//                     // square.appendChild(sandwichImgArray[sandwich - 1])
//                     // square.style.transform = 'scaleX(-1)'
//                     // square.style.zIndex = "8"
//                     // console.log('Array: ' + playerArray[aRow][i - 1])
//                 playerArray[aRow][i - 1] = 1
//                     // lastDirectionOfSandwich = 2
//             }
//         }
//     }

//     console.log(playerArray)
// }

function checkComputerStartingSquare(sandwich) {
    console.log('checking sandwich: ', sandwich)
    console.log('start check')
    console.log('row = ' + row)
    console.log('column = ' + column)


    if (directionOfSandwich === 1) {
        console.log('start check north')
        if ((row - sandwich) >= 0) {
            for (let i = row; i > (row - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', row - sandwich)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (computerArray[i - 1][aCol] === 1) {
                    console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
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
                if (computerArray[i - 1][aCol] === 1) {
                    console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else { console.log('check good!') }

    if (directionOfSandwich === 3) {
        console.log('start check  south')
        if ((row + sandwich) <= numberOfRows) {
            for (let i = row; i < (row + sandwich); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + row)
                // console.log('arow: ', i - 1)
                // console.log('acol: ', aCol)
                if (computerArray[i - 1][aCol] === 1) {
                    console.log('!!!GET NEW START!!!')
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
                    console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else { console.log('check good!') }

    if (directionOfSandwich === 2) {
        console.log('start check east')
        if ((column + sandwich) <= numberOfColumns) {
            for (let i = column; i < (sandwich + column); i++) {
                // console.log('i: ', i)
                // console.log('condition = ', sandwich + column)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (computerArray[aRow][i - 1] === 1) {
                    console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        } else {
            console.log('start check reverse direction')
            for (let i = column; i > (column - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', column - sandwich)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (computerArray[aRow][i - 1] === 1) {
                    console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else { console.log('check good!') }

    if (directionOfSandwich === 4) {
        console.log('start check west')
        if ((column - sandwich) >= 0) {
            for (let i = column; i > (column - sandwich); i--) {
                // console.log('i: ', i)
                // console.log('condition = ', column - sandwich)
                // console.log('arow: ', aRow)
                // console.log('acol: ', i - 1)
                if (computerArray[aRow][i - 1] === 1) {
                    console.log('!!!GET NEW START!!!')
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
                    console.log('!!!GET NEW START!!!')
                    getStartingSquare()
                    checkComputerStartingSquare(sandwich)
                    break
                }
            }
        }
    } else { console.log('check good!') }


}

function compSandwichPlacement(sandwich) {

    // getStartingSquare()

    // checkStartingSquare(sandwich)
    console.log('row = ' + row)
    console.log('column = ' + column)
    console.log('direction = ' + directionOfSandwich)

    if (directionOfSandwich === 1) {
        console.log('north')
        if ((row - sandwich) >= 0) {
            for (let i = row; i > (row - sandwich); i--) {
                square = document.getElementById("c" + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                computerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 1
            }
        } else {
            console.log('reverse direction')
            for (let i = row; i < (sandwich + row); i++) {
                square = document.getElementById("c" + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 3
            }
        }
    }

    if (directionOfSandwich === 3) {
        console.log('south')
        if ((row + sandwich) <= numberOfRows) {
            for (let i = row; i < (row + sandwich); i++) {
                square = document.getElementById("c" + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 3
            }
        } else {
            console.log('reverse direction')
            for (let i = row; i > (row - sandwich); i--) {
                square = document.getElementById("c" + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 1
            }
        }
    }

    if (directionOfSandwich === 2) {
        console.log('east')
        if ((column + sandwich) <= numberOfColumns) {
            for (let i = column; i < (sandwich + column); i++) {
                square = document.getElementById("c" + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 2
            }
        } else {
            console.log('reverse direction')
            for (let i = column; i > (column - sandwich); i--) {
                square = document.getElementById("c" + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 4
            }
        }
    }

    if (directionOfSandwich === 4) {
        console.log('west')
        if ((column - sandwich) >= 0) {
            for (let i = column; i > (column - sandwich); i--) {
                square = document.getElementById("c" + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 4
            }
        } else {
            console.log('reverse direction')
            for (let i = column; i < (sandwich + column); i++) {
                square = document.getElementById("c" + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + computerArray[aRow][i - 1])
                computerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 2
            }
        }
    }

    console.log(computerArray)


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
    e.target.style.backgroundColor = "rgb(255, 255, 0)"
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
    if (computerArray[tempRow - 1][tempCol - 1] === 1) {
        console.log('hit')
        turnIndicator.innerText = 'HIT!'
        playerHitLog.push(tempCheckSquare)
    } else {
        console.log('miss')
        turnIndicator.innerText = 'MISS!'
    }

    checkForHamburger()
        // checkForWin()
    setTimeout(computerTurnInit, 2000)
}

function checkForHamburger() {
    console.log(playerHitLog)
    if (playerHitLog.includes('1')) {
        console.log("hamburger")
        turnIndicator.innerText = turnName + ' ate a Hamburger!'
    }
    if (playerHitLog.includes('2')) {
        let findHotDog = playerHitLog.find(element => element === 2)
        hotDog = playerHitLog.filter(findHotDog)
        console.log(hotDog)
    }
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
    tempSquare = document.getElementById('p' + cTempRow + '-' + cTempCol)
    console.log(tempSquare)

    if (playerArray[cTempRow - 1][cTempCol - 1] === 1) {
        turnIndicator.innerText = 'Comp HIT!'
        tempSquare.style.backgroundColor = 'red'
        computerHitLog.push(tempCheckSquare)
    } else {
        turnIndicator.innerText = 'Comp Miss'
        tempSquare.style.backgroundColor = 'white'
    }
    setTimeout(playerTurn, 2000)
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

function playerTurn() {
    turnIndicator.innerText = 'Player Turn'
    for (let square of computerSquares) {
        square.addEventListener("click", computerSquareChosen);
    }
}


// const computerSquareChosen = e => {
//     console.log(e.target.id); // Get ID of Clicked Element
// }

// for (let square of computerSquares) {
//     button.addEventListener("click", computerSquareChosen);
// }


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
orderSandwiches.addEventListener('click', playerOrder)




/*------scrap pad ------*/