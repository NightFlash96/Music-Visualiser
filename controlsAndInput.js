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

  let newArr = [0, 110, 260, 420, 610, 750, 880, 1020, 1120];

  let selectSong = 0;

  let button1 = createButton(soundName[0]);
  button1.position(width - 225, 155 + 0 * 35);
  // button1.mousePressed(this.soundPlaying);

  let button2 = createButton(soundName[1]);
  button2.position(width - 225, 155 + 1 * 35);
  // button2.mousePressed(this.soundPlaying);

  let button3 = createButton(soundName[2]);
  button3.position(width - 225, 155 + 2 * 35);

  this.soundPlaying1 = function () {
    selectSong = 0;
    if (this.playing) {
      sound[0].loop();
      sound[1].pause();
      sound[2].pause();
    }
  };
  this.soundPlaying2 = function () {
    selectSong = 1;
    if (this.playing) {
      sound[1].loop();
      sound[0].pause();
      sound[2].pause();
    }
  };
  this.soundPlaying3 = function () {
    selectSong = 2;
    if (this.playing) {
      sound[2].loop();
      sound[1].pause();
      sound[0].pause();
    }
  };

  //play selected sound
  this.mousePressed = function () {
    if (this.playbackButton.hitCheck()) {
      if (sound[selectSong].isPlaying()) {
        sound[selectSong].pause();
      } else {
        sound[selectSong].loop();
      }
    }
    button1.mousePressed(this.soundPlaying1);
    button2.mousePressed(this.soundPlaying2);
    button3.mousePressed(this.soundPlaying3);
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

    if (vis.visuals[visNumber].name == vis.visuals[1].name) {
      slider = createSlider(1, 100);
      slider.position(30, 170);
      slider.size(100);
      let sliderVal = slider.value();
    } else {
      slider.hide();
    }
  };

  //draws the playback button and potentially the menu
  this.draw = function () {
    push();
    fill("white");
    stroke("black");
    strokeWeight(2);
    textSize(25);

    //playback button
    this.playbackButton.draw();
    //only draw the menu if menu displayed is set to true.
    var currentBin = 0;
    var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
    var h = map(energy, 0, 255, 0, 20) * 2;
    this.options(h);
    this.songlist(h);
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
      textSize(40);
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
      translate(0, 0, j);
      rotate(cos(millis() / 400) / 40);
      for (i = 0; i < 9; i++) {
        text(i + 1 + ":" + vis.visuals[i].name, 25 + newArr[i], 95);
      }
      pop();
    }
  };

  this.options = function (h) {
    for (i = 0; i < h + 1; i++) {
      push();
      fill(1 + i * 15, 50, 255);
      translate(i, 0, i);
      rotate(cos(millis() / 400) / 40);
      text("Options:", 25, 140);
      pop();
    }
  };

  this.songlist = function (h) {
    for (i = 0; i < h + 1; i++) {
      push();
      fill(1 + i * 15, 50, 255);
      translate(width - 250 - i, 0, i);
      rotate(cos(millis() / 400) / 40);
      text("Song list:", 25, 140);
      pop();
    }
  };
}
