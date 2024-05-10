function Amplitude() {
  this.name = "amplitude";

  //create new array object with a length of 60
  var prevLevels = new Array(60);

  this.draw = function () {
    push();
    var spectrum = fourier.analyze(); //create an array amplitude values from the fft (for menu)
    var level = amplitude.getLevel(); //returns an amplitude reading at the moment it is called

    var w = width / (prevLevels.length * spaceSlider.value()); //width of rectangle depending on space slider value

    // add new level to end of array
    prevLevels.push(level);

    // remove first item in array
    prevLevels.splice(0, 1);

    // loop through all the previous levels
    for (var i = 0; i < prevLevels.length; i++) {
      var x = map(i, prevLevels.length, 0, width / 2, width); //maps the movement of the rectangles
      var h = map(prevLevels[i], 0, 0.35, 2, height - 10); //maps the hight of the rectangles

      var alphaValue = map(i, 0, prevLevels.length, 1, 250); //rectangles fade out

      colorMode(HSB);
      fill(hueSlider.value(), 100, 100, alphaValue); //hue slider

      rect(x, height - h, w, h - 250); //create rectangles in a line to the right
      rect(width - x, height - h, w, h - 250); //create rectangles in a line to the left
    }
    pop();
  };
}
