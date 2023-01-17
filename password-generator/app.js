const pwEl = document.getElementById('pw')
const copyEl = document.getElementById('copy')
const lenEl = document.getElementById('len')
const upperEl = document.getElementById('upper')
const lowerEl = document.getElementById('lower')
const numberEl = document.getElementById('number')
const symbolEl = document.getElementById('symbol')
const generateEl = document.getElementById('generate')
const filter = document.querySelectorAll('.filter')
const test = document.querySelector('.test')

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const symbols = '!@#$%^&*()_-+=?\\'

// * helper functions
const indexOfAll = (arr, val) =>
  arr.reduce((acc, el, i) => {
    return el === val ? [...acc, i] : acc
  }, [])

const arrayOfFunc = [
  {
    getValue: function () {
      return upperLetters[Math.floor(Math.random() * upperLetters.length)]
    },
  },
  {
    getValue: function () {
      return lowerLetters[Math.floor(Math.random() * lowerLetters.length)]
    },
  },
  {
    getValue: function () {
      return numbers[Math.floor(Math.random() * numbers.length)]
    },
  },

  {
    getValue: function () {
      return symbols[Math.floor(Math.random() * symbols.length)]
    },
  },
]
console.log(arrayOfFunc[3].getValue())
const generateFullPas = () => {
  const randomNumFunction = Math.floor(Math.random() * arrayOfFunc.length)

  return arrayOfFunc[randomNumFunction]?.getValue()
}

const generatePasWithConditions = (array) => {
  const randomNumFunction = Math.floor(Math.random() * array.length)
  console.log('array:', array, 'ri:', randomNumFunction)
  console.log('val', arrayOfFunc[randomNumFunction]?.getValue())
  return arrayOfFunc[array[randomNumFunction]]?.getValue()
}

const getFilteredValue = () => {
  const checkValue = true
  const filteredEl = [...filter]
  const filteredValue = filteredEl.map((el) => el.checked)
  const numberOfCheckedValues = indexOfAll(filteredValue, checkValue)
  //   console.log(numberOfCheckedValues.length)
  return numberOfCheckedValues
}

const generatePassword = () => {
  let password = ''
  const len = lenEl.value
  for (let i = 0; i < len; i++) {
    const filteredValue = getFilteredValue()
    let x = 0
    if (!filteredValue.length) {
      alert('Enter at least 1 character')
      return
    } else if (filteredValue.length > 3) {
      x = generateFullPas()
    } else {
      x = generatePasWithConditions(filteredValue)
    }
    password += x
  }
  pwEl.innerHTML = password
}

generateEl.addEventListener('click', generatePassword)

copyEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = pwEl.innerText

  if (!password) {
    return
  }

  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('Password copied to clipboard')
})
