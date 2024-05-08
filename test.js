function Test() {
  this.name = "test";

  this.draw = function () {
    push();
    colorMode(HSB);
    var spectrum = fourier.analyze();
    noStroke();

    let array1 = [];
    let array2 = [];

    // let n = slider.value();
    for (let i = 0; i < spectrum.length; i = i + 1) {
      array1.push(spectrum[i]);
      array2.push(spectrum[spectrum.length - i]);
    }
    console.log(array1);
    console.log(array2);
    // console.log(spectrum.length);
    
    let bitWidth = width / array1.length;

    fill(255);

    beginShape();
    vertex(0, height);
    for (var i = 1; i < array1.length; i++) {
     
      let amp = array1[i];
      let bitHeight = map(amp, 0, 256, height, 0);

      vertex(bitWidth*i, bitHeight);
    }
    vertex(width/2, height);
    // endShape();

    // beginShape();
    // vertex(width/2, height);
    for (var j = 1; j < array2.length; j++) {
     
      let amp = array2[j];
      let bitHeight = map(amp, 0, 256, height, 0);

      vertex(bitWidth*j, bitHeight);
    }
    vertex(width, height);
    endShape(CLOSE);

    pop();
  };
}
