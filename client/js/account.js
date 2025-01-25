window.addEventListener("DOMContentLoaded", ()=>{
 getProfile()
})


async function getProfile() {
    const profileForm = document.querySelector("#profileForm")
    const profile_url = document.querySelector(".profile_url")
    const data = await profileData()
    profileForm.fullname.value = data.full_name
    profileForm.img_url.value = data.img_url
    profileForm.email.value = data.email
    profile_url.src = data.img_url
}

async function profileData() {
    try {
        const access_token = JSON.parse(localStorage.getItem("client_token"))
        const options = {
            method:"GET",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            }
        }
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/profile', options)
        if(response.ok){
            let resData = await response.json();
            return resData.data
        }
        
    } catch (error) {
        console.log(error)
    }
}



// PROFILE PUT
const profileForm = document.querySelector("#profileForm")

async function updateProfile(event) {
    event.preventDefault()
    const data = {
        full_name: profileForm.fullname.value,
        email: profileForm.email.value,
        img_url: profileForm.img_url.value,
        password: profileForm.img_url.value
    }

    try {
        const access_token = JSON.parse(localStorage.getItem("client_token"))
        const options = {
            method:"PUT",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/profile', options)
        if(response.ok){
            getProfile()
        }
        
    } catch (error) {
        console.log(error)
    }
}
profileForm.addEventListener("submit", updateProfile)
