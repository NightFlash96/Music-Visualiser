//constructor function to draw a
function Shapes() {
  //name of the visualisation
  this.name = "shapes";

  //frquencies used by the energyfunction to retrieve a value
  //for each plot.
  this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

  this.draw = function () {
    push();

    //create an array amplitude values from the fft.
    var spectrum = fourier.analyze();
    //iterator for selecting frequency bin.

    fill(0, 255, 0);
    for (var i = 0; i < width / 4; i++) {
      var currentBin = 2;
      var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
      var x = map(i, 0, spectrum.length, 0, width);
      var h = -height + map(energy, 0, 255, height, 0);
      // console.log(energy);
      noFill();
      stroke(spectrum[i], 255 - spectrum[i], 0);
      push();
      translate(width / 2, height / 2);
      rotateY(energy);
      sphere(h / 5);
      pop();
    }

    pop();
  };
}
