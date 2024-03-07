const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

let gameStarted = false;
let gamePaused = false;

// Player
// Load player image
const playerImage = new Image();
playerImage.src = 'playerfinal.png';

let playerWidth = 70;
let playerHeight = 100;
let playerX = canvas.width / 2 - playerWidth / 2;
let playerY = canvas.height / 2 - playerHeight / 2;
let playerSpeed = 5;
let dx = 0;
let dy = 0;


// Bullets


const bulletWidth =20;
const bulletHeight = 20;
const bulletSpeed = 17;
let bullets = [];

// Enemy
const enemyImage = new Image();
enemyImage.src = 'skullred.png';

const enemyWidth = 50;
const enemyHeight = 50;
const enemySpeed = 3;
let enemies = [];
const spawnRate = 900; // milliseconds
let lastSpawn = 0;

// Score and Health
let score = 0;
let health = 4;

startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
canvas.addEventListener('click', shootBullet);

// Event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        gameLoop();
    }
}

function togglePause() {
    gamePaused = !gamePaused;
    pauseBtn.innerText = gamePaused ? 'Resume' : 'Pause';
}

function shootBullet(event) {
    if (!gamePaused && gameStarted && event.button === 0) { // Check if left mouse button is clicked
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const angle = Math.atan2(mouseY - (playerY + playerHeight / 2), mouseX - (playerX + playerWidth / 2));
        const velocityX = bulletSpeed * Math.cos(angle);
        const velocityY = bulletSpeed * Math.sin(angle);
        bullets.push({ x: playerX + playerWidth / 2 - bulletWidth / 2, y: playerY + playerHeight / 2 - bulletHeight / 2, vx: velocityX, vy: velocityY });
    }
}

function handleKeyDown(event) {
    if (event.key === 'a') {
        dx = -playerSpeed;
    } else if (event.key === 'd') {
        dx = playerSpeed;
    } else if (event.key === 'w') {
        dy = -playerSpeed;
    } else if (event.key === 's') {
        dy = playerSpeed;
    }
}

function updateBullets() {
    bullets = bullets.filter((bullet) => bullet.y > 0 && bullet.x > 0 && bullet.x < canvas.width && bullet.y < canvas.height);

    bullets.forEach((bullet) => {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
    });
}

function handleKeyUp(event) {
    if (event.key === 'a' || event.key === 'd') {
        dx = 0;
    } else if (event.key === 'w' || event.key === 's') {
        dy = 0;
    }
}

function update() {
    // Move player
    playerX += dx;
    playerY += dy;

    // Move enemies and check for collisions
    enemies.forEach((enemy, enemyIndex) => {
        // Calculate direction towards the player
        const dx = playerX - enemy.x;
        const dy = playerY - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Normalize direction vector
        const nx = dx / distance;
        const ny = dy / distance;
        
        // Move enemy towards the player
        enemy.x += nx * enemySpeed;
        enemy.y += ny * enemySpeed;

        // Check collision with player
        if (collides(enemy, playerX, playerY, playerWidth, playerHeight)) {
            if (health <= 0) {
                gameOver();
            } else {
                health--;
                enemies.splice(enemyIndex, 1); // Remove enemy on collision
            }
        }

        // Check collision with bullets
        bullets.forEach((bullet, bulletIndex) => {
            if (
                bullet.x < enemy.x + enemyWidth &&
                bullet.x + bulletWidth > enemy.x &&
                bullet.y < enemy.y + enemyHeight &&
                bullet.y + bulletHeight > enemy.y
            ) {
                enemies.splice(enemyIndex, 1);
                bullets.splice(bulletIndex, 1);
                score++;
            }
        });
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.drawImage(playerImage, playerX, playerY, playerWidth, playerHeight);


    // Draw bullets
    ctx.fillStyle = 'red';
    bullets.forEach((bullet) => ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight));

    // Draw enemies
    enemies.forEach((enemy) => ctx.drawImage(enemyImage, enemy.x, enemy.y, enemyWidth, enemyHeight));
    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '20px Font';
    ctx.fillText('Score: ' + score, 10, 30);

    // Draw health
    ctx.fillText('Health: ' + (health + 1), 10, 60);
}

function gameOver() {
    alert('Game over! Your score is ' + score);
    document.location.reload();
}

function collides(rect1, x, y, width, height) {
    return (
        x < rect1.x + enemyWidth &&
        x + playerWidth > rect1.x &&
        y < rect1.y + enemyHeight &&
        y + playerHeight > rect1.y
    );
}

function gameLoop() {
    if (!gamePaused) {
        update();
        updateBullets(); // Call updateBullets here
        draw();
            // Spawn enemies
    if (Date.now() - lastSpawn > spawnRate) {
        const side = Math.floor(Math.random() * 4); // Randomly choose a side (0: top, 1: right, 2: bottom, 3: left)
        let enemyX, enemyY;

        switch (side) {
            case 0: // Top side
                enemyX = Math.random() * canvas.width;
                enemyY = -enemyHeight;
                break;
            case 1: // Right side
                enemyX = canvas.width + enemyWidth;
                enemyY = Math.random() * canvas.height;
                break;
            case 2: // Bottom side
                enemyX = Math.random() * canvas.width;
                enemyY = canvas.height + enemyHeight;
                break;
            case 3: // Left side
                enemyX = -enemyWidth;
                enemyY = Math.random() * canvas.height;
                break;
        }

        enemies.push({ x: enemyX, y: enemyY, targetX: playerX, targetY: playerY });
        lastSpawn = Date.now(); // Update lastSpawn when a new enemy is spawned
    }
    }

    requestAnimationFrame(gameLoop);
}

