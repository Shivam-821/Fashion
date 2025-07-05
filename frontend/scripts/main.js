// Toggle Password Visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// Handle form submit (AI Analysis Button)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("fitForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const fileInput = document.getElementById("userPhoto");
      const file = fileInput.files[0];

      if (!file) {
        alert("Please upload or click a photo.");
        return;
      }

      const formData = new FormData();
      formData.append("photo", file);

      // Example API endpoint call (modify as per backend)
      fetch("/analyze-photo", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          alert("AI Analysis complete! Suggesting outfits soon...");
          // You can update UI or redirect here
        })
        .catch((err) => {
          console.error("Upload failed", err);
          alert("Something went wrong. Try again.");
        });
    });
  }
});

const phrases = [
  "Ask for fashion suggestions",
  "Ask for color advice",
  "Ask for pairing ideas",
  "Ask for style advice",
  "Ask your AI stylist",
  "Ask for outfit planning",
  "Ask for seasonal looks"
];

let current = 0;
const animatedText = document.getElementById("animated-text");

setInterval(() => {
  animatedText.style.opacity = 0;
  setTimeout(() => {
    animatedText.textContent = phrases[current];
    animatedText.style.opacity = 1;
    current = (current + 1) % phrases.length;
  }, 300);
}, 2000);

document.getElementById('send-btn').addEventListener('click', () => {
  const input = document.getElementById('user-input').value.trim();
  if (input !== '') {
    addUserMessage(input);
    respondWithStyle(input); // <-- StyleSense AI replies here
    document.getElementById('user-input').value = '';
  }
});

function addUserMessage(message) {
  const chat = document.createElement('div');
  chat.className = 'user-message';
  chat.textContent = message;
  document.body.appendChild(chat);
}

function respondWithStyle(input) {
  const reply = document.createElement("div");
  reply.className = "bot-message";

  if (input.toLowerCase().includes("upload") || input.toLowerCase().includes("photo")) {
    reply.innerHTML = "📸 Got your photo! You look fab already 😍<br>Analyzing your look... ✅💯";
  } else {
    reply.innerHTML = "Got it! Your fit check is on point 💃✨ Let me work my magic 💫";
  }

  document.body.appendChild(reply);
}
