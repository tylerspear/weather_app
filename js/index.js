const key = config.API_KEY

const locationEl = document.getElementById('data-location')
const dayEl = document.getElementById('dt-day')
const mainBG = document.getElementById('main-display')
const degEl = document.getElementById('data-degrees')
const conditionEl = document.getElementById('data-condition')
const humidityEl = document.getElementById('data-humidity')
const hlEl = document.getElementById('data-high-low')
const windEl = document.getElementById('data-wind')
const feelsEl = document.getElementById('data-feels-like')
const pressEl = document.getElementById('data-pressure')
const uvEl = document.getElementById('data-uv')
const vizEl = document.getElementById('data-viz')

getDay()

function getWeather(coords){
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&units=Imperial&appid=${key}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        degEl.innerHTML = data.current.temp + '&deg;'
        conditionEl.textContent = data.current.weather[0].main
        humidityEl.textContent = `${data.current.humidity}%`
        hlEl.textContent = `${data.daily[0].temp.min} / ${data.daily[0].temp.max}`
        windEl.textContent = `${data.current.wind_speed} mph`
        feelsEl.textContent = `${data.current.feels_like}`
        pressEl.textContent = `${data.current.pressure} mb`
        uvEl.textContent = data.current.uvi
        vizEl.textContent = `${data.current.visibility} m`
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function getCoordsFromInput() {
  const choice = document.getElementById('input').value
  document.getElementById('input').value = ''
  let url = ''

  if(isNaN(choice)){
    url = `http://api.openweathermap.org/geo/1.0/direct?q=${choice}&limit=1&appid=${key}`
  } else {
    url = `http://api.openweathermap.org/geo/1.0/zip?zip=${choice}&appid=${key}`
  }

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        if(Array.isArray(data)) {
          locationEl.textContent = data[0].name
          getWeather([data[0].lat, data[0].lon])
        } else {
          locationEl.textContent = data.name
          getWeather([data.lat, data.lon])
        }
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function getDay(){
  const day = new Date().toLocaleString('en-us', {  weekday: 'long' })
  dayEl.textContent = day
}

document.getElementById('go').addEventListener('click', function(e){
  e.preventDefault()
  getCoordsFromInput()
})