
document.getElementById('go').addEventListener('click', function(e){
  e.preventDefault()
  getCoordsFromInput()
})
const locationEl = document.getElementById('data-location')
const geo = document.getElementById('location')
const main = document.getElementById('main-display')
const tempF = document.getElementById('temp-f')
const tempC = document.getElementById('temp-c')

function getWeather(coords){
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&units=Imperial&appid=2c7d44168922ecf28cc10c960498bcd2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
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
    url = `http://api.openweathermap.org/geo/1.0/direct?q=${choice}&limit=1&appid=2c7d44168922ecf28cc10c960498bcd2`
  } else {
    url = `http://api.openweathermap.org/geo/1.0/zip?zip=${choice}&appid=2c7d44168922ecf28cc10c960498bcd2`
  }

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        if(Array.isArray(data)) {
          getWeather([data[0].lat, data[0].lon])
        } else {
          getWeather([data.lat, data.lon])
        }
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}