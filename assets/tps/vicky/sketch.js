let fuenteRegular;
let imagen1;

//paleta de colores
let colores = {
  azulOscuro: [45, 55, 85],
  azulMedio: [80, 130, 180],
  amarillo: [255, 200, 80],
  gris: [100, 100, 100],
  fondo: [250, 248, 245]
}

function preload(){
  fuenteRegular = loadFont('./assets/fonts/creato-display/CreatoDisplay-Regular.otf')
  imagen1 = loadImage('./assets/images/1-stickman-dibujados-mano.png')
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(colores.fondo[0], colores.fondo[1], colores.fondo[2]);

  dibujarTitulo()
  dibujarTriangulosYCirculos()
  dibujarComposicionCentral()
  dibujarPieDePagina()
}

function dibujarTitulo(){
  push()
  
  //stickman al lado del título
  let escalaStick = 0.12;
  let wStick = 489;
  let hStick = 602;
  image(imagen1, 100, 20, wStick * escalaStick, hStick * escalaStick);
  
  fill(colores.azulOscuro[0], colores.azulOscuro[1], colores.azulOscuro[2])
  textFont(fuenteRegular)
  textSize(36)
  textAlign(CENTER)
  text('Composición Simple', width/2 + 30, 60)
  
  pop()
}

function dibujarTriangulosYCirculos(){
  push()
  translate(30, 120)
  
  //triangulos azules
  function crearTresTriangulosAzules(ubicacionY1, ubicacionY2){
    return function tresTriangulos(){
      let medidaTriangulo = 20
      let medida0 = 0
      
      for(let i=0; i<3; i++){
        fill(colores.azulMedio[0], colores.azulMedio[1], colores.azulMedio[2])
        noStroke()
        triangle(medidaTriangulo,ubicacionY1,medidaTriangulo,ubicacionY2,medida0,ubicacionY2)
        
        medidaTriangulo+=20
        medida0+=20
      }
    }
  }
  
  const fila1 = crearTresTriangulosAzules(0, 20)
  const fila2 = crearTresTriangulosAzules(20, 40)
  const fila3 = crearTresTriangulosAzules(40, 60)
  
  fila1()
  fila2()
  fila3()

  translate(0, 120)

  fila1()
  fila2()
  fila3()

  translate(400, 100)
  
  //circulos amarillos
  function crearTresCirculosAmarillos(ubiY){
    return function circulosAmarillos(){
      let ubicacionSectionX = 80
      
      for(let i=0; i<3; i++){
        fill(colores.amarillo[0], colores.amarillo[1], colores.amarillo[2])
        noStroke()
        circle(ubicacionSectionX, ubiY, 16)
        
        ubicacionSectionX+=20
      }
    }
  }
  
  let fila1C = crearTresCirculosAmarillos(10)
  let fila2C = crearTresCirculosAmarillos(30)
  let fila3C = crearTresCirculosAmarillos(50)
  
  fila1C()
  fila2C()
  fila3C()

  translate(0, 100)

  fila1C()
  fila2C()
  fila3C()
  
  pop()
}

function dibujarComposicionCentral(){
  push()
  translate(width/2, height/2 + 20)

  dibujarCirculosConMovimiento()
  dibujarTriangulos()
  dibujarLineasHorizontales()

  pop()
}

function dibujarCirculosConMovimiento(){
  noStroke()
  
  //movimiento 
  let mov1 = sin(frameCount * 0.02) * 3
  let mov2 = cos(frameCount * 0.025) * 4
  let mov3 = sin(frameCount * 0.018) * 2
  
  //círculo grande amarillo
  fill(colores.amarillo[0], colores.amarillo[1], colores.amarillo[2])
  circle(-80 + mov1, -40 + mov2, 140)
  
  //círculo mediano azul
  fill(colores.azulMedio[0], colores.azulMedio[1], colores.azulMedio[2])
  circle(60 + mov2, -20 + mov3, 100)
  
  //círculo chico
  fill(colores.azulOscuro[0], colores.azulOscuro[1], colores.azulOscuro[2])
  circle(20 + mov3, 60 + mov1, 70)
}

function dibujarTriangulos(){
  fill(colores.azulOscuro[0], colores.azulOscuro[1], colores.azulOscuro[2])
  triangle(-150, 80, -120, 80, -135, 50)
  
  fill(colores.amarillo[0], colores.amarillo[1], colores.amarillo[2])
  triangle(120, 40, 150, 40, 135, 70)
}

function dibujarLineasHorizontales(){
  stroke(colores.azulMedio[0], colores.azulMedio[1], colores.azulMedio[2])
  strokeWeight(3)
  line(-140, -100, -40, -100)
  
  strokeWeight(2)
  line(80, 100, 150, 100)
}

function dibujarPieDePagina(){
  push()
  
  noStroke()
  fill(colores.gris[0], colores.gris[1], colores.gris[2])
  textSize(11)
  textAlign(CENTER)
  text('Tecnología Multimedial - Programación Multimedial II - Victoria Villalba', width/2, height - 25)
  
  pop()
}