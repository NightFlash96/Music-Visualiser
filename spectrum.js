function Spectrum() {
  this.name = "spectrum";

  this.draw = function () {
    push();
    colorMode(HSB);
    var spectrum = fourier.analyze();
    noStroke();

    let newArr = [];

    // let n = slider.value();
    for (let i = 0; i < spectrum.length; i = i + slider.value()) {
      newArr.push(spectrum[i]);
    }

    // console.log(spectrum.length);
    spectrum = newArr;
    let w = width / spectrum.length;

    fill(0, 255, 0);

    for (var i = 0; i < spectrum.length; i++) {
      // var x = map(i, 0, spectrum.length, 0, width);
      // var h = -height + map(spectrum[i], 0, 255, height, 0);
      // rect(x, height, width / spectrum.length, h);
      let amp = spectrum[i];
      let y = map(amp, 0, 256, height, 0);

      // var y = map(i * 2.5, 0, spectrum.length, 0, height);
      // var w = map(spectrum[i], 0, 255, 0, width);
      fill(spectrum[i], 100, 100);
      rect(i * w, y / 2, w - 10 / 50, height - y - 1);
    }

    pop();
  };
}
