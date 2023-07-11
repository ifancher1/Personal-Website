//board
var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//snake body
var snakeLength = [];

//food
var foodX;
var foodY;

//velocities for X and Y
var velX = 0;
var velY = 0;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);
}

function update() {
    //stop the game if game over
    if (gameOver) {
        return;
    }
    
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //add segments and place new food
    if (snakeX == foodX && snakeY == foodY) {
        snakeLength.push([foodX, foodY])
        placeFood();
    }

    //add tail segments to the snake
    for (let i=snakeLength.length-1; i>0; i--) {
        snakeLength[i] = snakeLength[i-1];
    }

    if (snakeLength.length) {
        snakeLength[0] = [snakeX, snakeY];
    }

    //create the head of the snake
    context.fillStyle = "lime";
    snakeX += velX * blockSize;
    snakeY += velY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i=0; i<snakeLength.length; i++) {
        context.fillRect(snakeLength[i][0], snakeLength[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > columns*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over!");
    }

    for (let i=0; i<snakeLength.length; i++) {
        if (snakeX == snakeLength[i][0] && snakeY == snakeLength[i][1]) {
            gameOver = true;
            alert("Game Over!");
        }
    }
}

//place food in a random spot
function placeFood() {
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

//event listener for change in direction
function changeDirection(e){
    if (e.code == "ArrowUp" && velY != 1) {
        velY = -1;
        velX = 0;
    }

    else if (e.code == "ArrowDown" && velY != -1) {
        velY = 1;
        velX = 0
    }

    else if (e.code == "ArrowLeft" && velX != 1) {
        velY = 0;
        velX = -1;
    }

    else if (e.code == "ArrowRight" && velX != -1) {
        velY = 0;
        velX = 1;
    }
}