window.addEventListener("load", async ()=>{
    showData() 
})
const getActors = async ()=>{
    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"GET",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            }
        }
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/admin/actors', options)
        if(response.ok){
            let resData = await response.json();
            return resData.data
        }
        
    } catch (error) {
        console.log(error)
    }
}


const renderActors = (data)=>{
    const tbody = document.querySelector("#actorsTable tbody")
   let html =  data.map((actor,index)=>{
    return `<tr>
                    <td>${actor.id}</td>
                    <td>${actor.name}</td>
                    <td>${actor.surname}</td>
                    <td>
                     <img src="${actor.img_url}" alt="img">
                    </td>
                    <td> 
                        <button class="edit-btn" onclick='showEditModal(${JSON.stringify(actor)})'><i class='bx bx-edit'></i></button>
                        <button class="delete-btn"  onclick='showDeleteModal(${actor.id})'><i class='bx bxs-trash-alt' ></i></button>
                    </td>
            </tr>`
    }).join("")
    tbody.innerHTML = html
}


async function showData() {
    const tbody = document.querySelector("#actorsTable tbody")

    const actors = await getActors()
   if(actors.length){
    renderActors(actors)
   }else{
    tbody.innerHTML = "<tr><td colspan='5'>No actors found</td></tr>";
   }
}




// CREATE DATA //
const createForm = document.querySelector("#createActorForm")
const createActor = async(event)=>{
    event.preventDefault()
    const createModal = document.querySelector("#createModal")
    const formData = new FormData(createForm);
    let newActor = {
        name: formData.get('name'),
        surname: formData.get('surname'),
        img_url: formData.get('img_url'),
    }

    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"POST",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            },
            body: JSON.stringify(newActor)
        }
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor', options)
        if(response.ok){
            let resData = await response.json();
            if(resData.result){
                createModal.classList.remove("show")
                showData()
                
                Swal.fire({
                    title: 'Success',
                    text: 'Actor successfully added!',
                    icon: 'success',
                    position: 'center-center',
                    showConfirmButton: false,
                    timer: 2000 
                  })
            }
          
        }
        
    } catch (error) {
        console.log(error)
    }

}
createForm.addEventListener("submit", createActor)



// DELETE DATA //
const showDeleteModal = async (id)=>{
    let deleteModal = document.querySelector("#deleteModal")
    deleteModal.classList.add("show")
    localStorage.setItem("clickedId", JSON.stringify(id))
}
const delete_btn = document.querySelector(".remove-actor")
delete_btn.addEventListener("click", deleteActor)

async function deleteActor() {
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
        const response = await fetch(`https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor/${id}`, options)
        if(response.ok){
            let deleteModal = document.querySelector("#deleteModal")
            deleteModal.classList.remove("show")
            localStorage.setItem("clickedId", null)
            showData()
        
            Swal.fire({
                title: 'Success',
                text: 'Actor successfully removed!',
                icon: 'success',
                position: 'center-center',
                showConfirmButton: false,
                timer: 2000 
              })
            
        }
    } catch (error) {
        console.log(error)
    }
}



// EDIT DATA //
const editForm = document.querySelector("#editActorForm")
const showEditModal = async (editData)=>{
    let editModal = document.querySelector("#editModal")
    editForm.name.value = editData.name
    editForm.surname.value = editData.surname
    editForm.img_url.value = editData.img_url
    document.querySelector(".actor-img").src = editData.img_url
    editModal.classList.add("show")

    localStorage.setItem("clickedId", JSON.stringify(editData.id))
}

const editActor = async(event)=>{
    event.preventDefault()
    const editModal = document.querySelector("#editModal")
    const id = JSON.parse(localStorage.getItem("clickedId"))
    const formData = new FormData(editForm);
    let newActor = {
        name: formData.get('name'),
        surname: formData.get('surname'),
        img_url: formData.get('img_url'),
    }
    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"PUT",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            },
            body: JSON.stringify(newActor)
        }
        let response = await fetch(`https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor/${id}`, options)
        if(response.ok){
            let resData = await response.json();
            if(resData.result){
                editModal.classList.remove("show")
                showData()
                Swal.fire({
                    title: 'Success',
                    text: 'Actor successfully edited!',
                    icon: 'success',
                    position: 'center-center',
                    showConfirmButton: false,
                    timer: 2000 
                  })
            }
          
        }
        
    } catch (error) {
        console.log(error)
    }
}
editForm.addEventListener("submit", editActor)


