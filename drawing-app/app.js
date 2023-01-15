const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let isPressed = false
let size = 10
let x = 50
let y = 50
const color = 'orange'
canvas.addEventListener('mousedown', ({ offsetX, offsetY }) => {
  isPressed = true

  x = offsetX
  y = offsetY
})

canvas.addEventListener('mouseup', (e) => {
  isPressed = false

  x = undefined
  y = undefined
})

canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
  if (isPressed) {
    const x2 = offsetX
    const y2 = offsetY

    drawCircle(x2, y2)
    // drawLine(x, y, x2, y2)
    // x = x2
    // y = y2
  }
})

function drawCircle(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height)

//   drawCircle(x, y)
//   requestAnimationFrame(draw)
// }
// draw()
