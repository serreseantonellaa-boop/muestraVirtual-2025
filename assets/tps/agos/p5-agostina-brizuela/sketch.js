let song; //aca guardo el audio
let fft; //analiza la frecuencia
let playing = false;

function preload() {//cargo la cancion
  song = loadSound("bts-song.mp3"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);//ocupa toda la ventana
  noStroke();//para que las figuras no tengan borde
  fft = new p5.FFT();//Inicializa el analizador de frecuencias.
  background(250); // color base del fondo
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Click o toca la pantalla para iniciar la canción", width/2, height/2);
}

function draw() {//se ejecuta muchas veces
  if (!playing) return;

  // Fondo semitransparente para que deje rastro
  background(250, 50); // el segundo valor (50) controla la opacidad del fondo, más bajo = rastro más largo

  fft.analyze();//Analiza la música en ese frame y actualiza los valores de energía por frecuencia

  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");

  // Color lilas
  fill(random(180,255), random(0,120), random(180,255), 180);

  let dominant = max(bass, mid, treble);

  // Tamaño más pequeño
  if (dominant === bass && bass > 10) {
    let size = map(bass, 0, 255, 50, 150);
    ellipse(mouseX, mouseY, size, size);
  } else if (dominant === mid && mid > 10) {
    let size = map(mid, 0, 255, 50, 150);
    rectMode(CENTER);
    rect(mouseX, mouseY, size, size);
  } else if (treble > 10) {
    let size = map(treble, 0, 255, 50, 150);
    let h = size / 2;
    triangle(
      mouseX, mouseY - h,
      mouseX - h, mouseY + h,
      mouseX + h, mouseY + h
    );
  }
}

function mousePressed() {
  if (!playing) {
    userStartAudio().then(() => {
      song.play();
      fft.setInput(song);
      playing = true;
    });
  } else {
    if (song.isPlaying()) song.pause();
    else song.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
