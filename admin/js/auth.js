window.addEventListener("DOMContentLoaded",()=>{
    const token = JSON.parse(localStorage.getItem("token"))
    if(!token) window.location.href = 'login.html'
 })