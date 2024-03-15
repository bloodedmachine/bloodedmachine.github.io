let balance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 10000; // Initial balance retrieved from local storage or set to 10000 if not present


const canvas = document.getElementById('kokCanvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight * 0.9;
canvas.width = (window.innerHeight * 0.9) / (16 / 9);
document.getElementById("kokCanvas").style.borderRadius = window.innerHeight * 0.05 + "px";
document.getElementById("kokCanvas").style.borderRadius = window.innerHeight * 0.05 + "px";
document.getElementById("button-container").style.width = (canvas.width*0.9) + "px";
//document.getElementById("button-container").style.height = (canvas.height*0.1) + "px";
// Create a heading
// Create a heading
/*const heading = document.createElement('h1');
heading.textContent = 'KOK FIGHT';
heading.style.textAlign = 'center';
heading.style.color = 'black';
document.body.insertBefore(heading, canvas);*/

const generateButton = document.getElementById('generateButton');
generateButton.onclick = bet;

// Update balance display
document.getElementById('balance').textContent = balance;

function bet() {
    
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Please enter a valid bet amount.');
        return;
    }
    if (betAmount > balance) {
        alert('You do not have enough balance.');
        return;
    }

    animate()



    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.font = '30px Font';
    ctx.textAlign = 'center';


}


// Chicken images
const chicken1 = new Image();
chicken1.onload = function() {
    draw(); // Draw the chickens once the image is loaded
};
chicken1.src = 'chickenfacingright.png';

const chicken2 = new Image();
chicken2.onload = function() {
    draw(); // Draw the chickens once the image is loaded
};
chicken2.src = 'chickenfacingleft.png';
let chickenWidth = 150; // Width of the chicken image
let chickenHeight = 150; // Height of the chicken image
// Initial positions
let chicken1X = (canvas.width - chickenWidth) / 2 - canvas.width / 5; // Centered horizontally
let chicken2X = (canvas.width - chickenWidth) / 2 + canvas.width / 5; // Adjusted to have space between the chickens

const chickenY = canvas.height * 0.35;

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw chicken 1 with larger size
    ctx.drawImage(chicken1, chicken1X, chickenY, 150, 150);
    // Draw chicken 2 with larger size
    ctx.drawImage(chicken2, chicken2X, chickenY, 150, 150);
}

// Call draw initially to ensure images are drawn before animation starts
draw();

// Animation loop
function animate() {
    // Move chickens randomly
    chicken1X += Math.random() * 4 - 1;
    chicken2X += Math.random() * 4 - 3;

    draw(); // Redraw the chickens in their new positions

    // Check for collision
    if (Math.abs(chicken1X - chicken2X) < 10) {
        fight();
        return;
    }

    requestAnimationFrame(animate);
}

    // Fight function
    function fight() {

        const betAmount = parseInt(document.getElementById('betAmount').value);
        if (isNaN(betAmount) || betAmount <= 0) {
            alert('Please enter a valid bet amount.');
            return;
        }
        if (betAmount > balance) {
            alert('You do not have enough balance.');
            return;
        }
        const winner = Math.random() < 0.5 ? 1 : 2;


        const colorToBetOn = document.querySelector('input[name="color"]:checked').value;
        const randomNumber = Math.round(Math.random());


        if (winner == 1) {
            ctx.fillStyle = 'white';
            ctx.fillText('CHICKEN 1 WON', canvas.width / 2, canvas.height / 4);

        } else {
            ctx.fillStyle = 'white';
            ctx.fillText('CHICKEN 2 WON', canvas.width / 2, canvas.height / 4);
        }

        if ((colorToBetOn === 'green' && winner === 1) || (colorToBetOn === 'red' && randomNumber === 1)) {
            ctx.fillStyle = 'green';
            ctx.fillText('You won! Your bet has been doubled.', canvas.width / 2, canvas.height / 3);
            balance += betAmount; // Update balance
chicken1X = (canvas.width - chickenWidth) / 2 - canvas.width / 5; // Centered horizontally
chicken2X = (canvas.width - chickenWidth) / 2 + canvas.width / 5; // Adjusted to have space between the chickens

        } else {
            ctx.fillStyle = 'red';
            ctx.fillText('You lost! Your bet is gone.', canvas.width / 2, canvas.height / 3);
            balance -= betAmount; // Update balance

chicken1X = (canvas.width - chickenWidth) / 2 - canvas.width / 5; // Centered horizontally
chicken2X = (canvas.width - chickenWidth) / 2 + canvas.width / 5; // Adjusted to have space between the chickens

        }

            // Update balance display
    document.getElementById('balance').textContent = balance;

    // Save balance to local storage
    localStorage.setItem('balance', balance.toString());
      }

  