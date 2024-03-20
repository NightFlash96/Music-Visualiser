//constructor function to draw a
function Test() {
  //name of the visualisation
  this.name = "test";

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
      var currentBin = 0;
      var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
      var x = map(i, 0, spectrum.length, 0, width);
      var h = -height + map(energy, 0, 255, height, 0);
      fill(spectrum[i], 255 - spectrum[i], 0);
      rect(x, height, width / spectrum.length, h);
    }

    for (var i = 0; i < width / 4; i++) {
      var currentBin = 1;
      var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
      var x = map(i, 0, spectrum.length, 0, width);
      var h = -height + map(energy, 0, 255, height, 0);
      fill(spectrum[i], 255 - spectrum[i], 0);
      rect(x + width / 4, height, width / spectrum.length, h);
    }

    for (var i = 0; i < width / 4; i++) {
      var currentBin = 2;
      var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
      var x = map(i, 0, spectrum.length, 0, width);
      var h = -height + map(energy, 0, 255, height, 0);
      fill(spectrum[i], 255 - spectrum[i], 0);
      rect(x + (width / 4) * 2, height, width / spectrum.length, h);
    }
    for (var i = 0; i < width / 4; i++) {
      var currentBin = 3;
      var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
      var x = map(i, 0, spectrum.length, 0, width);
      var h = -height + map(energy, 0, 255, height, 0);
      fill(spectrum[i], 255 - spectrum[i], 0);
      rect(x + (width / 4) * 3, height, width / spectrum.length, h);
    }

    pop();
  };
}
