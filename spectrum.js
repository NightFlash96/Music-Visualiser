function Spectrum() {
  this.name = "spectrum";

  this.draw = function () {
    push();
    colorMode(HSB);
    var spectrum = fourier.analyze(); //creates the frequency spectrum of the instant the object is created
    noStroke();

    let newArr = []; //new empty array

    for (let i = 0; i < spectrum.length; i = i + specSlider.value()) {
      newArr.push(spectrum[i]); //skips through items in the array dependant on spectrum slider and pushes it to new array
    }

    spectrum = newArr; //spectrum becomes the new array

    let w = width / spectrum.length; //length of the array fit into width of screen

    for (var i = 0; i < spectrum.length; i++) {
      let amp = spectrum[i];
      let y = map(amp, 0, 256, height, 0); //map hight
      fill(spectrum[i] + hueSlider.value(), 100, 100); //hue slider that reacts to amplitude
      rect(i * w, y / 2, w - 10 / 50, height - y - 1); //spectrum with a mirror below
    }

    pop();
  };
}
