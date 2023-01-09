const quizData = [
  {
    question: 'How young is your friend?',
    a: '15',
    b: '24',
    c: '56',
    d: '77',
    correct: 'c',
  },
  {
    question: 'Which programming language was the most in-demand in 2020?',
    a: 'Java',
    b: 'JavaScript',
    c: 'Python',
    d: 'C#',
    correct: 'b',
  },
  {
    question: 'Who is the most famous actor in the world?',
    a: 'Dwyane Johnson',
    b: 'Chris Evans',
    c: 'Chris Hemsworth',
    d: 'Will Smith',
    correct: 'a',
  },

  {
    question: 'What does Css stand for?',
    a: 'Cascading Style Sheets',
    b: 'Casual Super Style',
    c: 'Cost So Sure',
    d: 'I don`t know how to transcript this bullshit',
    correct: 'a',
  },
  {
    question: 'Which year was JavaScript launched?',
    a: '2020',
    b: '2011',
    c: '2010',
    d: 'none of the above',
    correct: 'd',
  },
]
const questionEl = document.querySelector('#question')
const quiz = document.querySelector('#quiz')
const a_text = document.querySelector('#a_text')
const b_text = document.querySelector('#b_text')
const c_text = document.querySelector('#c_text')
const d_text = document.querySelector('#d_text')
const submitBtn = document.querySelector('#submit')
const answersEls = document.querySelectorAll('.answer')
let score = 0
let currentQuiz = 0
loadQuiz()

function getSelected() {
  let answer = undefined

  answersEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id
    }
  })
  return answer
}

function loadQuiz() {
  deselectAnswers()
  const currentQuizData = quizData[currentQuiz]
  questionEl.innerText = currentQuizData.question
  a_text.innerText = currentQuizData.a
  b_text.innerText = currentQuizData.b
  c_text.innerText = currentQuizData.c
  d_text.innerText = currentQuizData.d
}
function deselectAnswers() {
  answersEls.forEach((answersEl) => {
    answersEl.checked = false
  })
}

submitBtn.addEventListener('click', () => {
  // check to see the answer
  const answer = getSelected()

  console.log(answer)

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++
    }
    currentQuiz++
    if (currentQuiz < quizData.length) {
      loadQuiz()
    } else {
      quiz.innerHTML = `<h2> You answered correctly at ${score} / ${quizData.length} questions</h2> <button onclick="location.reload()">Reload</button>`
    }
  }

  // todo: show results
})
