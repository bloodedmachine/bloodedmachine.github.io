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
const heading = document.createElement('h1');
heading.textContent = 'KOK FIGHT';
heading.style.textAlign = 'center';
heading.style.color = 'black';
document.body.insertBefore(heading, canvas);

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

    const colorToBetOn = document.querySelector('input[name="color"]:checked').value;
    const randomNumber = Math.round(Math.random());

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.font = '30px Font';
    ctx.textAlign = 'center';

    if ((colorToBetOn === 'green' && randomNumber === 0) || (colorToBetOn === 'red' && randomNumber === 1)) {
        ctx.fillStyle = 'green';
        ctx.fillText('You won! Your bet is doubled.', canvas.width / 2, canvas.height / 2);
        balance += betAmount; // Update balance
    } else {
        ctx.fillStyle = 'red';
        ctx.fillText('You lost! Your bet is gone.', canvas.width / 2, canvas.height / 2);
        balance -= betAmount; // Update balance
    }

    // Update balance display
    document.getElementById('balance').textContent = balance;

    // Save balance to local storage
    localStorage.setItem('balance', balance.toString());
}
