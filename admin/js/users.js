const getUsers = async ()=>{
    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"GET",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            }
        }
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/admin/users', options)
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
const renderUsers = (data)=>{

    const tbody = document.querySelector("#usersTable tbody")
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    let users = data.slice(start, end);

   let html =  users.map((user,index)=>{
    return ` <tr>
                         <td>${user.id}</td>
                        <td>${user.full_name}</td>
                        <td>${user.email}</td>
                        <td>${new Date(user.created_at).toLocaleDateString()}</td>
                    </tr>`
    }).join("")
    tbody.innerHTML = html

    updatePagination(data)
}

function updatePagination(users) {
    const totalPages = Math.ceil(users.length / rowsPerPage);
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


window.addEventListener("DOMContentLoaded", async ()=>{
  showData()
})



async function showData() {
    const tbody = document.querySelector("#usersTable tbody")

    const users = await getUsers()
    if(users.length){
     renderUsers(users)
    }else{
     tbody.innerHTML = "<tr><td colspan='4'>No users found</td></tr>";
    }
    
}