function Shapes() {
  this.name = "shapes";

  noSmooth();

  //camera
  let cam = {
    angle: 0,
    radius: 100,
    rotationSpeed: 0.03,
    distance: 500,
    altitude: 20,
  };

  this.value = 0;

  //frquencies used by the energyfunction to retrieve a value
  //for each plot.
  this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

  this.draw = function () {
    push();
    var level = amplitude.getLevel(); //returns an amplitude reading at the moment it is called
    var currentBin = 0;
    var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
    var h = map(energy, 0, 255, 0, 20) * 2; // maps energy from bin

    //create an array amplitude values from the fft (for menu)
    var spectrum = fourier.analyze();

    fill(0, 255, 0);
    // Calculates the camera position based on angle and radius
    let camX = cam.radius * cos(cam.angle);
    let camY = cam.radius * sin(cam.angle) - cam.altitude;
    let camZ = cam.distance * sin(cam.angle) + cam.distance * 2;

    // Updates the camera position
    camera(camX, camY, camZ, 0, 0, 0, 0, 1, 1);

    // Increment angle for rotation
    cam.angle += level / 2;

    noFill();
    stroke(255);
    strokeWeight(thickSlider.value()); //thickness slider
    sphere(200); //draws the planet

    for (j = 0; j < h + 1; j++) {
      //draws the rings around the planet
      push();
      rotateX(PI / 2);
      ellipse(0, 0, 700 + j * 10, 700 + j * 10, 50);
      pop();
    }

    push();
    //translation to move moon around the planet
    translate(
      500 * sin((this.value += level / 2)),
      0,
      500 * cos((this.value += level / 2))
    );

    sphere(h + 40); //draws the moon
    pop();
    pop();
  };
}
