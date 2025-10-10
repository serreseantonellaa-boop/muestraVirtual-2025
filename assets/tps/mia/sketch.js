let colors = ["#4C476C", "#F5AB4B", "#DA4B2E", "#2BA786", "#D7C4B2", "#797190"];
let grid = 6;
let shapes = [];


function setup() {
  createCanvas(450, 450); // canvas del tamaño de la ventana
  background("#ffe7c1");
  noStroke();

  // distribuyo figuras en la grilla
  for (let y = height / grid / 2; y < height; y += height / grid) { //recorro el eje y para ubicar las filas
    for (let x = 0; x < width; x += width / grid) { //recorro el eje x para ubicar las columnas
      let colorIndex = (x / (width / grid) + floor(y / (height / grid))) % colors.length; //calculo el índice del color basado en la posición
      let c = colors[colorIndex]; //asigno el color
      // alternar entre 3 figuras: cuadrado, círculo y triángulo
      let shapeType = (x / (width / grid) + floor(y / (height / grid))) % 3; // determino que figura dibujar
      if (shapeType === 0) {
        shapes.push(new Box(x, y, c)); // 0 es cuadrado
      } else if (shapeType === 1) {
        shapes.push(new CircleShape(x, y, c)); // 1 es círculo
      } else {
        shapes.push(new TriangleShape(x, y, c)); // 2 es triángulo
      }
    }
  }
}

function draw() {
  shapes.forEach((shape) => { // recorro todas las figuras
    shape.show(); // dibujo la figura
    shape.move && shape.move(); // si tiene método move, lo llamo
    if (shape.speed !== undefined && random(1) < 0.01) shape.speed = 1; // inicio el movimiento aleatoriamente
  });
}

// clase base para las figuras
class ShapeBase {
  constructor(x, y, color) {  // constructor común para todas las figuras
    this.start = x;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.size = min(width, height) / grid / 2;
    this.color = color;
  }
  move() { // método de movimiento común
    if (this.x < this.start + this.size) {
      this.x += this.speed;
      this.y -= this.speed;
    }
  }
}

// figura 1: cuadrado
class Box extends ShapeBase {
  show() { 
    fill("#0d0e08");
    square(this.x - 1, this.y + 1, this.size);
    fill(this.color);
    square(this.x, this.y, this.size);
  }
}

// figura 2: círculo
class CircleShape extends ShapeBase {
  show() {
    fill("#0d0e08");
    ellipse(this.x + this.size / 2 - 1, this.y + this.size / 2 + 1, this.size);
    fill(this.color);
    ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size);
  }
}

// figura 3: triángulo
class TriangleShape extends ShapeBase {
  show() {
    fill("#0d0e08");
    triangle(
      this.x - 1, this.y + this.size + 1,
      this.x + this.size / 2, this.y - 1,
      this.x + this.size + 1, this.y + this.size + 1
    );
    fill(this.color);
    triangle(
      this.x, this.y + this.size,
      this.x + this.size / 2, this.y,
      this.x + this.size, this.y + this.size
    );
  }
}
