const contactForm = document.querySelector(".contact-form");

document.addEventListener("DOMContentLoaded", function () {
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
});

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
      document.getElementById("message").textContent =
        "Your message has been sent successfully";
  } catch (e) {
    console.log(e);
  }
});
