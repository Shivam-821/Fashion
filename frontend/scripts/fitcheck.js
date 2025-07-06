document.getElementById("fitForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const bodyType = document.getElementById("bodyType").value;
  const skinTone = document.getElementById("skinTone").value;
  const occasion = document.getElementById("occasion").value;

  // Optionally save or send to next page
  console.log("Form Data:", { bodyType, skinTone, occasion });

  // Redirect to results.html (for now)
  window.location.href = "results.html";
});
