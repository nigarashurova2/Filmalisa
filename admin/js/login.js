const email = document.querySelector("#email")
const password = document.querySelector(".password")
const loginForm = document.querySelector("#loginForm")


window.addEventListener("DOMContentLoaded",()=>{
   const token = JSON.parse(localStorage.getItem("token"))
   if(token) window.location.href = 'index.html'
})

loginForm.addEventListener("submit", async(event)=>{
    event.preventDefault()
    let data = {email:email.value, password: password.value }
    let options = {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch("https://api.sarkhanrahimli.dev/api/filmalisa/auth/admin/login", options)
        console.log(response);
        
        if (response.ok) {
            const responseData = await response.json();
            console.log(data);
            
            let token = responseData.data.tokens.access_token;
            localStorage.setItem("token", JSON.stringify(token));
            window.location.href = "index.html"
            Swal.fire({
                title: 'Success',
                text: 'Login successful!',
                icon: 'success',
                position: 'center-center',
                showConfirmButton: false,
                timer: 3500 
              })
             
        } 
    } catch (error) {
        console.log(error)
    }
})

