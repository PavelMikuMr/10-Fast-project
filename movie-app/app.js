const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='
const main = document.querySelector('main')
const form = document.querySelector('form')
const search = document.querySelector('.search')
// * initially get fav movies
getMovies(API_URL)

async function getMovies(url) {
  const resp = await fetch(url)
  const respData = await resp.json()
  showMovies(respData.results)
  console.log(respData)
}

function showMovies(movies) {
  // ! clear main

  main.innerHTML = ''

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    if (poster_path) {
      movieEl.innerHTML = `
		<img
			  src="${IMG_PATH + poster_path}"
			  alt="${title}"
			/>
			<div class="movie-info">
			  <h3>${title}</h3>
			  <span class="${getClassByRate(vote_average)}" >${vote_average}</span>
			</div>
			<div class="overview">
			<h4>Overview:</h4>
			${overview}
			</div>
		`
      main.appendChild(movieEl)
    }
  })
}

function getClassByRate(vote) {
  if (vote >= 8) return 'green'
  else if (vote >= 6) return 'orange'
  else return 'red'
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  const searchTerm = search.value
  if (searchTerm) {
    getMovies(SEARCH_API + searchTerm)

    search.value = ''
  }
})
