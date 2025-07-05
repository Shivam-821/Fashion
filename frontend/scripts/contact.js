const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (name && email && message) {
    console.log("Contact Message:", { name, email, message });
    form.reset();
    successMsg.classList.remove("hidden");
  }
});
