function setup() {
  createCanvas(450, 450);
  noFill();
}

function draw() {
  background(0);

  translate(width / 2, height / 2); // centro de la pantalla

  stroke(0, 200, 255); // color neón (azul celeste)
  strokeWeight(2);

  // Dibujar varios círculos concéntricos animados
  for (let i = 0; i < 10; i++) {
    let offset = i * 40; // separación entre círculos
    let a = offset + (sin(frameCount * 0.05 + i) * 20); 
    ellipse(0, 0, a * 2, a * 2);
  }
}