//global for the controls and input
var controls = null;

//store visualisations in a container
var vis = null;

//variable for p5 fast fourier transform
var fourier;

var amplitude;

var mic;

//empty array to store stars
let stars = [];

//empty array to store songs
let sound = [];

//variables used to add custom songs
let soundFile;
let input;

//sliders
let specSlider;
let volSlider;
let hueSlider;
let spaceSlider;
let thickSlider;

//tickboxes
let checkbox;
let hidebox;

function preload() {
  //songs from assets
  sound1 = loadSound("assets/stomper_reggae_bit.mp3");
  sound2 = loadSound("assets/jamiroquai.mp3");
  sound3 = loadSound("assets/digital_love.mp3");
  sound4 = loadSound("assets/nirvana.mp3");
  sound5 = loadSound("assets/Blow Me Away.mp3");
  sound6 = loadSound("assets/Goat.mp3");
  sound7 = loadSound("assets/Silence.mp3");
  sound8 = loadSound("assets/odyssey.mp3");

  //loaded font since we are using 3D objects
  font = loadFont("assets/inconsolata.regular.ttf");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL); //WEBGL 3D
  canvas.position(0, 0);
  background(0);
  textFont(font);
  normalMaterial();

  //slider setup
  volSlider = createSlider(0, 1, 0.5, 0);
  volSlider.position(30, 250);

  specSlider = createSlider(1, 100, 1);
  specSlider.position(30, 330);
  specSlider.hide();

  spaceSlider = createSlider(1, 50, 20);
  spaceSlider.position(30, 330);
  spaceSlider.hide();

  hueSlider = createSlider(0, 225, 0);
  hueSlider.position(30, 290);
  hueSlider.hide();

  thickSlider = createSlider(1, 10, 1);
  thickSlider.position(30, 290);
  thickSlider.hide();

  //tickbox setup
  checkbox = createCheckbox();
  checkbox.position(130, 206);
  checkbox.changed(micCheck);

  hidebox = createCheckbox("", true);
  hidebox.position(width - 50, 25);
  hidebox.changed(hideMenu);

  //custom song input
  input = createFileInput(handleSound);
  input.position(25, 170);

  //mic connects to device microphone
  mic = new p5.AudioIn();
  mic.stop();

  //instantiate the fft object
  fourier = new p5.FFT();
  fourier.setInput(mic); //set input to mic

  //instantiate amplitude object
  amplitude = new p5.Amplitude();
  amplitude.setInput(mic); //set input to mic

  //pushes all songs onto the sound array
  sound.push(sound1);
  sound.push(sound2);
  sound.push(sound3);
  sound.push(sound4);
  sound.push(sound5);
  sound.push(sound6);
  sound.push(sound8);
  sound.push(sound7);

  //controls container
  controls = new ControlsAndInput();
  //create a new visualisation container and add visualisations
  vis = new Visualisations();
  vis.add(new Title());
  vis.add(new Spectrum());
  vis.add(new Amplitude());
  vis.add(new Land());
  vis.add(new Needles());
  vis.add(new Shapes());
  vis.add(new Tunnel());
  vis.add(new Cubes());

  //stars setup
  for (let i = 0; i < 100; i++) {
    stars.push({
      v: p5.Vector.random3D().mult(random(1200, 1500)), //random location in a sphere
      d: random(5, 20), //random size
    });
  }
}

function handleSound(file) {
  // Check the p5.File's type.
  if (file.type === "audio") {
    // Create an image using using the p5.File's data.
    soundFile = loadSound(file.data);
  } else {
    soundFile = null;
  }
}

function micCheck() {
  if (checkbox.checked()) {
    mic.start(); //if mic checkbox is ticked start mic input
  } else {
    mic.stop(); //stops mic input
  }
}

function draw() {
  background(0);

  if (soundFile) {
    // sound[7].pause();
    sound.splice(7, 1, soundFile); //splices the 7th item in songs array aka: custom song
    // sound[7].loop();
  }

  //camera control
  // //orbitControl();

  translate(-width / 2, -height / 2); //translate back to corner of screen (WEBGL)
  vis.selectedVisual.draw(); //draw the selected visualisation
  controls.draw(); //draw the controls on top

  //stars draw
  push();
  translate(width / 2, height / 2); //go to centre of screen
  stroke(255);
  for (s of stars) {
    strokeWeight(min(map(amplitude.getLevel(), 0, 0.5, 0, s.d), 25)); //map size of star with amplitude
    point(s.v.x, s.v.y, (s.v.z += amplitude.getLevel() * 150)); //place star and move it towards the camera with amplitude

    //resets star back to a random point after going off screen
    if (s.v.z > 2000) {
      s.v = p5.Vector.random3D().mult(random(1200, 1500));
      s.v.z = -2000;
    }
  }
  pop();
}

function hideMenu() {
  controls.menuDisplayed = !controls.menuDisplayed; //toggles menu display
}

//mouse clicked for playback controls
function mouseClicked() {
  controls.mousePressed();
  controls.mousePressed1();
  controls.mousePressed2();
}

//keycode for controls
function keyPressed() {
  controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit
//if the visualisation needs to be resized call its onResize method
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (vis.selectedVisual.hasOwnProperty("onResize")) {
    vis.selectedVisual.onResize();
  }
}
