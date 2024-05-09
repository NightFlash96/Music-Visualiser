function Tunnel() {
  this.name = "tunnel";

  class LandSlice {
    constructor() {
      this.spectrum = fourier.analyze();
      this.array1 = [];
      this.array2 = [];
      this.zpos = 0;
    }

    update() {
      this.zpos += 1;
    }

    display() {
      noStroke();

      for (let i = 0; i < spectrum.length; i = i + 20) {
        array1.push(spectrum[i]); //creates array of every 20th element of spectrum
      }
      array2 = array1.slice().reverse(); //creates a copy of array1 in reverse order

      let bitWidth = width / this.array1.length; //spacing between each bit (peak)

      fill(255);

      beginShape();
      vertex(0, height);

      for (var i = 1; i < array1.length; i++) {
        //draws the initial spectrum
        let amp = array1[i];
        let bitHeight = map(amp, 0, 256, height, 0);
        vertex((bitWidth / 2) * i, bitHeight);
      }

      vertex(width / 2, height);

      for (var j = 1; j < array2.length; j++) {
        //draws the mirrored spectrum
        let amp = array2[j];
        let bitHeight = map(amp, 0, 256, height, 0);
        vertex(width / 2 + (bitWidth / 2) * j, bitHeight);
      }

      vertex(width, height);
      endShape(CLOSE);
    }
    isDone() {
      return this.zpos >= 100;
    }
  }

  this.draw = function () {
    push();
    colorMode(HSB);
    var spectrum = fourier.analyze();
    noStroke();

    let array1 = [];
    let array2 = [];

    // let n = slider.value();
    for (let i = 0; i < spectrum.length; i = i + 20) {
      array1.push(spectrum[i]);
      // array2.push(spectrum[spectrum.length - i]);
    }
    array2 = array1.slice().reverse();

    let bitWidth = width / array1.length;

    fill(255);

    beginShape();
    vertex(0, height);
    for (var i = 1; i < array1.length; i++) {
      let amp = array1[i];
      let bitHeight = map(amp, 0, 256, height, 0);

      vertex((bitWidth / 2) * i, bitHeight);
    }
    vertex(width / 2, height);

    for (var j = 1; j < array2.length; j++) {
      let amp = array2[j];
      let bitHeight = map(amp, 0, 256, height, 0);

      vertex(width / 2 + (bitWidth / 2) * j, bitHeight);
    }
    vertex(width, height);
    endShape(CLOSE);

    pop();
  };
}
