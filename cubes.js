function Cubes() {
  this.name = "cubes";

  this.numBoxes = 900;
  this.cols = 40;
  this.rows = ceil(this.numBoxes / this.cols);
  this.boxSize = width*0.8 / this.cols;

  this.draw = function () {
    push();
    var spectrum = fourier.analyze();
    //smooth();

    // translate(this.cols * this.boxSize, this.rows * this.boxSize, 0);
    translate(
      width / 2 - (this.cols * this.boxSize) / 2, //x position
      300, //y position
      -250 //z position
    );

    // Draws the grid of boxes
    rotateX(PI / 3);
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let i = x + y * this.cols;
        let val = spectrum[i];
        push();
        translate(x * this.boxSize, y * this.boxSize, val / 2);
        // noFill();
        fill(0);
        stroke(val, 0, 255 - val);
        box(this.boxSize, this.boxSize, val);
        pop();
      }
    }
    pop();
  };
}
