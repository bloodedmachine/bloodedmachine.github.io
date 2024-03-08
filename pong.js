const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight - 30;
canvas.width = (window.innerHeight - 30) / (16/9); //test

let gameStarted = true; // Game starts automatically
let gamePaused = true;

var score = 0

const pauseBtn = document.getElementById('pauseBtn');

pauseBtn.addEventListener('click', togglePause);

window.addEventListener('keydown', function (e) {
    keyState[e.key] = true;
});

window.addEventListener('keyup', function (e) {
    keyState[e.key] = false;
});

let animationId;

const paddleSpeed = 5;
const paddleWidth = ((window.innerHeight - 30) / (16/9)) * 0.2;
const paddleHeight = paddleWidth * 0.333;
let topPaddleX = canvas.width / 2 - paddleWidth / 2 + paddleHeight * 0.5;

const ballSize = paddleWidth * 0.3;
let ballX = canvas.width / 2;
let ballY = 12 + canvas.height / 2;
let ballSpeedX = 8;
let ballSpeedY = 8;

function drawPaddle(x, y) {
ctx.fillStyle = 'white';
const cornerRadius = paddleHeight / 2; // Adjust this value to change the roundness of the corners
ctx.beginPath();
ctx.moveTo(x + cornerRadius, y);
ctx.arcTo(x + paddleWidth, y, x + paddleWidth, y + paddleHeight, cornerRadius);
ctx.arcTo(x + paddleWidth, y + paddleHeight, x, y + paddleHeight, cornerRadius);
ctx.arcTo(x, y + paddleHeight, x, y, cornerRadius);
ctx.arcTo(x, y, x + paddleWidth, y, cornerRadius);
ctx.closePath();
ctx.fill();
}

function drawBall() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
}

canvas.addEventListener('mousemove', function (event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    // Update paddle position based on mouse movement
    topPaddleX = mouseX - paddleWidth / 2;

    // Ensure the paddle stays within the canvas boundaries
    if (topPaddleX < 0) {
        topPaddleX = 0;
    } else if (topPaddleX > canvas.width - paddleWidth) {
        topPaddleX = canvas.width - paddleWidth;
    }
});


canvas.addEventListener('touchmove', function (event) {
    event.preventDefault(); // Prevent default touch action (scrolling, zooming, etc.)

    const touch = event.touches[0]; // Get the first touch point
    const touchX = touch.clientX - canvas.getBoundingClientRect().left; // Get touch X position relative to canvas
    const touchY = touch.clientY - canvas.getBoundingClientRect().top; // Get touch Y position relative to canvas

    // Update paddle position based on touch movement
    topPaddleX = touchX - paddleWidth / 2;

    // Ensure the paddle stays within the canvas boundaries
    if (topPaddleX < 0) {
        topPaddleX = 0;
    } else if (topPaddleX > canvas.width - paddleWidth) {
        topPaddleX = canvas.width - paddleWidth;
    }
});

function update() {
    // Move paddle
    if (!gamePaused) {
        if (keyState.a && topPaddleX > 0) {
            topPaddleX -= paddleSpeed;
        }
        if (keyState.d && topPaddleX < canvas.width - paddleWidth) {
            topPaddleX += paddleSpeed;
        }
    }

    // Move ball
    ballX += -ballSpeedX;
    ballY += -ballSpeedY;

    // Ball collision with top, bottom, and right walls
    if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
        ballSpeedY = -ballSpeedY; // Reverse vertical speed if hitting top or bottom walls
    }
    if (ballX + ballSize > canvas.width || ballX - ballSize < 0) {
        ballSpeedX = -ballSpeedX; // Reverse horizontal speed if hitting the right wall
    }

    // Ball collision with paddle
    if (ballY + ballSize > canvas.height - paddleHeight && ballX > topPaddleX && ballX < topPaddleX + paddleWidth) {
        ballSpeedY = -ballSpeedY;
        score++;
        ballSpeedX = ballSpeedX + 2;
        ballSpeedY = ballSpeedY + 2;
        document.getElementById("score").innerHTML = score;
    }

    // Ball out of bounds (left wall)
    if (ballY + ballSize > canvas.height) {
        // Reset ball position
        ballX = canvas.width / 2;
        ballY = 35  + canvas.height / 2;
        document.getElementById("highscore").innerHTML = score + " IS KAK";
        score = 0;
        ballSpeedX = 8;
        ballSpeedY = 8;
        togglePause()
        document.getElementById("score").style.display = "none"
        document.getElementById("pauseBtn").innerHTML = "TRY AGAIN"
        document.getElementById("score").innerHTML = score;
    }





    // Speed up ball after score reaches 5
    /*  if (score === 1 && ballSpeedX == 7) {
          ballSpeedX *= 2; // Increase horizontal speed by 10%
          ballSpeedY *= 2; // Increase vertical speed by 10%
      }*/
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(topPaddleX, canvas.height - paddleHeight); // Draw paddle at the bottom
    drawBall();
}

const keyState = {};
window.addEventListener('keydown', function (e) {
    if (!gamePaused) {
        keyState[e.key] = true;
    }
});
window.addEventListener('keyup', function (e) {
    if (!gamePaused) {
        keyState[e.key] = false;
    }
});

function gameLoop() {
    update();
    draw();
    if (!gamePaused) {
        animationId = requestAnimationFrame(gameLoop);
    }
}

function togglePause() {
    document.getElementById("score").style.display = "block"
    gamePaused = !gamePaused;
    pauseBtn.innerText = gamePaused ? 'RESUME' : 'PAUSE';
    if (!gamePaused) {
        gameLoop();
    }
}

gameLoop();
