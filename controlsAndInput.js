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

  let buttonNames = [
    "song1",
    "song2",
    "song3",
    "song4",
    "song5",
    "song6",
    "song7",
    "song8",
  ];

  let buttons = [];

  buttonNames.map((button, index) => {
    let currentButton = createButton(button);
    currentButton.position(width - 225, 155 + index * 50);
    currentButton.style(`border: none;
    padding: 10px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    background-color: black; 
    color: red; 
    border: 2px solid #f44336;`);
    currentButton.mouseOver(() =>
      currentButton.style(` background-color: #f44336;
    color: black;`)
    );
    currentButton.mouseOut(() =>
      currentButton.style(` background-color: black; 
    color: red; `)
    );
    buttons.push(currentButton);
  });

  this.soundPlaying = function (songId) {
    selectSong = songId;
    for (let i = 0; i < 8; i++) {
      sound[i].pause();
    }
    amplitude.setInput(sound[selectSong]);
    amplitude.smooth(0.6);
    if (this.playbackButton.playing) {
      sound[selectSong].loop();
    }
  };
  this.soundPlaying(0);
  // this.soundPlaying2 = function () {
  //   selectSong = 1;
  //   if (this.playing) {
  //     sound[1].loop();
  //     sound[0].pause();
  //     sound[2].pause();
  //   }
  // };
  // this.soundPlaying3 = function () {
  //   selectSong = 2;
  //   if (this.playing) {
  //     sound[2].loop();
  //     sound[1].pause();
  //     sound[0].pause();
  //   }
  // };

  const playOrPause = (keycode = undefined) => {
    if (this.playbackButton.hitCheck(keycode)) {
      if (sound[selectSong].isPlaying()) {
        sound[selectSong].pause();
      } else {
        sound[selectSong].loop();
      }
    }

    buttons.map((button, index) => {
      button.mousePressed(() => this.soundPlaying(index));
    });
  };

  const keyboardController = (keycode) => {
    {
      let visNumber = 0;
      if (keycode == 32) {
        // this.menuDisplayed = !this.menuDisplayed;
      }

      if (keycode > 48 && keycode < 58) {
        visNumber = keycode - 49;
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
    }
  };

  //play selected sound
  this.mousePressed = playOrPause;

  const keyPressedDetected = (keycode) => {};

  //responds to keyboard presses
  //@param keycode the ascii code of the keypressed
  this.keyPressed = (keycode) => {
    playOrPause(keycode);
    keyboardController(keycode);
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
