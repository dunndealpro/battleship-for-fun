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
    computerHits,
    playerEats,
    computerEats,
    diffLevel,
    column,
    row,
    directionOfSandwich,
    aRow,
    aCol,
    firstSquare = [];



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

}

function updateSandwichImg() {
    for (let i = 0; i < diffLevel; i++) {
        gameInfoDisp.appendChild(sandwichImgArray[i])
            // console.log('getting hungry')
    }
}

function playerOrder() {
    for (let i = 0; i < diffLevel; i++) {
        //     // console.log('sandwich number: ' + sandwichesArray[i])
        //     getStartingSquare()
        //         // checkStartingSquare(sandwichesArray[i])

        //     // interval = setInterval(() => {
        //     //     playerSandwichPlacement(sandwichesArray[i])
        //     // }, 1000);
        //     // setTimeout(checkStartingSquare(sandwichesArray[i]), 1000)
        //     // setTimeout(playerSandwichPlacement(sandwichesArray[i]), 2000)


        //     checkStartingSquare(sandwichesArray[i])
        //     playerSandwichPlacement(sandwichesArray[i])


        // }
        getStartingSquare()
        checkStartingSquare(sandwichesArray[i])
        playerSandwichPlacement(sandwichesArray[i])
            // getStartingSquare()
            // checkStartingSquare(italianHoagie)
            // playerSandwichPlacement(italianHoagie)
            // getStartingSquare()
            // checkStartingSquare(phillyCheese)
            // playerSandwichPlacement(phillyCheese)
    }

}
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms))
// }
// async function delayedPlayerOrder() {
//     for (let i = 0; i < diffLevel; i++) {
//         getStartingSquare()
//         await sleep(250)
//         checkStartingSquare(sandwichesArray[i])
//         await sleep(250)
//         playerSandwichPlacement(sandwichesArray[i])
//     }
// }

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
        // console.log("first direction : " + directionOfSandwich)

    //check
    // checkStartingSquare(sandwich)

}
lastDirectionOfSandwich = directionOfSandwich

