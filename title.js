function Title() {
  this.name = "title";

  //frquencies used by the energyfunction to retrieve a value
  //for each plot.
  this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

  this.draw = function () {
    push();
    var spectrum = fourier.analyze(); //creates the frequency spectrum of the instant the object is created

    //default style
    fill("white");
    stroke("black");
    strokeWeight(2);
    textSize(30);

    var h = map(fourier.getEnergy(this.frequencyBins[2]), 0, 255, 0, 20) * 2; // maps highMid to h
    this.visSelect(h); //display title

    h = map(fourier.getEnergy(this.frequencyBins[3]), 0, 255, 0, 20) * 2; // maps treble to h
    this.menu(h); //display list of visualisations
    pop();
  };

  this.visSelect = function (h) {
    for (i = 0; i < h + 1; i++) {
      // hight = highMid
      push();
      textSize(60);
      fill(1 + i * 15, 50, 255); //as the title moves towards +z colour changes
      translate(i * sin(millis() / 400), i * cos(millis() / 400), i); //moves title towards +z position in a circle dependant on highMid
      rotate(sin(millis() / 400) / 40); //rotates up and down
      text("Select a visualisation:", width / 4.3, 150); //displays title
      pop();
    }
  };

  this.menu = function (h) {
    for (j = 0; j < h + 1; j++) {
      //hight = treble
      push();
      fill(255, 1 + j * 10, 1 + j * 10); //as the list moves towards +z colour changes
      translate(j, 0, j); //moves title towards +z and +x position dependant on treble
      rotate(cos(millis() / 400) / 40); //rotates up and down
      for (i = 0; i < 8; i++) {
        text(i + 1 + ": " + vis.visuals[i].name, width / 2.3, 220 + i * 35); //draw out menu items for each visualisation
      }
      pop();
    }
  };
}
