//global for the controls and input
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

function preload() {
  // sound = loadSound('assets/stomper_reggae_bit.mp3');
  // sound = loadSound('assets/aerodynamic.mp3');
  // sound = loadSound('assets/Voyager.mp3');
  // sound = loadSound('assets/nirvana.flac');
  sound = loadSound("assets/Blow Me Away.mp3");

  font = loadFont("assets/inconsolata.regular.ttf");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  background(0);
  textFont(font);
  controls = new ControlsAndInput();

  //instantiate the fft object
  fourier = new p5.FFT();

  //create a new visualisation container and add visualisations
  vis = new Visualisations();
  vis.add(new Spectrum());
  vis.add(new WavePattern());
  vis.add(new Needles());
  vis.add(new Shapes());
}

function draw() {
  background(0);
  //draw the selected visualisation
  translate(-width / 2, -height / 2);
  vis.selectedVisual.draw();
  //draw the controls on top.
  controls.draw();
}

function mouseClicked() {
  controls.mousePressed();
}

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
