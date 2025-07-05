const questions = [
  {
    text: "What's your skin type?",
    options: ["Dry", "Oily", "Normal", "Sensitive"]
  },
  {
    text: "What's the climate in your area?",
    options: ["Hot", "Cold", "Humid", "Moderate"]
  },
  {
    text: "What kind of activity will you do?",
    options: ["Casual", "Sports", "Formal", "Party"]
  },
  {
    text: "What discomfort do you want to avoid?",
    options: ["Itchiness", "Sweating", "Tightness", "Allergic"]
  }
];

let currentQuestion = 0;
const chatbox = document.getElementById("chatbox");
const wave = document.getElementById("voice-wave");
const btn = document.getElementById("start-btn");

function showQuestion(index) {
  const q = questions[index];
  const div = document.createElement("div");
  div.innerHTML = `<p><b>Q${index + 1}:</b> ${q.text}</p>` + q.options.map(opt =>
    `<button class="opt-btn" onclick="selectOption('${opt}')">${opt}</button>`
  ).join(" ");
  chatbox.appendChild(div);
  wave.style.display = "block";
}

function selectOption(option) {
  wave.style.display = "none";
  const reply = document.createElement("p");
  reply.innerHTML = `<b>You:</b> ${option}`;
  chatbox.appendChild(reply);

  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(() => showQuestion(currentQuestion), 800);
  } else {
    setTimeout(() => {
      const done = document.createElement("p");
      done.innerHTML = "<b>Thank you!</b> We'll now recommend fabrics for you.";
      chatbox.appendChild(done);
    }, 800);
  }
}

btn.addEventListener("click", () => {
  chatbox.innerHTML = "";
  currentQuestion = 0;
  showQuestion(currentQuestion);
});


function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('user-input').value = transcript;
    sendMessage();
  };

  recognition.onerror = function (event) {
    alert("Couldn't hear you clearly. Try again!");
  };

  recognition.start();
}

let mediaRecorder;
let audioChunks = [];

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      audioChunks = [];

      mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'user_audio.webm');

        // Send to backend
        fetch('/upload-audio', {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          console.log('Server response:', data);
        })
        .catch(err => {
          console.error('Upload failed:', err);
        });
      };
    });
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
}

let isRecording = false;

function toggleRecording() {
  if (!isRecording) {
    startRecording();
    isRecording = true;
    console.log("Recording started...");
  } else {
    stopRecording();
    isRecording = false;
    console.log("Recording stopped and uploading...");
  }
}
