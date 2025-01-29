// window.addEventListener("DOMContentLoaded",()=>{
//     const token = JSON.parse(localStorage.getItem("token"))
//     if(!token) window.location.href = 'login.html'
//  })






// LOGOUT //
const logout = document.querySelector(".logout")
logout.addEventListener("click", ()=>{
    localStorage.removeItem("token"); 
    Swal.fire({
        title: 'Success',
        text: 'Logout successful!',
        icon: 'success',
        position: 'center-center',
        showConfirmButton: false,
        timer: 3000
      }).then(() => {
        window.location.href = "login.html";
    });
})
