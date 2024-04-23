//constructor function to draw a
function Shapes2() {
  //name of the visualisation
  this.name = "shapes2";

  //frquencies used by the energyfunction to retrieve a value
  //for each plot.
  this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

  this.draw = function () {
    push();

    var currentBin = 1;
    var energy = fourier.getEnergy(this.frequencyBins[currentBin]);

    //create an array amplitude values from the fft.
    var spectrum = fourier.analyze();
    //iterator for selecting frequency bin.

    fill(0, 255, 0);
    // Calculate camera position based on angle and radius
    let camX = cam.radius * cos(cam.angle);
    let camY = cam.radius * sin(cam.angle) - cam.altitude;
    let camZ = cam.distance * sin(cam.angle) + cam.distance * 2;

    // Update camera position and look at the center of the scene
    camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);

    for (var i = 0; i < width / 4; i++) {
      // Increment angle for rotation
      cam.angle += spectrum[i] / 250000;
      fill(spectrum[i], 255 - spectrum[i], 0);
    }
    // noFill();
    stroke(0);
    sphere(200);

    // for (var i = 0; i < width / 4; i++) {
    //   // console.log(energy);
    //   noFill();
    //   stroke(spectrum[i], 255 - spectrum[i], 0);
    // }
    pop();
  };
}
