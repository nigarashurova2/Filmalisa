// MODAL START //
let deleteBtn = document.querySelector(".delete-btn")
let deleteModal = document.querySelector("#deleteModal")

let editBtn = document.querySelector(".edit-btn")
let editModal = document.querySelector("#editModal")

let createBtn = document.querySelector(".create-btn")
let createModal = document.querySelector("#createModal")

let delCloseModalBtn = document.querySelector(".del-modal-close"), editModalCloseBtn = document.querySelector(".edit-modal-close")

deleteBtn.addEventListener("click", function (event) {
    deleteModal.classList.add("show")
})

createBtn.addEventListener("click", function (event) {
    createModal.classList.add("show")
})

editBtn.addEventListener("click", function (event) {
    editModal.classList.add("show")
})

delCloseModalBtn.addEventListener("click", function (event) {
    let modal = event.target.closest(".modal")
    modal.classList.remove("show")
})
// MODAL END //




