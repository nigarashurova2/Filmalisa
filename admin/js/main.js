// MODAL START //
let deleteBtn = document.querySelectorAll(".delete-btn")
let deleteModal = document.querySelector("#deleteModal")

let editBtn = document.querySelectorAll(".edit-btn")
let editModal = document.querySelector("#editModal")

let createBtn = document.querySelector(".create-btn")
let createModal = document.querySelector("#createModal")

const closeBtn = document.querySelectorAll(".close")

let delCloseModalBtn = document.querySelector(".del-modal-close"), editModalCloseBtn = document.querySelector(".edit-modal-close")

deleteBtn.forEach(btn=>{
    btn.addEventListener("click", function (event) {
        deleteModal.classList.add("show")
    })
})

if(createBtn) createBtn.addEventListener("click", function (event) {
    createModal.classList.add("show")
})

if(editBtn.length) editBtn.forEach(btn=>{
    btn.addEventListener("click", function (event) {
        editModal.classList.add("show")
    })
})

delCloseModalBtn.addEventListener("click", function (event) {
    let modal = event.target.closest(".modal")
    modal.classList.remove("show")
})

if(closeBtn.length){
    closeBtn.forEach(btn=>{
        btn.addEventListener("click", function (event) {
     let modal = event.target.closest(".modal")
     modal.classList.remove("show")
        })
    })
}
// MODAL END //




// FETCH PROFILE //
window.addEventListener("load", getProfile)

async function getProfile() {
    const adminProfile = document.querySelector(".admin-profile .admin-name")
    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"GET",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            },
        }
        const response = await fetch("https://api.sarkhanrahimli.dev/api/filmalisa/profile", options)
        if(response.ok){
            const responseData = await response.json()
            const full_name = responseData.data.full_name
            adminProfile.textContent = full_name
        }
    } catch (error) {
        console.log(error)
    }
}


