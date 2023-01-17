const API_LINK =
  'http://api.weatherstack.com/current?access_key=793766696db5036c18a12ef68b6e1ffe'
const root = document.getElementById('root')
const popup = document.getElementById('popup')
const textInput = document.getElementById('text-input')
const form = document.getElementById('form')
const closePopup = document.getElementById('close')
const pas = '7AF&6ThhqEG4cRr7'

let store = {
  city: 'Los Angeles',
  temperature: 0,
  observationTime: '00:00 AM',
  isDay: 'yes',
  description: '',
  properties: {
    cloudcover: {},
    humidity: {},
    windSpeed: {},
    pressure: {},
    uvIndex: {},
    visibility: {},
  },
}

const fetchData = async () => {
  try {
    root.innerHTML = loadCity()
    const query = localStorage.getItem('query') || store.city
    const result = await fetch(`${API_LINK}&query=${query}`)
    const resData = await result.json()
    const {
      current: {
        cloudcover,
        temperature,
        humidity,
        observation_time: observationTime,
        pressure,
        uv_index: uvIndex,
        visibility,
        is_day: isDay,
        weather_descriptions: description,
        wind_speed: windSpeed,
      },
      location: { name },
    } = resData
    store = {
      ...store,
      isDay,
      temperature,
      city: name,
      observationTime,
      description: description[0],
      properties: {
        cloudcover: {
          title: 'cloudcover',
          value: `${cloudcover}%`,
          icon: 'gif/cloudy.gif',
        },
        humidity: {
          title: 'humidity',
          value: `${humidity}%`,
          icon: 'gif/water.gif',
        },
        windSpeed: {
          title: 'windSpeed',
          value: `${windSpeed}km/h`,
          icon: 'gif/wind.gif',
        },
        pressure: {
          title: 'pressure',
          value: `${pressure}psi`,
          icon: 'gif/pressure.gif',
        },

        uvIndex: {
          title: 'uvIndex',
          value: `${uvIndex}un`,
          icon: 'gif/map.gif',
        },
        visibility: {
          title: 'visibility',
          value: `${visibility}km/h`,
          icon: 'gif/eyes.gif',
        },
      },
    }
    renderComponent()
  } catch (err) {
    console.log(err)
  }
}

const getImage = (description) => {
  const value = description.toLowerCase()

  switch (value) {
    case 'overcast':
      return 'partly.png'
      break
    case 'partly cloudy':
      return 'partly.png'
      break
    case 'cloud':
      return 'cloud.png'
      break
    case 'fog':
      return 'fog.png'
      break
    case 'sunny':
      return 'sunny.png'
      break
    case 'light snow, mist':
      return 'snow.png'
      break
    case 'rain shower':
      return 'rain.png'
      break
    default:
      return 'partly.png'
  }
}

const renderProperty = (properties) => {
  return Object.values(properties)
    .map(({ title, value, icon }) => {
      return `<div class="property">
    <div class="property-icon">
      <img src="./img/${icon}" alt="">
    </div>
    <div class="property-info" >
      <div class="property-info__value">${value}</div>
      <div class="property-info__description">${title}</div>
    </div>
  </div>`
    })
    .join('')
}
const markup = () => {
  const { city, description, observationTime, temperature, isDay, properties } =
    store
  console.log(renderProperty(properties))
  const containerClass = isDay === 'yes' ? 'is-day' : ''
  return `<div class="container ${containerClass}">
    <div class="top">
			<div class="city">
				<div class="city-subtitle">Weather Today in </div>
				<div class="city-title" id="city">
				<span>${city}</span>
			</div>
		</div>
		<div class="city-info">
				<div class="top-left">
				<img class="icon" src="./img/${getImage(description)}" alt="" />
				<div class="description">${description}</div>
			</div>
			<div class="top-right">
				<div class="city-info__subtitle"> as of ${observationTime} </div>
				<div class="city-info__title">${temperature}°C</div>
			</div>
		</div>
	</div>
		<div id="properties">${renderProperty(properties)}</div>
	</div>	
`
}
const loadCity = () => {
  return `      
  <div id="root">
    <img class="loader" src="./img/loader.gif" alt="loader" />
  </div>`
}
const togglePopupClass = () => {
  popup.classList.toggle('active')
}
const renderComponent = () => {
  root.innerHTML = markup()
  const city = document.getElementById('city')

  city.addEventListener('click', togglePopupClass)
}
const handleClick = () => {
  popup.classList.toggle('active')
}
const handleInput = (e) => {
  store = {
    ...store,
    city: e.target.value,
  }
}

const handleSubmit = (e) => {
  e.preventDefault()
  const value = store.city
  if (!value) return null
  localStorage.setItem('query', value)
  togglePopupClass()
  fetchData()
}
const closePopupMenu = () => {
  togglePopupClass()
}
form.addEventListener('submit', handleSubmit)
textInput.addEventListener('input', handleInput)
closePopup.addEventListener('click', closePopupMenu)
fetchData()
