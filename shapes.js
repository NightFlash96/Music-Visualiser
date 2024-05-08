//constructor function to draw a
function Shapes() {
  //name of the visualisation
  this.name = "shapes";

  this.value = 0; //some value for the orbit idk bruh

  //frquencies used by the energyfunction to retrieve a value
  //for each plot.
  this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

  this.draw = function () {
    push();

    var currentBin = 0;
    var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
    var h = map(energy, 0, 255, 0, 20) * 2;

    //create an array amplitude values from the fft.
    var spectrum = fourier.analyze();
    //iterator for selecting frequency bin.

    fill(0, 255, 0);
    // Calculate camera position based on angle and radius
    let camX = cam.radius * cos(cam.angle);
    let camY = cam.radius * sin(cam.angle) - cam.altitude;
    let camZ = cam.distance * sin(cam.angle) + cam.distance * 2;

    // Update camera position and look at the center of the scene
    camera(camX, camY, camZ, 0, 0, 0, 0, 1, 1);

    for (var i = 0; i < width / 4; i++) {
      // Increment angle for rotation
      cam.angle += spectrum[i] / 250000;
      //fill(spectrum[i], 255 - spectrum[i], 0);
    }
    noFill();
    stroke(255);
    strokeWeight(1);
    sphere(200);

    //rotateX(PI / 2);
    //ellipse(0,0, 700);
    for (j = 0; j < h + 1; j++) {
      push();
      rotateX(PI / 2);
      ellipse(0, 0, 700 + j * 10, 700 + j * 10, 50);
      pop();
    }

    push();
    //translate(500*sin(millis()/1000), 0, 500*cos(millis()/1000));
    translate(
      500 * sin((this.value += spectrum[i] / 50)),
      0,
      500 * cos((this.value += spectrum[i] / 50))
    );
    sphere(50);
    pop();

    // for (var i = 0; i < width / 4; i++) {
    //   // console.log(energy);
    //   noFill();
    //   stroke(spectrum[i], 255 - spectrum[i], 0);
    // }
    pop();
  };
}
