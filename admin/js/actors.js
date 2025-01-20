
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


const deleteActor = async (id)=>{

    try {
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
            showData()
            setTimeout(()=>{
                alert("Məlumat uğurla silindi")
            }, 500)
            
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
                        <button class="edit-btn"><i class='bx bx-edit'></i></button>
                        <button class="delete-btn"  onclick="deleteActor(${actor.id})"><i class='bx bxs-trash-alt' ></i></button>
                    </td>
            </tr>`
    }).join("")
    tbody.innerHTML = html
}

window.addEventListener("load", async ()=>{
    showData() 
})

async function showData() {
    const tbody = document.querySelector("#actorsTable tbody")

    const actors = await getActors()
   if(actors.length){
    renderActors(actors)
   }else{
    tbody.innerHTML = "<tr><td colspan='5'>No actors found</td></tr>";
   }
}





const createForm = document.querySelector("#createMovieForm")
const createActor = async(event)=>{
    event.preventDefault()
    const createForm = document.querySelector("#createMovieForm")
    const createModal = document.querySelector("#createModal")
    const formData = new FormData(createForm);
    let newActor = {
        name: formData.get('name'),
        surname: formData.get('surname'),
        img_url: formData.get('img_url'),
        //id: Date.now()
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
                setTimeout(()=>{
                    alert("Məlumat uğurla əlavə olundu!")
                }, 500)
            }
          
        }
        
    } catch (error) {
        console.log(error)
    }

}
createForm.addEventListener("submit", createActor)
