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

if(createBtn){
    createBtn.addEventListener("click", function (event) {
        createModal.classList.add("show")
    })
}


editBtn.forEach(btn=>{
    btn.addEventListener("click", function (event) {
        editModal.classList.add("show")
    })
})


closeBtn.forEach(btn=>{
    btn.addEventListener("click", function (event) {
        let modal = event.target.closest(".modal")
        modal.classList.remove("show")
    })
})


console.log(delCloseModalBtn);


delCloseModalBtn.addEventListener("click", function (event) {
    let modal = event.target.closest(".modal")
    console.log(modal);
    modal.classList.remove("show")
})
// MODAL END //