function checkStartingSquare(sandwich) {
    console.log('checking sandwich: ', sandwich)
    console.log('start check')
    console.log('row = ' + row)
    console.log('column = ' + column)
        // console.log('last direction = ' + lastDirectionOfSandwich)
        // console.log(playerArray)


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
                    checkStartingSquare(sandwich)
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
                    checkStartingSquare(sandwich)
                    break
                }
            }
        }
    } else { console.log('check good!') }

    // if (directionOfSandwich === 3) {
    //     console.log('start check  south')
    //     if ((row + sandwich) <= numberOfRows) {
    //         for (let i = row; i < (row + sandwich); i++) {
    //             // console.log('i: ', i)
    //             // console.log('condition = ', sandwich + row)
    //             // console.log('arow: ', i - 1)
    //             // console.log('acol: ', aCol)
    //             if (playerArray[i - 1][aCol] === 1) {
    //                 console.log('!!!GET NEW START!!!')
    //                 getStartingSquare()
    //                 break
    //             }
    //         }
    //     } else {
    //         console.log('start check reverse direction')
    //         for (let i = row; i > (row - sandwich); i--) {
    //             // console.log('i: ', i)
    //             // console.log('condition = ', row - sandwich)
    //             // console.log('arow: ', i - 1)
    //             // console.log('acol: ', aCol)
    //             if (playerArray[i - 1][aCol] === 1) {
    //                 console.log('!!!GET NEW START!!!')
    //                 getStartingSquare()
    //                 break
    //             }
    //         }
    //     }
    // } else { console.log('check good!') }

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
                    checkStartingSquare(sandwich)
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
                    checkStartingSquare(sandwich)
                    break
                }
            }
        }
    } else { console.log('check good!') }

    // if (directionOfSandwich === 4) {
    //     console.log('start check west')
    //     if ((column - sandwich) >= 0) {
    //         for (let i = column; i > (column - sandwich); i--) {
    //             // console.log('i: ', i)
    //             // console.log('condition = ', column - sandwich)
    //             // console.log('arow: ', aRow)
    //             // console.log('acol: ', i - 1)
    //             if (playerArray[aRow][i - 1] === 1) {
    //                 console.log('!!!GET NEW START!!!')
    //                 getStartingSquare()
    //                 break
    //             }
    //         }
    //     } else {
    //         console.log('start check reverse direction')
    //         for (let i = column; i < (sandwich + column); i++) {
    //             // console.log('i: ', i)
    //             // console.log('condition = ', sandwich + column)
    //             // console.log('arow: ', aRow)
    //             // console.log('acol: ', i - 1)
    //             if (playerArray[aRow][i - 1] === 1) {
    //                 console.log('!!!GET NEW START!!!')
    //                 getStartingSquare()
    //                 break
    //             }
    //         }
    //     }
    // } else { console.log('check good!') }


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
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 1
            }
        } else {
            console.log('reverse direction')
            for (let i = row; i < (sandwich + row); i++) {
                square = document.getElementById('p' + i + '-' + column)
                square.innerText = sandwich
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[i - 1][aCol] = 1
                    // lastDirectionOfSandwich = 3
            }
        }
    }

    // if (directionOfSandwich === 3) {
    //     console.log('south')
    //     if ((row + sandwich) <= numberOfRows) {
    //         for (let i = row; i < (row + sandwich); i++) {
    //             square = document.getElementById('p' + i + '-' + column)
    //             square.innerText = sandwich
    //             square.style.backgroundColor = 'red'
    //                 // console.log('Array: ' + playerArray[aRow][i - 1])
    //             playerArray[i - 1][aCol] = 1
    //                 // lastDirectionOfSandwich = 3
    //         }
    //     } else {
    //         console.log('reverse direction')
    //         for (let i = row; i > (row - sandwich); i--) {
    //             square = document.getElementById('p' + i + '-' + column)
    //             square.innerText = sandwich
    //             square.style.backgroundColor = 'red'
    //                 // console.log('Array: ' + playerArray[aRow][i - 1])
    //             playerArray[i - 1][aCol] = 1
    //                 // lastDirectionOfSandwich = 1
    //         }
    //     }
    // }

    if (directionOfSandwich === 2) {
        console.log('east')
        if ((column + sandwich) <= numberOfColumns) {
            for (let i = column; i < (sandwich + column); i++) {
                square = document.getElementById('p' + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 2
            }
        } else {
            console.log('reverse direction')
            for (let i = column; i > (column - sandwich); i--) {
                square = document.getElementById('p' + row + '-' + i)
                square.innerText = sandwich
                square.style.backgroundColor = 'red'
                    // console.log('Array: ' + playerArray[aRow][i - 1])
                playerArray[aRow][i - 1] = 1
                    // lastDirectionOfSandwich = 4
            }
        }
    }

    // if (directionOfSandwich === 4) {
    //     console.log('west')
    //     if ((column - sandwich) >= 0) {
    //         for (let i = column; i > (column - sandwich); i--) {
    //             square = document.getElementById('p' + row + '-' + i)
    //             square.innerText = sandwich
    //             square.style.backgroundColor = 'red'
    //                 // console.log('Array: ' + playerArray[aRow][i - 1])
    //             playerArray[aRow][i - 1] = 1
    //                 // lastDirectionOfSandwich = 4
    //         }
    //     } else {
    //         console.log('reverse direction')
    //         for (let i = column; i < (sandwich + column); i++) {
    //             square = document.getElementById('p' + row + '-' + i)
    //             square.innerText = sandwich
    //             square.style.backgroundColor = 'red'
    //                 // console.log('Array: ' + playerArray[aRow][i - 1])
    //             playerArray[aRow][i - 1] = 1
    //                 // lastDirectionOfSandwich = 2
    //         }
    //     }
    // }

    console.log(playerArray)
}











// compSandwichPlacement(meatballSub)

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


// if ((row + sandwich) <= numberOfRows + 1) {
//     if (lastDirectionOfSandwich === 3) {
//         for (let i = row; i < row + sandwich; i++) {
//             console.log('arow: ', i - 1)
//             console.log('acol: ', aCol)
//             if (playerArray[i - 1][aCol] === 1) {
//                 console.log('get new start')
//                 getStartingSquare()
//             }
//         }
//     }
// }
// if ((row - sandwich) >= 0) {
//     if (lastDirectionOfSandwich === 1) {
//         for (let i = row; i > row - sandwich; i--) {
//             console.log('arow: ', i - 1)
//             console.log('acol: ', aCol)
//             if (playerArray[i - 1][aCol] === 1) {
//                 console.log('get new start')
//                 getStartingSquare()
//             }
//         }
//     }
// }
// if ((column + sandwich) <= numberOfColumns + 1) {
//     if (lastDirectionOfSandwich === 2) {
//         for (let i = column; i < column + sandwich; i++) {
//             console.log('arow: ', aRow)
//             console.log('acol: ', i - 1)
//             if (playerArray[aRow][i - 1] === 1) {
//                 console.log('get new start')
//                 getStartingSquare()
//             }
//         }
//     }
// }

