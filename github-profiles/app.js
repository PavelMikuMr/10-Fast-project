const API_URL = 'https://api.github.com/users/'
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
import { emoji } from './emoji.js'

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (min + max + 1)) + min
}
console.log(randomInt(10, 1000))
const createUserCard = (user) => {
  const card = document.createElement('div')
  const { avatar_url, name, bio, followers, following, public_repos } = user

  const cardHTML = `
  <div class="card">
  	<div class="image-container"> 
        <img class="avatar" src ="${avatar_url}" alt="${name}">
  	</div>
  <div class = "user-info">
  	<h2>
  	${name}
  	</h2>
  	<p>${bio ? bio : ''}</p>
<ul class="info">
  <li>
  ${followers}
  <strong>Followers</strong>
  </li>
  <li>
  ${following}
  <strong>Following</strong>
  </li>
  <li>
  ${public_repos}
  <strong>Repos</strong>
  </li>
  </ul>
  <div class="repos" id="repos">
    <h4>Repos:</h4>
  </div>
  </div>
  </div>

  `
  main.innerHTML = cardHTML
}

const addReposToCard = (repos) => {
  const reposEl = document.getElementById('repos')
  repos.slice(0, 10).forEach((repo) => {
    const { name, html_url } = repo
    const repoData = document.createElement('div')
    const repoEl = document.createElement('a')
    const repoEmoji = document.createElement('span')

    repoData.classList.add('repo-link')
    repoEmoji.classList.add('emoji-link')
    repoEl.classList.add('repo')

    repoEmoji.innerHTML = `&#x${emoji[randomInt(1, 1000)]}`

    repoEl.href = html_url
    repoEl.target = '_blank'
    repoEl.innerText = name

    repoEl.appendChild(repoEmoji)
    repoData.appendChild(repoEl)
    reposEl.appendChild(repoData)
  })
}

const getRepos = async (user) => {
  const resp = await fetch(API_URL + user + '/repos')
  const respData = await resp.json()
  console.log(respData)
  addReposToCard(respData)
}

async function getUser(userName) {
  try {
    userName = userName.trim()
    const resp = await fetch(API_URL + userName)
    const respData = await resp.json()
    console.log(respData)
    createUserCard(respData)
    getRepos(userName)
  } catch (err) {
    console.log('error', err)
  } finally {
    console.log(`It's working!`)
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  const user = search.value
  if (user) {
    getUser(user)
    search.value = null
  }
})

getUser('PavelMikuMr')
