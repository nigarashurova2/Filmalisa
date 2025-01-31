window.addEventListener("load", async ()=>{
    showData() 
    renderCategoryHTML()
    
})

async function renderCategoryHTML(){
    const categorySelects = document.querySelectorAll(".category")
    let html = ``
    const categories = await getCategories()
    categories.forEach(category => {
        html += `<option value="${category.id}">${category.name}</option>`;
    });
    categorySelects.forEach(select=> select.innerHTML = html)
}

const getMovies = async ()=>{
    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"GET",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            }
        }
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/admin/movies', options)
        if(response.ok){
            let resData = await response.json();  
            return (resData.data).sort(((a, b) => new Date(b.created_at) - new Date(a.created_at)))
        }
        
    } catch (error) {
        console.log(error)
    }
}

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
            return (resData.data).sort(((a, b) => new Date(b.created_at) - new Date(a.created_at)))
        }
        
    } catch (error) {
        console.log(error)
    }
}


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

const renderMovies = (movies, categories) => {
    const tbody = document.querySelector("#moviesTable tbody");
    let html = movies.map((movie, index) => {
        const overview = movie.overview.length > 10 
            ? movie.overview.slice(0, 20).concat('...') 
            : movie.overview;

        return `<tr>
                    <td>${movie.id}</td>
                    <td>${movie.title}</td>
                    <td>
                        <div class="tooltip">${overview}
                            <span class="tooltiptext">${movie.overview}</span>
                        </div>
                    </td>
                    <td>${movie.category.name}</td>
                    <td>${movie.imdb}</td>
                    <td> 
                        <button class="edit-btn" onclick="showEditModal(${movie.id})">
                            <i class='bx bx-edit'></i>
                        </button>
                        <button class="delete-btn" onclick='showDeleteModal(${movie.id})'>
                            <i class='bx bxs-trash-alt'></i>
                        </button>
                    </td>
                </tr>`;
    }).join("");

    tbody.innerHTML = html;
};

async function showData() {
    const tbody = document.querySelector("#moviesTable tbody")
    const actors = await getActors()
    // const actorsSelect = document.querySelector("#actors")

    const movies = await getMovies()
    const categories = await getCategories()
   if(movies.length){
    renderMovies(movies, categories)
   }else{
    tbody.innerHTML = "<tr><td colspan='5'>No movies found</td></tr>";
   }



    $('#multiSelect').empty().trigger('change');

    actors.forEach(function(actor, index) {
        var newOption = new Option(actor.name, (actor.id), false, false);
        $('#multiSelect').append(newOption);
    });

    $('#multiSelect.editActor').trigger('change');

    $('#multiSelect.editActor').empty().trigger('change');

    actors.forEach(function(actor, index) {
        var newOption = new Option(actor.name, (actor.id), false, false);
        $('#multiSelect.editActor').append(newOption);
    });

    $('#multiSelect.editActor').trigger('change');

}





// CREATE DATA //
const createForm = document.querySelector("#createMovieForm")
const createMovie = async(event)=>{
    event.preventDefault()
    
    const createModal = document.querySelector("#createModal")
    const formData = new FormData(createForm);
    const actors =  $('#createMovieForm #multiSelect').val()?.map(actor=> Number(actor))
    let newData = {
        title: formData.get('title'),
        overview: formData.get('overview'),
        cover_url: formData.get('cover_url'),
        fragman: formData.get('fragman'),
        watch_url: formData.get('watch_url'),
        imdb: formData.get("imdb"),
        run_time_min: Number(formData.get("run_time_min")),
        category: Number(createForm.category.value),
        adult: createForm.adult.checked,
        actors: actors
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
        let response = await fetch('https://api.sarkhanrahimli.dev/api/filmalisa/admin/movie', options)
        if(response.ok){
            
            let resData = await response.json();
            if(resData.result){
                createModal.classList.remove("show")
                showData()
                
                Swal.fire({
                    title: 'Success',
                    text: 'Movie successfully added!',
                    icon: 'success',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 2000 
                  })
            }
          
        }
        
    } catch (error) {
        console.log(error)
    }

}
createForm.addEventListener("submit", createMovie)

createForm.cover_url.addEventListener("input", (e)=>{
   let src = e.target.value
    if(!e.target.value){
       src =  "../assets/images/noimage.png"
    }
    createForm.movie_image.src = src

})





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
        const response = await fetch(`https://api.sarkhanrahimli.dev/api/filmalisa/admin/movie/${id}`, options)
        if(response.ok){
            let deleteModal = document.querySelector("#deleteModal")
            deleteModal.classList.remove("show")
            localStorage.setItem("clickedId", null)
            showData()
           
            Swal.fire({
                title: 'Success',
                text: 'Movie successfully removed!',
                icon: 'success',
                position: 'center',
                showConfirmButton: false,
                timer: 2000 
              })
              
        }
    } catch (error) {
        console.log(error)
    }
}





// EDIT DATA //
const editForm = document.querySelector("#editMovieForm")

const showEditModal = async (id)=>{
    let editModal = document.querySelector("#editModal")
    editModal.classList.add("show")
    const movies = await getMovies()
    const movie = movies.find(item=> item.id === id)


    editForm.title.value = movie.title
    editForm.overview.value = movie.overview
    editForm.cover_url.value = movie.cover_url
    editForm.watch_url.value = movie.watch_url
    editForm.imdb.value = movie.imdb
    editForm.run_time_min.value = movie.run_time_min
    editForm.category.value = movie.category.id
    editForm.fragman.value = movie.fragman
    editForm.movie_image.src = movie.cover_url
    localStorage.setItem("clickedId", JSON.stringify(id))
}

const editMovie = async(event)=>{
    event.preventDefault()
    const editModal = document.querySelector("#editModal")
    const id = JSON.parse(localStorage.getItem("clickedId"))

    const formData = new FormData(editForm);
    let editData = {
        title: formData.get('title'),
        overview: formData.get('overview'),
        cover_url: formData.get('cover_url'),
        fragman: formData.get('fragman'),
        watch_url: formData.get('watch_url'),
        imdb: formData.get("imdb"),
        run_time_min: Number(formData.get("run_time_min")),
        category: Number(createForm.category.value),
        adult: createForm.adult.checked,
    }

    try {
        const access_token = JSON.parse(localStorage.getItem("token"))
        const options = {
            method:"PUT",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            },
            body: JSON.stringify(editData)
        }
        let response = await fetch(`https://api.sarkhanrahimli.dev/api/filmalisa/admin/movie/${id}`, options)
        if(response.ok){
            let resData = await response.json();
            if(resData.result){
                editModal.classList.remove("show")
                showData()
                Swal.fire({
                    title: 'Success',
                    text: 'Movie successfully edited!',
                    icon: 'success',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 2000 
                  })
            }
          
        }
        
    } catch (error) {
        console.log(error)
    }
}
editForm.addEventListener("submit", editMovie)



