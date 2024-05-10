function Cubes() {
  this.name = "cubes";

  this.numBoxes = 900; // Number of boxes being drawn
  this.cols = 40; // Number of columns
  this.rows = ceil(this.numBoxes / this.cols); // Number of rows is calculated based on the number of columns
  this.boxSize = (width * 0.75) / this.cols; // Size of each box depending on the width of the canvas

  this.draw = function () {
    push();
    var spectrum = fourier.analyze(); // Creates an array of amplitude values from the fft

    translate(
      width / 2 - (this.cols * this.boxSize) / 2, //x position
      175, //y position
      -350 //z position
    );

    // Draws the grid of boxes
    rotateX(PI / 3);
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let i = x + y * this.cols;
        let val = spectrum[i]; //value determines the height of the box
        push();
        translate(x * this.boxSize, y * this.boxSize, val / 2);
        fill(0);
        stroke(val, 0, 255 - val); //stroke colour changes depending on the amplitude
        strokeWeight(thickSlider.value()); //thickness slider
        box(this.boxSize, this.boxSize, val);
        pop();
      }
    }
    pop();
  };
}
