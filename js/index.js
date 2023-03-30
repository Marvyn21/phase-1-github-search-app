const form = document.querySelector("#github-form");

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", searchUser);
});

let searchUser = (e) => {
    e.preventDefault();

    const username = document.querySelector("#search").value;
    fetch(`https://api.github.com/search/users?q=${username}`)
    .then(res => res.json())
    .then(users => {renderUserDetails(users.items)})
    .catch(error => {console.log("error")});
}

let renderUserDetails = users => {
    users.forEach(user => {
        createUserCard(user)
    });
} 

// let createUserCard = user => {
//     const userCard = document.createElement("div");
//     userCard.className = "user-card";
//     document.querySelector("#user-list").appendChild(userCard);
//     userCard.innerHTML = `<img src="${user.avatar_url}">`
//                         + `<h2>${user.login}</h2>`
//                         + `<a href="${user.html_url}" target="_blank"> Go to Github Profile</a><br>`
//                         + `<button class="submit-btn">View ${user.login}'s Repos</button>`
//     userCard.querySelector(".submit-btn").addEventListener('click', () => {
//         fetchRepositories(user)
//     })
// }

let createUserCard = user => {
    const userCard = `
      <div class="user-card">
        <img src="${user.avatar_url}">
        <h2>${user.login}</h2>
        <a href="${user.html_url}" target="_blank">Go to Github Profile</a><br>
        <button class="submit-btn">View ${user.login}'s Repos</button>
      </div>
    `;
    
    document.querySelector("#user-list").insertAdjacentHTML('beforeend', userCard);
    
    document.querySelector(".submit-btn:last-child").addEventListener('click', () => {
      fetchRepositories(user)
    });
  }
  


let fetchRepositories = user => {
    fetch(`https://api.github.com/users/${user.login}/repos`)
    .then(res => res.json())
    .then(repos => {renderRepoDetails(repos)})
    .catch(error => {console.log("Some Error here")});
}

let renderRepoDetails = repos => {
    repos.forEach(repo => createRepoCard(repo))
}

let createRepoCard = repo => {
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card"
    document.querySelector("#repos-list").appendChild(repoCard);
    repoCard.innerHTML = `<h2 class="margin-none">${repo.name}</h2>`
                          + `<p class="fs14 margin-none">${repo.description ? repo.description : "No description available."}</p>`;
  }
  