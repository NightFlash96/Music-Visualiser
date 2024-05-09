function Spectrum2() {
  this.name = "spectrum2";

  this.draw = function () {
    var level = amplitude.getLevel();
    var spectrum = fourier.analyze();

    // rectangle variables

    var spacing = 10;
    var w = width / (prevLevels.length * spacing);

    var minHeight = 2;

    // add new level to end of array
    prevLevels.push(level);

    // remove first item in array
    prevLevels.splice(0, 1);

    // loop through all the previous levels
    for (var i = 0; i < prevLevels.length; i++) {
      var x = map(i, prevLevels.length, 0, width / 2, width);
      var h = map(prevLevels[i], 0, 0.35, minHeight, height - 10);

      var alphaValue = map(i, 0, prevLevels.length, 1, 250);

      fill(255, 255, 255, alphaValue);

      rect(x, height - h, w, h - 250);
      rect(width - x, height - h, w, h - 250);
    }
  };
}
