let centerX,
  centerY,
  particles = []

function setup() {
  createCanvas(400, 400)
  centerX = width / 2
  centerY = height / 2
  angleMode(DEGREES)
}

function draw() {
  background(10, 10, 30, 100)

  let hr = hour(),
    mn = minute(),
    sc = second()

  noFill();
  stroke(255, 50)
  strokeWeight(2)

  translate(centerX, centerY)

  ellipse(0, 0, 300, 300)
  ellipse(0, 0, 200, 200)
  ellipse(0, 0, 100, 100)

  drawOrbitingParticle(sc, 150, color(0, 200, 255), 2)
  drawOrbitingParticle(mn, 100, color(0, 255, 100), 4)
  drawOrbitingParticle(hr % 12 * 5, 50, color(255, 100, 150), 6)

  drawClockText(hr, mn, sc)
}

function drawOrbitingParticle(unit, radius, col, size) {
  let angle = map(unit, 0, 60, 0, 360) - 90,
    x = cos(angle) * radius,
    y = sin(angle) * radius

  fill(col)
  noStroke()
  ellipse(x, y, size, size)


  fill(col.levels[0], col.levels[1], col.levels[2], 50)
  for (let i = 1; i < 10; i++) {
    let pastAngle = map(unit - i, 0, 60, 0, 360) - 90,
      px = cos(pastAngle) * radius,
      py = sin(pastAngle) * radius
    ellipse(px, py, size - i * 0.3, size - i * 0.3)
  }
}

function drawClockText(hr, mn, sc) {
  resetMatrix()
  textAlign(CENTER, CENTER)
  textSize(32)
  fill(255)
  text(nf(hr, 2) + ':' + nf(mn, 2) + ':' + nf(sc, 2), width / 2, height - 40)
}
