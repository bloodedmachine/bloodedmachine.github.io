const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const playpause = document.getElementById('playpause');
const playpause2 = document.getElementById('playpause2');
const playpause3 = document.getElementById('playpause3');


canvas.height = window.innerHeight * 0.9;
canvas.width = (window.innerHeight * 0.9) / (16 / 9); //test

playpause.height = window.innerHeight * 0.9 * 0.15;
playpause.width = window.innerHeight * 0.9 * 0.15; //test

playpause2.height = window.innerHeight * 0.9 * 0.15;
playpause2.width = window.innerHeight * 0.9 * 0.15; //test

playpause3.height = window.innerHeight * 0.9 * 0.15;
playpause3.width = window.innerHeight * 0.9 * 0.15; //test

document.getElementById("pongCanvas").style.borderRadius = window.innerHeight * 0.05 + "px";
document.getElementById("score").style.fontSize = window.innerHeight * 0.2 + "px";
//document.getElementById("score").style.height = window.innerHeight * 1 + "px";
document.getElementById("pauseBtn").style.fontSize = window.innerHeight * 0.05 + "px";

let gameStarted = true; // Game starts automatically
let gamePaused = true;

var score = 0

const pauseBtn = document.getElementById('pauseBtn');

pauseBtn.addEventListener('click', togglePause);

const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', togglePause);

window.addEventListener('keydown', function (e) {
    keyState[e.key] = true;
});

window.addEventListener('keyup', function (e) {
    keyState[e.key] = false;
});

let animationId;

const paddleSpeed = 5;
const paddleWidth = ((window.innerHeight - 30) / (16 / 9)) * 0.25;
const paddleHeight = paddleWidth * 0.3;
//const paddleHeight = 1;
let topPaddleX = canvas.width / 2 - paddleWidth / 2;

let ballSize = paddleWidth * 0.25;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 10;
let ballSpeedY = 10;

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
if (ballY + ballSize >= canvas.height - paddleHeight - paddleHeight * 1 && ballX > topPaddleX && ballX < topPaddleX + paddleWidth) {
    ballSpeedY = -ballSpeedY;
    score++;

    if (ballSize < 50){
          ballSize += 2; // Increase ball size
    }
  
    ballSpeedX += 1; // Increase ball speed
    ballSpeedY += 1; // Increase ball speed
    document.getElementById("score").innerHTML = score;
     drawBall(); // Redraw the ball after hitting the paddle
}


    // Ball out of bounds (left wall)
    if (ballY + ballSize > canvas.height) {
        // Reset ball position
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        topPaddleX = canvas.width / 2 - paddleWidth / 2;
        document.getElementById("highscore").innerHTML = score + " IS KAK";
        score = 0;
        ballSpeedX = 7;
        ballSpeedY = 7;
        //togglePause()
        document.getElementById("score").style.display = "none"
       // document.getElementById("pauseBtn").innerHTML = "TRY AGAIN"
        document.getElementById("score").innerHTML = score;
    }
}

function drawBall() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
}


function drawBallWithMotionBlur() {
    // Draw multiple semi-transparent copies of the ball at different positions
    const numBlurFrames = 4; // Adjust the number of blur frames as needed
    const blurOpacity = 0.6; // Adjust the opacity of the blur effect
    const blurSpacing = 1; // Adjust the spacing between blur frames

    for (let i = 0; i < numBlurFrames; i++) {
        // Calculate the position of the ball for this blur frame
        const blurBallX = ballX + i * blurSpacing * ballSpeedX;
        const blurBallY = ballY + i * blurSpacing * ballSpeedY;

        // Set the transparency for this blur frame
        ctx.globalAlpha = blurOpacity;

        // Draw the ball at the blur frame position
        ctx.beginPath();
        ctx.arc(blurBallX, blurBallY, ballSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + blurOpacity + ')';
        ctx.fill();
    }

    // Reset the global alpha to ensure subsequent drawing is not affected
    ctx.globalAlpha = 1.0;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(topPaddleX, canvas.height - paddleHeight - paddleHeight * 1); // Draw paddle at the bottom
    drawBall();
    drawBallWithMotionBlur(); // Draw ball with motion blur
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
    document.getElementById("pauseBtn").style.fontSize = window.innerHeight * 0.03 + "px";
    document.getElementById("score").style.display = "block";
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("playpause").style.display = "block";
  // document.getElementById("playpause3").style.display = "block";
    gamePaused = !gamePaused;

    document.getElementById("playpause").src = gamePaused ? "play.png" : "pause.png";
 //   pauseBtn.innerText = gamePaused ? "" : "";
    //document.getElementById("pauseplay").style.display = "block";
   // document.getElementById("pauseplay").src = "pause.png";


    if (!gamePaused) {
        gameLoop();
    }
}

gameLoop();
