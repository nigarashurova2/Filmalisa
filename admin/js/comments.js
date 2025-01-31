window.addEventListener("load", async ()=>{
    showData() 
})


const getComments = async ()=>{
    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"GET",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            }
        }
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/admin/comments', options)
        if(response.ok){
            let resData = await response.json();  
            return (resData.data).sort(((a, b) => new Date(b.created_at) - new Date(a.created_at)))
        }
        
    } catch (error) {
        console.log(error)
    }
}

const rowsPerPage = 10;
let currentPage = 1;
const renderComments = (data)=>{
    const tbody = document.querySelector("#commentsTable tbody")

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    let comments = data.slice(start, end);

   let html =  comments.map((comment,index)=>{
    return `<tr>
                <td>${comment.id}</td>
                <td>${comment.comment}</td>
                <td>${comment.movie.title}</td>
                <td>
                  <img src="${comment.movie.cover_url}" alt="img">
                <td> 
                    <button class="delete-btn" onclick="showDeleteModal(${comment.id})"><i class='bx bxs-trash-alt' ></i></button>
                </td>
            </tr>`
    }).join("")
    tbody.innerHTML = html
    updatePagination(data)
}

function updatePagination(comments) {
    const totalPages = Math.ceil(comments.length / rowsPerPage);
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
    const tbody = document.querySelector("#commentsTable tbody")

    const comments = await getComments()
   if(comments.length){
    renderComments(comments)
   }else{
    tbody.innerHTML = "<tr><td colspan='5'>No comments found</td></tr>";
   }
}



// DELETE DATA //
const showDeleteModal = async (id)=>{
    let deleteModal = document.querySelector("#deleteModal")
    deleteModal.classList.add("show")
    localStorage.setItem("clickedId", JSON.stringify(id))
}
const delete_btn = document.querySelector(".remove-comment")
delete_btn.addEventListener("click", deleteComment)

async function deleteComment() {
      try {
        const id = localStorage.getItem("clickedId")
        let comments = await getComments()
        const movieId = comments.find(comment=> comment.id == id).movie.id
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"DELETE",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            }
        }
        const response = await fetch(`https://api.sarkhanrahimli.dev/api/filmalisa/admin/movies/${movieId}/comment/${id}`, options)
        if(response.ok){
            let deleteModal = document.querySelector("#deleteModal")
            deleteModal.classList.remove("show")
            localStorage.setItem("clickedId", null)
            showData()
           
            Swal.fire({
                title: 'Success',
                text: 'Comment successfully removed!',
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
