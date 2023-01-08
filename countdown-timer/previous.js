const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minsEl = document.getElementById('mins')
const secondsEl = document.getElementById('seconds')
console.log(daysEl.innerHTML, hoursEl.innerHTML)

const newYears = ' 1 February, 2023 00:00:00'

function countDown() {
  const newYearsData = new Date(newYears)
  const currentDate = new Date()
  //ms to seconds
  const totalSeconds = (newYearsData - currentDate) / 1000
  const days = Math.floor(totalSeconds / 3600 / 24)
  const hours = Math.floor(totalSeconds / 3600) % 24
  const minutes = Math.floor(totalSeconds / 60) % 60
  const seconds = Math.floor(totalSeconds % 60)
  daysEl.innerHTML = days
  hoursEl.innerHTML = hours
  minsEl.innerHTML = formatTime(minutes)
  secondsEl.innerHTML = formatTime(seconds)
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time
}
// initial call
countDown()

setInterval(countDown, 1000)
