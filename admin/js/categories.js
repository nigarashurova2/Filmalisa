window.addEventListener("load", async ()=>{
    showData() 
})


const getCategories = async ()=>{
    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"GET",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            }
        }
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/admin/categories', options)
        if(response.ok){
            let resData = await response.json();  
            return (resData.data).sort(((a, b) => new Date(b.created_at) - new Date(a.created_at)))
        }
        
    } catch (error) {
        console.log(error)
    }
}



const renderCategories = (data)=>{

    const tbody = document.querySelector("#categoryTable tbody")
   let html =  data.map((category,index)=>{
    return `<tr>
                    <td>${category.id}</td>
                    <td>${category.name}</td>
                    <td> 
                        <button class="edit-btn"   onclick='showEditModal(${JSON.stringify(category)})'><i class='bx bx-edit'></i></button>
                        <button class="delete-btn" onclick="showDeleteModal(${category.id})"><i class='bx bxs-trash-alt' ></i></button>
                    </td>
            </tr>`
    }).join("")
    tbody.innerHTML = html
}


async function showData() {
    const tbody = document.querySelector("#categoryTable tbody")

    const categories = await getCategories()
   if(categories.length){
    renderCategories(categories)
   }else{
    tbody.innerHTML = "<tr><td colspan='5'>No categories found</td></tr>";
   }
}



// CREATE DATA //
const createForm = document.querySelector("#createCategoryForm")
const createCategory = async(event)=>{
    event.preventDefault()
    
    const createModal = document.querySelector("#createModal")
    const formData = new FormData(createForm);
    let newData = {
        name: formData.get('categoryName')
    }
    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"POST",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            },
            body: JSON.stringify(newData)
        }
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/admin/category', options)
        if(response.ok){
            let resData = await response.json();
            if(resData.result){
                createModal.classList.remove("show")
                showData()
                setTimeout(()=>{
                    alert("Məlumat uğurla əlavə olundu!")
                }, 500)
            }
          
        }
        
    } catch (error) {
        console.log(error)
    }

}
createForm.addEventListener("submit", createCategory)


// DELETE DATA //
const showDeleteModal = async (id)=>{
    let deleteModal = document.querySelector("#deleteModal")
    deleteModal.classList.add("show")
    localStorage.setItem("clickedId", JSON.stringify(id))
}
const delete_btn = document.querySelector(".remove-movie")
delete_btn.addEventListener("click", deleteCategory)

async function deleteCategory() {
      try {
        const id = localStorage.getItem("clickedId")
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"DELETE",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            }
        }
        const response = await fetch(`https://api.sarkhanrahimli.dev/api/filmalisa/admin/category/${id}`, options)
        if(response.ok){
            let deleteModal = document.querySelector("#deleteModal")
            deleteModal.classList.remove("show")
            localStorage.setItem("clickedId", null)
            showData()
            setTimeout(()=>{
                alert("Məlumat uğurla silindi")
            }, 500)
            
        }
    } catch (error) {
        console.log(error)
    }
}



// EDIT DATA //
const showEditModal = async (editData)=>{
    let editModal = document.querySelector("#editModal")
    let editName = document.querySelector("#editName")
    editName.value = editData.name
    editModal.classList.add("show")

    localStorage.setItem("clickedId", JSON.stringify(editData.id))
}

const editForm = document.querySelector("#editCategoryForm")
const editCategory = async(event)=>{
    event.preventDefault()
    const editModal = document.querySelector("#editModal")
    const id = JSON.parse(localStorage.getItem("clickedId"))
    const formData = new FormData(editForm);
    let newData = {
        name: formData.get('editName')
    }
    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"PUT",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            },
            body: JSON.stringify(newData)
        }
        let response = await fetch(`https://api.sarkhanrahimli.dev/api/filmalisa/admin/category/${id}`, options)
        if(response.ok){
            let resData = await response.json();
            if(resData.result){
                editModal.classList.remove("show")
                showData()
                setTimeout(()=>{
                    alert("Məlumat uğurla əlavə olundu!")
                }, 500)
            }
          
        }
        
    } catch (error) {
        console.log(error)
    }
}
editForm.addEventListener("submit", editCategory)