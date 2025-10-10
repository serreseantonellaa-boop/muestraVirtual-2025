// VARIABLES
let song;          // Canción
let amp;           // Analizador de amplitud
let angle = 0;     // Ángulo para rotación de triángulos

function preload() {
  // Cargar la canción
  song = loadSound("musica.mp3");
}

function setup() {
  createCanvas(450, 450);
  noStroke();
  // Crear analizador de amplitud
  amp = new p5.Amplitude();
}

function draw() {
  background(20); // Fondo oscuro

  // Obtener nivel de volumen (0 a 1)
  let level = amp.getLevel();
  let size = map(level, 0, 0.3, 50, 300);

  // FIGURA 1: CÍRCULO PULSANTE
  fill(255, 50, 50); // Rojo
  ellipse(width / 2, height / 2, size, size);

  //  FIGURA 2: RECTÁNGULOS EN MOVIMIENTO
  fill(50, 150, 255);
  let offset = sin(frameCount * 0.05) * 200;
  rectMode(CENTER);
  rect(width / 2 + offset, height / 3, 150, 50);
  rect(width / 2 - offset, 2 * height / 3, 150, 50);

  //  FIGURA 3: TRIÁNGULOS GIRATORIOS 
  push();
  translate(width / 2, height / 2);
  rotate(angle);
  fill(255, 220, 50);
  triangle(-100, 100, 100, 100, 0, -150);
  pop();

  // Incrementar ángulo
  angle += 0.01;
  textSize(20)
  text('hace clic para empezar', width/2 - 35, height - 40)
}

function mousePressed() {
  // Clic para reproducir/pausar música
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}


