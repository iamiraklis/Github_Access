const APIURL = "https://api.github.com/users/";


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");



getUser("iamiraklis");

async function getUser(user) {
  const resp = await fetch(APIURL + user);
  const respData = await resp.json();
  createUserCard(respData);

  const githubURL = "https://github.com/" + user

console.log(githubURL)

  getRepos(user);
}

async function getRepos(user) {
  const resp = await fetch(APIURL + user + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}



function createUserCard(user) {
  
  if(user === null) {
    alert("myProperty value is the special value `undefined`");
  }
  const cardHTML = `
  
    <div class="info-card"> 
        <div>
            <a href=${user.html_url} target="_blank"> 
            <img class="user-avatar" src="${user.avatar_url}" alt="${user.name}"/>
            </a>
            </div>
        <div class="user-info">
            <h2>${user.login}</h2>

            <ul> 
                <li>${user.public_repos} <strong>Repos </strong></li>
                <li>${user.followers} <strong>Followers </strong></li>
                <li>${user.following} <strong>Following </strong></li>
            </ul>
        
            <h4>${user.name ? user.name : ' <h4>No user name</h4>'}</h4>
            <p>${user.bio ? user.bio : ' <p class="no-bio"></p>'}</p>
            <h4> Most Liked Repos </h4>
            <div id="repos"></div>
        </div>
    </div>
`;
  main.innerHTML = cardHTML;
}



function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0,15)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
