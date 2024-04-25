//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {
  this.menuDisplayed = false;

  //create an array amplitude values from the fft.
  // var spectrum = fourier.analyze();

  //playback button displayed in the top left of the screen
  this.playbackButton = new PlaybackButton();

  //make the window fullscreen or revert to windowed
  this.mousePressed = function () {
    if (!this.playbackButton.hitCheck()) {
      //fullscreen(true);
      //if (fullscreen) {
      //  fullscreen(false);
      //}
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
      this.visSelect();
      this.menu();
    }
    pop();
  };

  // Calculate camera position based on angle and radius
  let camX = cam.radius * cos(cam.angle);
  let camY = cam.radius * sin(cam.angle) - cam.altitude;
  let camZ = cam.distance * sin(cam.angle) + cam.distance * 2;

  // Update camera position and look at the center of the scene
  // camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);

  for (var i = 0; i < width / 4; i++) {
    // Increment angle for rotation
    cam.angle += i;
  }

  this.visSelect = function () {
    push();
    textSize(68);
    fill(1 + i * 15, 50, 255);
    translate(camX, camY, camZ);
    text("Select a visualisation:", 25, 50);
    pop();
  };

  this.menu = function () {
    //draw out menu items for each visualisation
    for (i = 0; i < 5; i++) {
      text(i + 1 + ": " + vis.visuals[i].name, 25, 100 + i * 40);
    }
  };
}
