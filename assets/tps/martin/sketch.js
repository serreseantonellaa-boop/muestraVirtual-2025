
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(20);
  noStroke(); // Sin borde para las estrellas

  // Dibuja estrellas
  fill(255); // Color blanco para las estrellas
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    ellipse(x, y, 2, 2);
  }

  // Luna
  fill(255, 255, 200);
  ellipse(300, 100, 80, 80);

  // Cráteres en la luna
  fill(200, 200, 150);
  ellipse(320, 90, 20, 20);
  ellipse(280, 110, 15, 15);


  // Edificios
  fill(50);
  rect(50, 200, 80, 200); 
  rect(150, 150, 100, 250);
  rect(300, 180, 70, 220);

  // Ventanas
  fill(255, 204, 0); 
  for (let y = 220; y < height; y += 40) {
    for (let x = 60; x < 120; x += 30) {
      rect(x, y, 20, 20);
    }
    for (let x = 160; x < 240; x += 30) {
      rect(x, y - 50, 20, 20);
    }
    for (let x = 310; x < 360; x += 30) {
      rect(x, y - 20, 20, 20);
    }
  }
}
