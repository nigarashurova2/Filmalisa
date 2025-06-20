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
    
      if (data.result){
        Swal.fire({
          title: 'Success',
          text: 'Register successful!',
          icon: 'success',
          position: 'center-center',
          showConfirmButton: false,
          timer: 2000 
        }).then(() => {
          window.location.href = "login.html";
        });
      }
    
    }
  } catch (e) {
    console.log(e);
  }
});

window.addEventListener("load", () => {
  const token = JSON.parse(localStorage.getItem("client_token"));
  if (token) window.location.href = "home.html";

  const params = new URLSearchParams(window.location.search)
  const email = params.get("email");
  document.querySelector("#email").value = email
});
