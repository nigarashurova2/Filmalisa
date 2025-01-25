const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { email, password };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/auth/login",
      options
    );
    if (response.ok) {
      const resData = await response.json();
      const token = resData.data.tokens.access_token;
      if (token) localStorage.setItem("client_token", JSON.stringify(token));
      Swal.fire({
        title: 'Success',
        text: 'Login successful!',
        icon: 'success',
        position: 'center-center',
        showConfirmButton: false,
        timer: 2000 
      }).then(() => {
        window.location.href = "home.html";
      });
     
     
    } else {
      document.querySelector(".error_message").innerHTML =
        "Password or email is wrong";
    }
  } catch (e) {
    console.log("e", e);
  }
});

window.addEventListener("load", () => {
  const token = JSON.parse(localStorage.getItem("client_token"));
  if (token) window.location.href = "home.html";
});
