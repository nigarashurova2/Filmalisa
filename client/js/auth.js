window.addEventListener("DOMContentLoaded", () => {
  const token = JSON.parse(localStorage.getItem("client_token"));
  if (!token) window.location.href = "login.html";
});
