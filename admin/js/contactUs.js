
window.addEventListener("load", async ()=>{
    showData() 
})

const getContacts = async ()=>{
    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"GET",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            }
        }
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/admin/contacts', options)
        if(response.ok){
            let resData = await response.json();
            return resData.data
        }
        
    } catch (error) {
        console.log(error)
    }
}

const rowsPerPage = 10;
let currentPage = 1;
const renderContacts = (data)=>{

    const tbody = document.querySelector("#contactsTable tbody")
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    let contacts = data.slice(start, end);

    let html =  contacts.map((contact,index)=>{
    const reasonData = contact.reason.length > 10 ? ((contact.reason).slice(0,20)).concat('...') : contact.reason
    return `<tr>
                         <td>${contact.id}</td>
                        <td>${contact.full_name}</td>
                        <td>${contact.email}</td>
                        <td> 
                        <div class="tooltip">${reasonData}
                         <span class="tooltiptext">${contact.reason}</span>
                        </div>
                        </td>
                        <td>
                            <button class="delete-btn" onclick='showDeleteModal(${contact.id})'><i class='bx bxs-trash-alt' ></i></button>
                        </td>
                    </tr>`
    }).join("")
    tbody.innerHTML = html

    updatePagination(data)
}

function updatePagination(actors) {
    const totalPages = Math.ceil(actors.length / rowsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";
    
    const prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => { currentPage--; showData(); };
    paginationContainer.appendChild(prevButton);
    
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.disabled = i === currentPage;
        pageButton.onclick = () => { currentPage = i; showData(); };
        paginationContainer.appendChild(pageButton);
    }
    
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => { currentPage++; showData(); };
    paginationContainer.appendChild(nextButton);
}


async function showData() {
    const tbody = document.querySelector("#contactsTable tbody")

    const contacts = await getContacts()
   if(contacts.length){
    renderContacts(contacts)
   }else{
    tbody.innerHTML = "<tr><td colspan='4'>No contacts found</td></tr>";
   }
}



// DELETE DATA //
const showDeleteModal = async (id)=>{
    let deleteModal = document.querySelector("#deleteModal")
    deleteModal.classList.add("show")
    localStorage.setItem("clickedId", JSON.stringify(id))
}
const delete_btn = document.querySelector(".remove-contact")
delete_btn.addEventListener("click", deleteContact)


async function deleteContact() {
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
      const response = await fetch(`https://api.sarkhanrahimli.dev/api/filmalisa/admin/contact/${id}`, options)
      if(response.ok){
          let deleteModal = document.querySelector("#deleteModal")
          deleteModal.classList.remove("show")
          localStorage.setItem("clickedId", null)
          showData()    
          Swal.fire({
            title: 'Success',
            text: 'Contact successfully removed!',
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

