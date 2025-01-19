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


const renderUsers = (data)=>{

    const tbody = document.querySelector("#usersTable tbody")
   let html =  data.map((user,index)=>{
    return ` <tr>
                         <td>${user.id}</td>
                        <td>${user.full_name}</td>
                        <td>${user.email}</td>
                        <td>${new Date(user.created_at).toLocaleDateString()}</td>
                    </tr>`
    }).join("")
    tbody.innerHTML = html


}

window.addEventListener("DOMContentLoaded", async ()=>{
    const tbody = document.querySelector("#usersTable tbody")

   const users = await getUsers()
   if(users.length){
    renderUsers(users)
   }else{
    tbody.innerHTML = "<tr><td colspan='4'>No users found</td></tr>";
   }
   
})

