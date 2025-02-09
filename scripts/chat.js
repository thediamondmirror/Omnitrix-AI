document.addEventListener("DOMContentLoaded", function() {
    const chatInput = document.getElementById("chatInput");

    // Auto-expand input as user types
    chatInput.addEventListener("input", function() {
        this.style.height = "30px"; // Reset height
        this.style.height = (this.scrollHeight) + "px"; // Adjust height
    });

    // Submit message when pressing Enter (without Shift)
    chatInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submitChatRequest();
        }
    });
});

// Function to handle message submission
function submitChatRequest() {
    let chatBox = document.getElementById("chatBox");
    let chatInput = document.getElementById("chatInput");
    let message = chatInput.value.trim();

    if (message === "") return;

    // Display user message
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerText = message;
    chatBox.appendChild(userMessage);
    chatInput.value = "";

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate AI response
    setTimeout(() => {
        let botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.innerText = "Omnitrix AI is thinking...";
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

// Expose function globally
window.submitChatRequest = submitChatRequest;
