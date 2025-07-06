document.getElementById("profile-btn").addEventListener("click", () => {
  document.getElementById("profile-slide").classList.remove("translate-x-full");
});
document.getElementById("close-profile").addEventListener("click", () => {
  document.getElementById("profile-slide").classList.add("translate-x-full");
});
