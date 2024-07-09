let squares = [];
let gridSize = 50; // Size of the grid
let rotationSpeed; // Common rotation speed for all squares

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  
  // Set a common rotation speed for all squares
  rotationSpeed = random(0.01, 0.03);

  initializeSquares();
}

function draw() {
  background(30); // Dark background color

  // Move and draw squares
  for (let square of squares) {
    square.update(rotationSpeed);
    square.display();
  }
}

function initializeSquares() {
  squares = [];
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      let x = i * gridSize + gridSize / 2;
      let y = j * gridSize + gridSize / 2;
      squares.push(new EscherSquare(x, y, gridSize));
    }
  }
}

class EscherSquare {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = 0;
  }

  update(rotationSpeed) {
    this.angle += rotationSpeed;
    if (this.angle > TWO_PI) {
      this.angle -= TWO_PI;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    this.drawGradientSquare(0, 0, this.size);
    pop();
  }

  drawGradientSquare(x, y, size) {
    for (let i = size; i > 0; i -= 1) {
      let inter = map(i, size, 0, 0, 1);
      let c = lerpColor(color(0, 0, 255), color(0), inter); // Blue to black gradient
      fill(c);
      rect(x, y, i, i);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeSquares();
}
