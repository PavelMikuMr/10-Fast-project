const mealsEl = document.getElementById('meals')
const favoriteContainer = document.getElementById('fav-meals')
console.log(favoriteContainer)

getRandomMeal()
fetchFavMeals()

async function getRandomMeal() {
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  const respData = await resp.json()
  const randomMeal = respData.meals[0]

  addMeal(randomMeal, true)
}

async function getMealById(id) {
  const resp = await fetch(
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
  )
  const respData = await resp.json()
  const meal = respData.meals[0]

  return meal
}

async function getMealsBySearch(term) {
  const meals = await fetch(
    'www.themealdb.com/api/json/v1/1/search.php?s=' + term
  )
}

function addMeal(mealData, random = false) {
  // we're going to get a random data here
  const meal = document.createElement('div')
  meal.classList.add('meal')

  meal.innerHTML = `
  <div class="meal-header">
    ${random ? ` <span class="random">Recipe of the day</span>` : ''}
            <span class="random">Recipe of the day</span>
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            />
          </div>
          <div class="meal-body fxc">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn fxc">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star active" id="favorite"></i>
            </button>
          </div>
  `

  const btn = meal.querySelector('#favorite')

  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
      removeMealLS(mealData.idMeal)
      btn.classList.remove('active')
    } else {
      addMealLS(mealData.idMeal)
      btn.classList.add('active')
    }
    // clean the container

    fetchFavMeals()
  })
  mealsEl.appendChild(meal)
}

function addMealLS(mealId) {
  const mealIds = getMealsLS()
  localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS()
  localStorage.setItem(
    'mealIds',
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  )
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem('mealIds'))
  return mealIds === null ? [] : mealIds
}
async function fetchFavMeals() {
  // clean the container
  favoriteContainer.innerHTML = ''

  const mealIds = getMealsLS()

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i]
    meal = await getMealById(mealId)
    addMealFav(meal)
  }
}

function addMealFav(mealData) {
  // clean the container

  const favMeal = document.createElement('li')
  favMeal.innerHTML = `
      <img
          src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
            />
            <span>${mealData.strMeal}</span>
            <button class = "clear" >
         <i class="fa-sharp fa-solid fa-square-xmark"></i>
            </button>

  `
  const btn = favMeal.querySelector('.clear')
  btn.addEventListener('click', () => {
    removeMealLS(mealData.idMeal)
    fetchFavMeals()
  })

  favoriteContainer.appendChild(favMeal)
}
