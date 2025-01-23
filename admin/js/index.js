window.addEventListener("load", ()=>{
    showDashboardData()
})

async function showDashboardData() {
    const favoriteActions = document.querySelector(".stat-card #favoriteActions"),
    users = document.querySelector(".stat-card #users"),
    movies = document.querySelector(".stat-card #movies"),
    comments = document.querySelector(".stat-card #comments"),
    categories = document.querySelector(".stat-card #categories"),
    actors = document.querySelector(".stat-card #actors"),
    contacts = document.querySelector(".stat-card #contacts");

    let data = await fetchData()
    favoriteActions.innerHTML = data.favorites
    users.innerHTML = data.users;
    movies.innerHTML = data.movies;
    comments.innerHTML = data.comments;
    categories.innerHTML = data.categories;
    actors.innerHTML = data.actors;
    contacts.innerHTML = data.contacts;
}

async function fetchData() {
    try {
        const access_token = JSON.parse(localStorage.getItem("token"))

        const options = {
            method:"GET",
            headers: { 
                  "Authorization":`Bearer ${access_token}`,
                  "Content-Type":"application/json"
            }
        }
        const responseData = await fetch("https://api.sarkhanrahimli.dev/api/filmalisa/admin/dashboard", options)
        if(responseData.ok){
            const res = await responseData.json()
            return res.data
        }
    } catch (error) {
        console.log(error)
    }
}