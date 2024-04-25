function Title() {
  this.name = "title";

  //frquencies used by the energyfunction to retrieve a value
  //for each plot.
  this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

  //draws the playback button and potentially the menu
  this.draw = function () {
    var spectrum = fourier.analyze();
    push();

    fill("white");
    stroke("black");
    strokeWeight(2);
    textSize(50);

    //only draw the menu if menu displayed is set to true.
    var currentBin = 2;
    var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
    var h = map(energy, 0, 255, 0, 20) * 2;
    this.visSelect(h);

    var currentBin = 3;
    var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
    var h = map(energy, 0, 255, 0, 20) * 2;
    this.menu(h);

    pop();
  };

  this.visSelect = function (h) {
    for (i = 0; i < h + 1; i++) {
      push();
      textSize(100);
      fill(1 + i * 15, 50, 255);
      //   fill(255 - i * 15, 50, 255);
      translate(i * sin(millis() / 400), i * cos(millis() / 400), i);
      rotate(sin(millis() / 400) / 40);
      text("Select a visualisation:", width / 4.5, 200);
      pop();
    }
  };

  this.menu = function (h) {
    //draw out menu items for each visualisation
    for (j = 0; j < h + 1; j++) {
      push();
      fill(255, 1 + j * 10, 1 + j * 10);
      //   fill(1 + j * 20, 255 - j * 20);
      translate(j, 0, j);
      rotate(cos(millis() / 400) / 40);
      for (i = 0; i < 9; i++) {
        text(i + 1 + ": " + vis.visuals[i].name, width / 2.5, 300 + i * 60);
      }
      pop();
    }
  };
}
