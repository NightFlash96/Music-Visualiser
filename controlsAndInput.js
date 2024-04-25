//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {
  this.menuDisplayed = false;

  //playback button displayed in the top left of the screen
  this.playbackButton = new PlaybackButton();

  //frquencies used by the energyfunction to retrieve a value
  //for each plot.
  this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

  //create an array amplitude values from the fft.
  var spectrum = fourier.analyze();

  //make the window fullscreen or revert to windowed
  this.mousePressed = function () {
    if (!this.playbackButton.hitCheck()) {
      x;
    }
    //check if the playback button has been clicked
    //if not make the visualisation fullscreen
  };

  //responds to keyboard presses
  //@param keycode the ascii code of the keypressed
  this.keyPressed = function (keycode) {
    console.log(keycode);
    if (keycode == 32) {
      this.menuDisplayed = !this.menuDisplayed;
    }

    if (keycode > 48 && keycode < 58) {
      var visNumber = keycode - 49;
      vis.selectVisual(vis.visuals[visNumber].name);
      this.menuDisplayed = true;
    }

    if (keycode == 49) {
      this.menuDisplayed = !this.menuDisplayed;
    }
  };

  //draws the playback button and potentially the menu
  this.draw = function () {
    push();
    fill("white");
    stroke("black");
    strokeWeight(2);
    textSize(34);

    //playback button
    this.playbackButton.draw();
    //only draw the menu if menu displayed is set to true.
    if (this.menuDisplayed) {
      var currentBin = 2;
      var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
      var h = map(energy, 0, 255, 0, 20) * 2;
      this.visSelect(h);

      var currentBin = 3;
      var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
      var h = map(energy, 0, 255, 0, 20) * 2;
      this.menu(h);
    }
    pop();
  };

  this.visSelect = function (h) {
    for (i = 0; i < h + 1; i++) {
      push();
      textSize(68);
      fill(1 + i * 15, 50, 255);
      translate(i * sin(millis() / 400), i * cos(millis() / 400), i);
      rotate(sin(millis() / 400) / 40);
      text("Select a visualisation:", 25, 50);
      pop();
    }
  };

  this.menu = function (h) {
    //draw out menu items for each visualisation

    for (j = 0; j < h + 1; j++) {
      push();
      fill(255, 1 + j * 15, 1 + j * 15);
      translate(j, 0, j);
      rotate(cos(millis() / 400) / 40);
      for (i = 0; i < 9; i++) {
        text(i + 1 + ": " + vis.visuals[i].name, 25, 100 + i * 40);
      }
      pop();
    }
  };
}
