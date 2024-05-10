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

  //array for menu item spacings
  let newArr = [0, 110, 260, 420, 520, 655, 780, 905];

  //current selected song
  let selectSong;

  //marquee that will move accross the screen
  let marquee = width;

  //button names
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

  //empty buttons array
  let buttons = [];

  //creats a new button for each button name
  buttonNames.map((button, index) => {
    let currentButton = createButton(button);
    currentButton.position(width - 225, 150 + index * 50);

    //button styling
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

    //push every button onto buttons array
    buttons.push(currentButton);
  });

  //plays the selected song
  this.soundPlaying = function (songId) {
    if (songId != selectSong) {
      //dont do if selected already selected song
      selectSong = songId;
      for (let i in buttons) {
        sound[i].pause(); //pause all songs
      }
      fourier.setInput(sound[selectSong]); //set input to current song
      amplitude.setInput(sound[selectSong]); //set amplitude to current song
      amplitude.smooth(0.9);

      if (this.playbackButton.playing) {
        sound[selectSong].loop(); //play song if playbackbutton is on play
      }
    }
  };

  this.soundPlaying(0); //plays the first song on the list

  //playback play and pause button
  const playOrPause = (keycode = undefined) => {
    if (this.playbackButton.hitCheck(keycode)) {
      //checks if button or spacebar was pressed
      if (sound[selectSong].isPlaying()) {
        sound[selectSong].pause(); //pauses song if it was playing
      } else {
        sound[selectSong].loop(); //plays song if it was paused
      }
    }

    //maps song list buttons to play their song from index
    buttons.map((button, index) => {
      button.mousePressed(() => this.soundPlaying(index));
    });
  };

  //controls selected visuals
  let visNumber = 0;
  const keyboardController = (keycode) => {
    {
      if (keycode > 48 && keycode < 57) {
        visNumber = keycode - 49;
        vis.selectVisual(vis.visuals[visNumber].name); //show selected visual
        this.mainMenuDisplayed = true; //small title is displayed
      }

      if (visNumber == 0) {
        this.mainMenuDisplayed = false; //small title is not displayed on title visual
      }
    }
  };

  //skip button
  const skip = () => {
    if (this.playbackButton.hitCheckSkip()) {
      //checks if button was clicked
      if (selectSong > buttonNames.length - 2) {
        sound[selectSong].pause();
        sound[0].stop();
        this.soundPlaying(0); //if at the end of the songs list loop back to the first song
      } else {
        sound[selectSong].pause();
        sound[selectSong + 1].stop();
        this.soundPlaying(selectSong + 1); //play the next song in the list from the begining
      }
    }
  };

  //rewind button
  const rewind = () => {
    if (this.playbackButton.hitCheckRewind()) {
      //checks if button was clicked
      if (selectSong < 1) {
        sound[selectSong].pause();
        sound[buttonNames.length - 1].stop();
        this.soundPlaying(buttonNames.length - 1); //if at the start of the songs list loop forwards to the last song
      } else {
        sound[selectSong].pause();
        sound[selectSong - 1].stop();
        this.soundPlaying(selectSong - 1); //play the previous song in the list form the begining
      }
    }
  };

  //mouse presses button
  this.mousePressed = playOrPause;
  this.mousePressed1 = skip;
  this.mousePressed2 = rewind;

  //responds to keyboard presses
  //@param keycode the ascii code of the keypressed
  this.keyPressed = (keycode) => {
    playOrPause(keycode);
    keyboardController(keycode);
  };

  //main menu UI draw function
  this.draw = function () {
    //default style
    push();
    fill("white");
    stroke("black");
    strokeWeight(2);
    textSize(20);

    this.playbackButton.draw(); //playback button

    sound[selectSong].setVolume(volSlider.value()); //volume slider

    h = map(fourier.getEnergy(this.frequencyBins[0]), 0, 255, 0, 20) * 2; // maps bass

    fill("red");
    text("Show menu:", width - 150, 39); //show menu tickbox

    if (!this.menuDisplayed) {
      //do only if the show menu tickbox is ticked

      //display options
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

      //display song list
      this.songlist(h);
      for (let i in buttons) {
        buttons[i].show();
      }

      //display small title (if not in title visual)
      if (this.mainMenuDisplayed) {
        h = map(fourier.getEnergy(this.frequencyBins[2]), 0, 255, 0, 20) * 2; // maps highMid
        this.visSelect(h);

        h = map(fourier.getEnergy(this.frequencyBins[3]), 0, 255, 0, 20) * 2; // maps treble
        this.menu(h);
      }

      //marquee text for currently playing song
      text(
        "Currently Playing: " + buttonNames[selectSong],
        (marquee -= 2),
        height - 50
      );
      if (marquee < -width / 4) {
        marquee = width;
      }
    } else {
      //hides the entire menu if the show menu tickbox is not ticked
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
    pop();
  };

  //small title
  this.visSelect = function (h) {
    //hight = highMid
    for (i = 0; i < h + 1; i++) {
      push();
      textSize(40);
      fill(1 + i * 15, 50, 255); //as the title moves towards +z colour changes
      translate(i * sin(millis() / 400), i * cos(millis() / 400), i); //moves title towards +z position in a circle dependant on lowMid
      rotate(sin(millis() / 400) / 40); //rotates up and down
      text("Select a visualisation:", 25, 50); //displays title
      pop();
    }
  };

  //small visual list
  this.menu = function (h) {
    //hight = treble
    for (j = 0; j < h + 1; j++) {
      push();
      textSize(25);
      fill(255, 1 + j * 15, 1 + j * 15); //as the list moves towards +z colour changes
      translate(0, 0, j); //moves title towards +z dependant on treble
      rotate(cos(millis() / 400) / 40); //rotates up and down
      for (i = 0; i < 8; i++) {
        text(i + 1 + ":" + vis.visuals[i].name, 25 + newArr[i], 95); //draw out menu items for each visualisation
      }
      pop();
    }
  };

  //options text
  this.options = function (h) {
    for (i = 0; i < h + 1; i++) {
      //hight = bass
      push();
      textSize(25);
      fill(1 + i * 15, 50, 255); //change colour as it moves +z
      translate(i, 0, i); //move +z and +x
      rotate(cos(millis() / 400) / 40); //rotates up and down
      text("Options:", 25, 140); //displays options text
      pop();
    }
  };

  //song list text
  this.songlist = function (h) {
    for (i = 0; i < h + 1; i++) {
      //hight = bass
      push();
      textSize(25);
      fill(1 + i * 15, 50, 255); //change colour as it moves
      translate(width - 250 - i, 0, i); // moves +z and -x
      rotate(cos(millis() / 400) / 40); //rotates up and down
      text("Song list:", 25, 140); //displays song list text
      pop();
    }
  };
}
