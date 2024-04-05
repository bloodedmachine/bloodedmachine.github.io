// Initialize Firebase

// Reference to the chat messages in the database
const chatRef = firebase.database().ref("chat");

// Reference to the DOM elements
const chatContainer = document.querySelector(".chat-container");
const playerNameInput = document.getElementById("player-name");
const messageInput = document.getElementById("message-input");
const sendMessageButton = document.getElementById("send-message");

// Function to send a message to Firebase
function sendMessage() {
  const playerName = playerNameInput.value.trim();
  const message = messageInput.value.trim();

  if (playerName !== "" && message !== "") {
    chatRef.push({
      name: playerName,
      message: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    messageInput.value = ""; // Clear the input field after sending
  }
}

// Function to display chat messages
function displayMessage(playerName, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `
    <div class="messagename">${playerName}</div>
    <div class="messagesent">${message}</div>
  `;
  chatContainer.appendChild(messageElement);
  // Scroll to the bottom to show the latest message
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to listen for new chat messages
function listenForMessages() {
  chatRef.on("child_added", (snapshot) => {
    const messageData = snapshot.val();
    const playerName = messageData.name;
    const message = messageData.message;
    displayMessage(playerName, message);
  });
}

// Event listener for sending messages
sendMessageButton.addEventListener("click", sendMessage);

// Event listener for pressing Enter key to send messages
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Call the function to listen for new chat messages
listenForMessages();
