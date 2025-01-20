const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const full_name = document.getElementById("full_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { full_name, email, password };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/auth/signup",
      options
    );
    if (response.ok) {
      const data = await response.json();
      if (data.result) window.location.href = "login.html";
    }
  } catch (e) {
    console.log(e);
  }
});

window.addEventListener("load", () => {
  const token = JSON.parse(localStorage.getItem("client_token"));
  if (token) window.location.href = "home.html";
});
