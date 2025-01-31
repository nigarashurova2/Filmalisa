const contactForm = document.querySelector(".contact-form");
const signInButton = document.querySelector(".sign-in-button");
const userProfile = document.querySelector(".user-profile");
const profileImage = userProfile.querySelector("img");
const profileFullName = userProfile.querySelector("a span");
const logoutBtn = document.getElementById("logout");
document.addEventListener("DOMContentLoaded", async function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const plusIcon = item.querySelector(".plus-icon");

    question.addEventListener("click", () => {
      item.classList.toggle("active");

      if (item.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        plusIcon.textContent = "×";
      } else {
        answer.style.maxHeight = null;
        plusIcon.textContent = "+";
      }
    });
  });

  const token = JSON.parse(localStorage.getItem("client_token"));
  if (token) {
    const { img_url: imgUrl = "", full_name } = (await profileData()) || {};
    console.log(await profileData());
    signInButton.classList.add("display_none");
    userProfile.classList.remove("display_none");
    profileImage.src = imgUrl;
    profileFullName.textContent = full_name;
  }
});

profileFullName.addEventListener("click", ()=>{
  window.location.href = "/client/pages/home.html"

})

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  let formData = [...new FormData(this)];

  let obj = Object.fromEntries(formData);

  if (!Object.keys(obj).length) return;

  try {
    const res = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );

    if (res.ok)
      Swal.fire({
        title: "Success",
        text: "Your message has been sent successfully!",
        icon: "success",
        position: "center-center",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        this.reset();
      });
  } catch (e) {
    console.log(e);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const get_started_btn = document.querySelector(".get-started");
get_started_btn.addEventListener("click", () => {
  const email = document.querySelector(".email-signup .email").value;
  if (!email) {
    Swal.fire({
      title: "Warning",
      text: "Please enter your email!",
      icon: "warning",
      position: "center-center",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      this.reset();
    });
    return;
  }
  window.location.href = `register.html?email=${email}`;
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("client_token");
  Swal.fire({
    title: "Success",
    text: "Logout successful!",
    icon: "success",
    position: "center-center",
    showConfirmButton: false,
    timer: 3000,
  }).then(() => {
    window.location.reload();
  });
});
async function profileData() {
  try {
    const access_token = JSON.parse(localStorage.getItem("client_token"));
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    let response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/profile",
      options
    );
    if (response.ok) {
      let resData = await response.json();
      return resData.data;
    }
  } catch (error) {
    console.log(error);
  }
}
