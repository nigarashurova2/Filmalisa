window.addEventListener("DOMContentLoaded",()=>{
    const token = JSON.parse(localStorage.getItem("token"))
    if(!token) window.location.href = 'login.html'
 })






// LOGOUT //
const logout = document.querySelector(".logout")
logout.addEventListener("click", ()=>{
    localStorage.removeItem("token"); window.location.href = "login.html";
})
