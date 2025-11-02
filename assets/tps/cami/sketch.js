//Defino las variables del cuadrado principal
//Variables del cuadrado
let x; //Horizontal (X)
let y; //Vertical (Y)

//Velocidad del cuadrado
let vx; //Velocidad horizontal 
let vy; //Velocidad vertical 

//Rotación del cuadrado 
let angle;       
let angularSpeed; 

//Tamaño del cuadrado
let sizeSquare = 100;


//Defino las variables de los cuadrados secundarios (arrastre)
//Para guardar las últimas posiciones y ángulos del cuadrado
let trail = [];       

//Cantidad de cuadrados 
let trailLength = 4;  


function setup() {
  //Creo el canvas del tamaño de la ventana
  createCanvas(windowWidth, windowHeight);

  background(30);

  //Defino la posición inicial del cuadrado
  x = width / 2;  
  y = height / 2; 

  //Defino la velocidad
  vx = 5; 
  vy = 4;
  
  //Defino la velocidad de rotación
  angle = 0;     
  angularSpeed = 0.05;
}


function draw() {
  
  background(30, 30, 30, 50); 

  //Actualizar la posición del cuadrado sumandole la velocidad
  x += vx;
  y += vy;

  //Detección de bordes para rebotar
  if (x - sizeSquare/2 < 0 || x + sizeSquare/2 > width) {
    vx *= -1; //Invertir velocidad horizontal
  }
  if (y - sizeSquare/2 < 0 || y + sizeSquare/2 > height) {
    vy *= -1; //Invertir velocidad vertical
  }

  //Actualizar ángulo
  angle += angularSpeed;

  //Guardo la posición y ángulo
  trail.push({x: x, y: y, a: angle}); //Agrego el estado actual
  if (trail.length > trailLength) {
    trail.shift(); //Elimino el cuadro más antiguo
  }

  //Dibujo los cuadrados del arrastre
  for (let i = 0; i < trail.length; i++) {
    let t = trail[i]; //Tomo la osición y ángulo de cada cuadrado
    push();          
    translate(t.x, t.y); //Muevo el origen al centro del cuadrado
    rotate(t.a);         //Hago la rotación según el ángulo
    
    //Se achica hacia el fondo del trail
    let size = sizeSquare - (trail.length - i - 1) * 20;
    
    //Color con un poco de transparencia para mostrar el arrastre
    fill(255, 165, 0, 200 - (trail.length - i - 1) * 50);
    noStroke();           
    rectMode(CENTER);     
    rect(0, 0, size, size); 
    pop();                
  }
}

//Ajusto el canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