// if ((column - sandwich) >= 0) {
//     if (lastDirectionOfSandwich === 4) {
//         for (let i = column; i > sandwich - column; i--) {
//             console.log('arow: ', aRow)
//             console.log('acol: ', i - 1)
//             if (playerArray[aRow][i - 1] === 1) {
//                 console.log('get new start')
//                 getStartingSquare()
//             }
//         }
//     }
// }


// function checkFirstSquare(sandwich) {
//     let aRow = parseInt(row - 1)
//     let aColumn = parseInt(column - 1)

//     if (directionOfSandwich === 1) {
//         console.log('array check ' + playerArray[1][1])
//         for (let i = 0; i < sandwich; i++) {
//             // console.log(playerArray[aRow + i][aColumn])
//             if (playerArray[aRow + i][aColumn] === 1) {
//                 console.log('spot taken')
//                 getStartingSquare()
//                     // break
//             }
//         }
//     } else if (directionOfSandwich === 2) {
//         console.log('array check ' + playerArray[1][1])
//         for (let i = 0; i < sandwich; i++) {
//             // console.log(playerArray[aRow + i][aColumn])
//             if (playerArray[aRow][aColumn + i] === 1) {
//                 console.log('spot taken')
//                 getStartingSquare()
//                     // break
//             }
//         }
//     } else if (directionOfSandwich === 3) {
//         console.log('array check ' + playerArray[1][1])
//         for (let i = 0; i < sandwich; i++) {
//             // console.log(playerArray[aRow + i][aColumn])
//             if (playerArray[aRow - i][aColumn] === 1) {
//                 console.log('spot taken')
//                 getStartingSquare()
//                     // break
//             }
//         }
//     } else if (directionOfSandwich === 4) {
//         console.log('array check ' + playerArray[1][1])
//         for (let i = 0; i < sandwich; i++) {
//             // console.log(playerArray[aRow + i][aColumn])
//             if (playerArray[aRow][aColumn - i] === 1) {
//                 console.log('spot taken')
//                 getStartingSquare()
//                     // break
//             }
//         }
//     }

// }

// function playerSandwichPlacement(sandwich) {

//     getStartingSquare()
//     checkFirstSquare(sandwich)

//     // firstSquare = document.getElementById('p' + column + '-' + row)
//     // console.log(firstSquare)
//     // firstSquare.style.backgroundColor = 'red'
//     // console.log('Array: ' + playerArray[row - 1][column - 1])
//     // playerArray[row - 1][column - 1] = 1


//     console.log('sandwich ' + sandwich)

//     // places sandwich on tiles


//     if (directionOfSandwich === 1) {
//         if ((row - sandwich) < 1) {
//             console.log('reverse direction')
//             for (let i = 0; i < sandwich; i++) {
//                 square = document.getElementById('p' + (column) + '-' + (row + i))
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'red'
//                     // console.log('Array: ' + playerArray[row + i][column])
//                 playerArray[(row - 1) + i][column - 1] = 1
//             }
//         } else {
//             for (let i = 0; i < sandwich; i++) {
//                 square = document.getElementById('p' + (column) + '-' + (row - i))
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'red'
//                     // console.log('Array: ' + playerArray[row - i][column])
//                 playerArray[(row - 1) - i][column - 1] = 1
//             }
//         }

//     }
//     console.log(playerArray)

//     if (directionOfSandwich === 2) {
//         if ((column + sandwich) > (numberOfColumns)) {
//             console.log('reverse direction')
//             for (let i = 0; i < sandwich; i++) {
//                 square = document.getElementById('p' + (column - i) + '-' + (row))
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'red'
//                     // console.log('Array: ' + playerArray[row][column - i])
//                 playerArray[row - 1][(column - 1) - i] = 1
//             }
//         } else {
//             for (let i = 0; i < sandwich; i++) {
//                 square = document.getElementById('p' + (column + i) + '-' + (row))
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'red'
//                     // console.log('Array: ' + playerArray[row][column +i +1])
//                 playerArray[row - 1][(column - 1) + i] = 1
//             }
//         }
//     }
//     console.log(playerArray)

//     if (directionOfSandwich === 3) {
//         if ((row + sandwich) > (numberOfRows)) {
//             console.log('reverse direction')
//             for (let i = 0; i < sandwich; i++) {
//                 square = document.getElementById('p' + (column) + '-' + (row - i))
//                 square.innerText = sandwich
//                 console.log(square)
//                 square.style.backgroundColor = 'red'
//                 console.log('Array: ' + playerArray[row - 1 - i][column - 1])
//                 playerArray[(row - 1) - i][column - 1] = 1
//             }
//         } else {
//             for (let i = 0; i < sandwich; i++) {
//                 square = document.getElementById('p' + (column) + '-' + (row + i))
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'red'
//                 console.log('Array: ' + playerArray[row + i - 1][column - 1])
//                 playerArray[(row - 1) + i][column - 1] = 1
//             }
//         }
//     }
//     console.log(playerArray)

