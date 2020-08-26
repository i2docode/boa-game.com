const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const levelDisplay = document.getElementById('level')
let squaresArray = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let mouseIndex = 0
let level = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i = 0; i < width*width; i++) {
     //create element
    const divs = document.createElement('div')
    //add styling to the element
    divs.classList.add('squareStyle')
    //put the element into our grid
    grid.appendChild(divs)
    //push it into a new squares array    
    squaresArray.push(divs)
    }
}
createGrid()

currentSnake.forEach(index => squaresArray[index].classList.add('snake'))

function startRestartGame() {
    //remove the snake
    currentSnake.forEach(index => squaresArray[index].classList.remove('snake'))
    //remove the apple
    squaresArray[mouseIndex].classList.remove('mouse')

    clearInterval(timerId)

    currentSnake = [2,1,0]

    level = 0

    //re add new level to browser
    levelDisplay.textContent = level

    direction = 1

    intervalTime = 1000

    generateApple()

    //readd the class of snake to our new currentSnake
    currentSnake.forEach(index => squaresArray[index].classList.add('snake'))

    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squaresArray[currentSnake[0] + direction].classList.contains('snake')
    )
    return clearInterval(timerId)

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()

    //remove styling from last element
    squaresArray[tail].classList.remove('snake')

    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it
    
    //deal with snake head gets apple
    if (squaresArray[currentSnake[0]].classList.contains('mouse')) {

        //remove the class of apple
        squaresArray[currentSnake[0]].classList.remove('mouse')

        //grow our snake by adding class of snake to it
        squaresArray[tail].classList.add('snake')
        
        //grow our snake array
        currentSnake.push(tail)

        //generate new apple
        generateApple()

        //add one to the score
        level++

        //display our score
        levelDisplay.textContent = level

        //speed up our snake
        clearInterval(timerId)
        
        intervalTime = intervalTime * speed
        
        timerId = setInterval(move, intervalTime)
    }
    
    
    
    squaresArray[currentSnake[0]].classList.add('snake')
}






function generateApple() {
    do {
        mouseIndex = Math.floor(Math.random() * squaresArray.length)
    } while (squaresArray[mouseIndex].classList.contains('snake'))
    squaresArray[mouseIndex].classList.add('mouse')
} 
generateApple()

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -width
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width
    }
}
document.addEventListener('keyup', control)
startButton.addEventListener('click', startRestartGame)