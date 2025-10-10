let sonido;
let play = false;
let amplitude;

function preload(){
  //carga recursos 
 sonido = loadSound('assets/sonidos/sonido.mp3');
}

function setup() {
  createCanvas(450, 450);
  frameRate(12); 
  sonido.play(0, 1, 1, 45, 30); //0 → arranca inmediatamente. 1 → velocidad normal. 1 → volumen completo. 45 → empieza a reproducir desde el segundo 45 del archivo. 30 → dura 30 segundos.
  amplitude = new p5.Amplitude(); //analizador de amplitud
  
}

function draw() {
  background(0);

  //nivel de volumen entre 0.0 y 1.0
  let level = amplitude.getLevel();
  let d = map(level, 0, 0.3, 20, 200); //convierte volumen en tamaño
  //map (valor, valor mínimo, valor máximo, nuevo mínimo, nuevo máximo)
  //toma el valor de level, que representa el nivel de volumen actual del sonido (obtenido con amplitude.getLevel()), y lo transforma de su rango original (de 0 a 0.3) a un nuevo rango (de 20 a 200). Esto significa que, si el volumen es bajo (level cerca de 0), el valor de d será 20; si el volumen es alto (level cerca de 0.3), d será 200. Para valores intermedios, d será proporcional dentro de ese rango.

    for (let i = 0; i < 30; i++) {  //dibuja 30 círculos
    let x = random(width);   //posición aleatoria en X
    let y = random(height);  //posición aleatoria en Y
    fill(random(255), random(255), random(255), 150);
    noStroke()
    circle(x, y, d);
  }
  push()
  textSize(15)
  fill('white')
  text('Apreta p para darle play', width/2 + 45, height - 50)
  text('Apreta s para darle stop', width/2 + 45, height - 30)
  pop()
}

function keyPressed(){
  if ((key === 'p' || key === 'P') && !play) {
    sonido.play();
    play = true;
  }
  if ((key === 's' || key === 'S') && play) {
    sonido.stop();
    play = false;
  }
}