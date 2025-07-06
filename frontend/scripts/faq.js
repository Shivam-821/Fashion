const questions = document.querySelectorAll(".faq-question");

questions.forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.style.display === "block";

    // Close all open answers
    document.querySelectorAll(".faq-answer").forEach(ans => ans.style.display = "none");

    // Toggle current one
    answer.style.display = isOpen ? "none" : "block";
  });
});
