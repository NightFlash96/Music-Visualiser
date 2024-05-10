//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {
  this.menuDisplayed = false;
  this.mainMenuDisplayed = false;

  //playback button displayed in the top left of the screen
  this.playbackButton = new PlaybackButton();

  //frquencies used by the energyfunction to retrieve a value
  //for each plot.
  this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

  //create an array amplitude values from the fft.
  var spectrum = fourier.analyze();

  var level;

  let newArr = [0, 110, 260, 420, 520, 655, 780, 905];

  let selectSong = 0;

  let marquee = width;

  let beatDecay = 0;
  let wait = 30;

  let buttonNames = [
    "Stomper reggae",
    "Virtual Insanity",
    "Digital Love",
    "Nirvana",
    "Blow me away",
    "G.O.A.T",
    "Odyssey",
    "Custom",
  ];

  let buttons = [];

  buttonNames.map((button, index) => {
    let currentButton = createButton(button);
    currentButton.position(width - 225, 150 + index * 50);
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
    if (selectSong != songId) {
      selectSong = songId;
      for (let i in buttons) {
        sound[i].pause();
      }
      fourier.setInput(sound[selectSong]);
      amplitude.setInput(sound[selectSong]);
      amplitude.smooth(0.9);
      if (this.playbackButton.playing) {
        sound[selectSong].loop();
      }
    }
  };
  this.soundPlaying(0);

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

  let visNumber = 0;
  const keyboardController = (keycode) => {
    {
      console.log(keycode);
      if (keycode > 48 && keycode < 57) {
        visNumber = keycode - 49;
        vis.selectVisual(vis.visuals[visNumber].name);
        this.mainMenuDisplayed = true;
      }

      if (visNumber == 0) {
        this.mainMenuDisplayed = false;
      }
    }
  };

  const skip = () => {
    if (this.playbackButton.hitCheckSkip()) {
      if (selectSong > buttonNames.length - 2) {
        sound[selectSong].pause();
        selectSong = 0;
        sound[selectSong].stop();
        this.soundPlaying(selectSong);
      } else {
        sound[selectSong].pause();
        selectSong += 1;
        sound[selectSong].stop();
        this.soundPlaying(selectSong);
      }
    }
  };

  const rewind = () => {
    if (this.playbackButton.hitCheckRewind()) {
      if (selectSong < 1) {
        sound[selectSong].pause();
        selectSong = buttonNames.length - 1;
        sound[selectSong].stop();
        this.soundPlaying(selectSong);
      } else {
        sound[selectSong].pause();
        selectSong -= 1;
        sound[selectSong].stop();
        this.soundPlaying(selectSong);
      }
    }
  };

  //play selected sound
  this.mousePressed = playOrPause;
  this.mousePressed1 = skip;
  this.mousePressed2 = rewind;

  // const keyPressedDetected = (keycode) => {};

  //responds to keyboard presses
  //@param keycode the ascii code of the keypressed
  this.keyPressed = (keycode) => {
    playOrPause(keycode);
    keyboardController(keycode);
  };

  this.beatDetection = function (level) {
    if (level > beatDecay && level > 0.1) {
      beatDecay = level * 1.5;
      wait = 30;
      return true;
    } else {
      if (wait >= 0) {
        wait--;
      } else {
        beatDecay *= 0.9;
        beatDecay = max(beatDecay, 0.1);
      }
      return false;
    }
  };

  //draws the playback button and potentially the menu
  this.draw = function () {
    push();
    level = amplitude.getLevel();
    // console.log(this.beatDetection(level));
    fill("white");
    stroke("black");
    strokeWeight(2);
    textSize(20);

    //playback button
    this.playbackButton.draw();
    //only draw the menu if menu displayed is set to true.
    var currentBin = 0;
    var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
    var h = map(energy, 0, 255, 0, 20) * 2;
    fill("red");
    text("Show menu:", width - 150, 39);
    if (!this.menuDisplayed) {
      //stuff in here is displayed when the checkbox is ticked
      this.options(h);
      text("Custom song:", 25, 165);
      input.show();
      text("Mic input:", 25, 220);
      checkbox.show();
      text("Volume:", 25, 250);
      volSlider.show();
      if (visNumber == 1) {
        text("Spectrum", 25, 330);
        specSlider.show();
        hueSlider.show();
        text("Hue", 25, 290);
      } else {
        specSlider.hide();
        hueSlider.hide();
      }
      if (visNumber == 2) {
        spaceSlider.show();
        text("Spacing", 25, 330);
        hueSlider.show();
        text("Hue", 25, 290);
      } else {
        spaceSlider.hide();
        // hueSlider.hide();
      }
      if (visNumber == 3) {
        spaceSlider.show();
        text("Spacing", 25, 330);
        thickSlider.show();
        text("Thickness", 25, 290);
      } else {
        thickSlider.hide();
      }
      if (visNumber == 5) {
        thickSlider.show();
        text("Thickness", 25, 290);
      }
      if (visNumber == 6) {
        spaceSlider.show();
        text("Spacing", 25, 330);
        thickSlider.show();
        text("Thickness", 25, 290);
      }
      if (visNumber == 7) {
        thickSlider.show();
        text("Thickness", 25, 290);
      }

      this.songlist(h);
      for (let i in buttons) {
        buttons[i].show();
      }

      if (this.mainMenuDisplayed) {
        var currentBin = 2;
        var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
        var h = map(energy, 0, 255, 0, 20) * 2;
        this.visSelect(h);

        var currentBin = 3;
        var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
        var h = map(energy, 0, 255, 0, 20) * 2;
        this.menu(h);
      }
      //marquee text for currently playing song
      stroke(255);
      text(
        "Currently Playing: " + buttonNames[selectSong],
        (marquee -= 2),
        height - 50
      );
      if (marquee < -width / 4) {
        marquee = width;
      }
    } else {
      //hides all the controls when the checkbox is not ticked
      volSlider.hide();
      specSlider.hide();
      hueSlider.hide();
      spaceSlider.hide();
      thickSlider.hide();
      checkbox.hide();
      input.hide();
      for (let i in buttons) {
        buttons[i].hide();
      }
    }
    sound[selectSong].setVolume(volSlider.value());
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
      textSize(25);
      fill(255, 1 + j * 15, 1 + j * 15);
      translate(0, 0, j);
      rotate(cos(millis() / 400) / 40);
      for (i = 0; i < 8; i++) {
        text(i + 1 + ":" + vis.visuals[i].name, 25 + newArr[i], 95);
      }
      pop();
    }
  };

  this.options = function (h) {
    for (i = 0; i < h + 1; i++) {
      push();
      textSize(25);
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
      textSize(25);
      fill(1 + i * 15, 50, 255);
      translate(width - 250 - i, 0, i);
      rotate(cos(millis() / 400) / 40);
      text("Song list:", 25, 140);
      pop();
    }
  };
}
