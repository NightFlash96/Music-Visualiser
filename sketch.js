//global for the controls and input
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
// var sound = null;
//variable for p5 fast fourier transform
var fourier;
//camera
let cam = {
  angle: 0,
  radius: 100,
  rotationSpeed: 0.03,
  distance: 500,
  altitude: 20,
};

var mic;
var amplitude;
var prevLevels = new Array(60);

let stars = [];

let sound = [];
let soundFile;
let input;

let specSlider;
let volSlider;

let checkbox;

let hidebox;

function preload() {
  sound1 = loadSound("assets/stomper_reggae_bit.mp3");
  sound2 = loadSound("assets/jamiroquai.mp3");
  sound3 = loadSound("assets/Voyager.mp3");
  sound4 = loadSound("assets/nirvana.flac");
  sound5 = loadSound("assets/Blow Me Away.mp3");
  sound6 = loadSound("assets/Goat.mp3");
  sound7 = loadSound("assets/dial_up.mp3");
  sound8 = loadSound("assets/odyssey.mp3");

  font = loadFont("assets/inconsolata.regular.ttf");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  background(0);
  textFont(font);
  normalMaterial();

  volSlider = createSlider(0, 1, 0.5, 0);
  volSlider.position(30, 250);

  specSlider = createSlider(1, 100, 1);
  specSlider.position(30, 290);
  specSlider.hide();

  checkbox = createCheckbox();
  checkbox.position(130, 206);
  checkbox.changed(micCheck);

  hidebox = createCheckbox("", true);
  hidebox.position(width - 50, 25);
  hidebox.changed(hideMenu);

  input = createFileInput(handleSound);
  input.position(25, 170);

  mic = new p5.AudioIn();
  mic.stop();

  //instantiate the fft object
  fourier = new p5.FFT();
  fourier.setInput(mic);

  sound.push(sound1);
  sound.push(sound2);
  sound.push(sound3);
  sound.push(sound4);
  sound.push(sound5);
  sound.push(sound6);
  sound.push(sound8);
  sound.push(sound7);

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);

  //create a new visualisation container and add visualisations
  controls = new ControlsAndInput();
  vis = new Visualisations();
  vis.add(new Title());
  vis.add(new Spectrum());
  vis.add(new Amplitude());
  vis.add(new Land());
  vis.add(new Needles());
  vis.add(new Shapes());
  vis.add(new Tunnel());
  vis.add(new Cubes());

  for (let i = 0; i < 100; i++) {
    stars.push({
      v: p5.Vector.random3D().mult(random(1200, 1500)),
      d: random(5, 20),
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
    mic.start();
  } else {
    mic.stop();
  }
}
function draw() {
  background(0);

  if (soundFile) {
    // sound[7].pause();
    sound.splice(7, 1, soundFile);
    // sound[7].loop();
  }

  //camera controll
  orbitControl();

  //draw the selected visualisation
  translate(-width / 2, -height / 2);
  vis.selectedVisual.draw();
  //draw the controls on top.
  controls.draw();

  push();
  translate(width / 2, height / 2);
  stroke(255);
  for (s of stars) {
    strokeWeight(min(map(amplitude.getLevel(), 0, 0.5, 0, s.d), 25));
    point(s.v.x, s.v.y, (s.v.z += amplitude.getLevel() * 150));
    if (s.v.z > 2000) {
      s.v = p5.Vector.random3D().mult(random(1200, 1500));
      s.v.z = -2000;
    }
    // console.log(amplitude.getLevel());
  }
  pop();
}
function hideMenu() {
  controls.menuDisplayed = !controls.menuDisplayed;
}

function mouseClicked() {
  controls.mousePressed();
  controls.mousePressed1();
  controls.mousePressed2();
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
