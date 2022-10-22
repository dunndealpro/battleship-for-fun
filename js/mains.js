console.log('is this working')

/*------Variables------*/

// sandwiches
const hamBurger = 1,
    hotDog = 2,
    meatballSub = 3,
    italianHoagie = 4,
    phillyCheese = 5;

const italianHoagieImg = new Image(600, 300)
italianHoagieImg.src = "images/subsandwich.png"

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
    computerEats;

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



/*-------Functions-------*/


function createGameBoards() {
    playerArray = new Array()
    for (let i = 0; i < numberOfRows; i++) {
        playerArray[i] = new Array()
        for (let k = 0; k < numberOfColumns; k++) {
            let square = document.createElement('div')
            square.setAttribute('class', 'player-square')
            square.setAttribute('id', 'p' + (i) + '-' + (k))
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
            square.innerText = i.toString() + k.toString()
            square.style.border = ('solid 1px black')
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



// square.style.border = ('solid 1px black')
//             square.style.backgroundColor = ('teal')
// square.style.gridColumnStart = i + 1
// square.style.gridColumnEnd = i + 2
// square.style.gridRowStart = k + 1
// square.style.gridRowEnd = k = 2
// playerBoard.appendChild(square)
// console.log(square)

function goToDeliBoard() {
    body.removeChild(deliCounter)
    body.appendChild(mainGameArea)
    mainGameArea.appendChild(welcomeTag1)
    welcomeTag1.innerText = mainGameHeaderTxt
        // deliCounter.style.visibility = "hidden"
    welcomeTag1.style.visibility = 'visible'
    welcomeTag2.style.visibility = 'hidden'
    welcomeImg1.style.visibility = 'hidden'
    mainGameArea.style.visibility = 'visible'
    deliCounter.style.visibility = 'hidden'
    createGameBoards()
        // compute
}

function init() {
    welcomeTag1.style.visibility = 'visible'
    welcomeTag2.style.visibility = 'visible'
    welcomeTag1.innerText = welcomeTagTxt1
    welcomeTag2.innerHTML = welcomeTagTxt2
    welcomeImg1.appendChild(italianHoagieImg)
    body.removeChild(mainGameArea)
        // mainGameArea.style.visibility = 'hidden'
}

init()

/*------EventListenrs------- */
welcomeImg1.addEventListener('click', goToDeliBoard)