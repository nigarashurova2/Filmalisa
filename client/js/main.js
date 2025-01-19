// MODAL START //
let deleteBtn = document.querySelectorAll(".delete-btn")
let deleteModal = document.querySelector("#deleteModal")

let editBtn = document.querySelectorAll(".edit-btn")
let editModal = document.querySelector("#editModal")

let modalBtn = document.querySelector(".modalBtn")
let modalElement = document.querySelector("#modalElement")

const closeBtn = document.querySelectorAll(".close")

let delCloseModalBtn = document.querySelector(".del-modal-close"), editModalCloseBtn = document.querySelector(".edit-modal-close")

deleteBtn.forEach(btn=>{
    btn.addEventListener("click", function (event) {
        deleteModal.classList.add("show")
    })
})

if(modalBtn) modalBtn.addEventListener("click", function (event) {
    modalElement.classList.add("show")
})

if(editBtn.length) editBtn.forEach(btn=>{
    btn.addEventListener("click", function (event) {
        editModal.classList.add("show")
    })
})
if(delCloseModalBtn) delCloseModalBtn.addEventListener("click", function (event) {
    let modal = event.target.closest(".modal")
    console.log(modal);
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