//     if (directionOfSandwich === 4) {
//         if ((column - sandwich) < 1) {
//             console.log('reverse direction')
//             for (let i = 0; i < sandwich; i++) {
//                 square = document.getElementById('p' + (column + i) + '-' + (row))
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'red'
//                     // console.log('Array: ' + playerArray[row][column - 1 + i])
//                 playerArray[row - 1][(column - 1) + i] = 1
//             }
//         } else {
//             for (let i = 0; i < sandwich; i++) {
//                 square = document.getElementById('p' + (column - i) + '-' + (row))
//                 square.innerText = sandwich
//                 square.style.backgroundColor = 'red'
//                 console.log('Array: ' + playerArray[row - 1][column - 1 - i])
//                 playerArray[row - 1][(column - 1) - i] = 1
//             }
//         }

//     }
//     console.log(playerArray)



//     // console.log(playerArray)

//     // newImg = document.createElement('div')
//     // newImg.setAttribute.style.width = '300px'
//     // newImg.setAttribute.style.height = '100px'
//     // newImg.appendChild(sandwichImgArray[2])
//     // firstSquare.appendChild(newImg)


// }

// function compSandwichPlacement(sandwich) {
//     // compPlacementArray = computerArray
//     getStartingSquare()

//     firstSquare = document.getElementById('c' + column + '-' + row)
//     firstSquare.style.backgroundColor = 'red'
//     console.log('Array: ' + computerArray[row][column])
//     computerArray[row][column] = 1


//     // console.log(sandwich)

//     // places sandwich on tiles
//     for (let i = 1; i < sandwich; i++) {
//         if (directionOfSandwich == 0 || directionOfSandwich == 4) {
//             if ((row + 1 - sandwich) <= 0) {
//                 // console.log('reverse direction')
//                 square = document.getElementById('c' + (column) + '-' + (row + i))
//                 square.style.backgroundColor = 'red'
//                 console.log('Array: ' + computerArray[row + i][column])
//                 computerArray[row + i][column] = 1
//             } else {
//                 square = document.getElementById('c' + (column) + '-' + (row - i))
//                 square.style.backgroundColor = 'red'
//                 console.log('Array: ' + computerArray[row - i][column])
//                 computerArray[row - i][column] = 1
//             }

//         } else if (directionOfSandwich == 1 || directionOfSandwich == 5) {
//             if ((column - 1 + sandwich) >= (numberOfColumns - 1)) {
//                 // console.log('reverse direction')
//                 square = document.getElementById('c' + (column - i) + '-' + (row))
//                 square.style.backgroundColor = 'red'
//                 console.log('Array: ' + computerArray[row][column - i])
//                 computerArray[row][column - i] = 1
//             } else {
//                 square = document.getElementById('c' + (column + i) + '-' + (row))
//                 square.style.backgroundColor = 'red'
//                 console.log('Array: ' + computerArray[row][column - i])
//                 computerArray[row][column - i] = 1

//             }
//         } else if (directionOfSandwich == 2 || directionOfSandwich == 6) {
//             if ((row + sandwich) >= (numberOfRows - 1)) {
//                 // console.log('reverse direction')
//                 square = document.getElementById('c' + (column) + '-' + (row - i))
//                 console.log(square)
//                 square.style.backgroundColor = 'red'
//                 console.log('Array: ' + computerArray[row - i][column])
//                 computerArray[row - i][column] = 1
//             } else {
//                 square = document.getElementById('c' + (column) + '-' + (row + i))
//                 square.style.backgroundColor = 'red'
//                 console.log('Array: ' + computerArray[row + i][column])
//                 computerArray[row + i][column] = 1
//             }
//         } else if (directionOfSandwich == 3 || directionOfSandwich == 7) {
//             if ((column + 1 - sandwich) <= 0) {
//                 // console.log('reverse direction')
//                 square = document.getElementById('c' + (column + i) + '-' + (row))
//                 square.style.backgroundColor = 'red'
//                 console.log('Array: ' + computerArray[row][column + i])
//                 computerArray[row][column + i] = 1
//             } else {
//                 square = document.getElementById('c' + (column - i) + '-' + (row))
//                 square.style.backgroundColor = 'red'
//                 console.log('Array: ' + computerArray[row][column - i])
//                 computerArray[row][column - i] = 1
//             }
//         }
//     }
//     console.log(computerArray)
// }