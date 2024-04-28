function Cubes() {
  this.name = "cubes";

  this.numBoxes = 1000;
  this.cols = 40;
  this.rows = ceil(this.numBoxes / this.cols);
  this.boxSize = 30;

  this.draw = function () {
    push();
    var spectrum = fourier.analyze();

    // push();
    // translate(width / 2, height / 2, 0);
    // noFill();
    // stroke(255);
    // sphere(2000,64,16);
    // pop();

    // translate(this.cols * this.boxSize, this.rows * this.boxSize, 0);
    translate(
      width / 2 - (this.cols * this.boxSize) / 2,
      height / 2 - (this.rows * this.boxSize) / 2,
      0
    );


    // Draws the grid of boxes
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let i = x + y * this.cols;
        let val = spectrum[i];
        push();
        translate(x * this.boxSize, y * this.boxSize, val / 2);
        // noFill();
        fill(0);
        strokeWeight(2);
        stroke(val, 0, 255 - val);
        box(this.boxSize, this.boxSize, val);
        pop();
      }
    }
    pop();
  };
}
