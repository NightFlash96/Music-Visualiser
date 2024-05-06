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
let soundName = [];

let slider;
let volSlider;

function preload() {
  sound1 = loadSound("assets/stomper_reggae_bit.mp3");
  sound2 = loadSound("assets/aerodynamic.mp3");
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

  volSlider = createSlider(0, 10, 5, 0);
  volSlider.position(30, 170);

  slider = createSlider(1, 100);
  slider.position(30, 200);
  slider.hide();

  //instantiate the fft object
  fourier = new p5.FFT();

  mic = new p5.AudioIn();
  mic.start();

  sound.push(sound1);
  sound.push(sound2);
  sound.push(sound3);
  sound.push(sound4);
  sound.push(sound5);
  sound.push(sound6);
  sound.push(sound7);
  sound.push(sound8);

  amplitude = new p5.Amplitude();

  soundName.push("sound1");
  soundName.push("sound2");
  soundName.push("sound3");
  soundName.push("sound4");
  soundName.push("sound5");
  soundName.push("sound6");
  soundName.push("sound7");
  soundName.push("sound8");

  //create a new visualisation container and add visualisations
  controls = new ControlsAndInput();
  vis = new Visualisations();
  vis.add(new Title());
  vis.add(new Spectrum());
  vis.add(new Spectrum2());
  vis.add(new WavePattern());
  vis.add(new Needles());
  vis.add(new Shapes());
  vis.add(new Shapes2());
  vis.add(new Test());
  vis.add(new Cubes());

  for (let i = 0; i < 100; i++) {
    stars.push({
      v: p5.Vector.random3D().mult(random(1200, 1500)),
      d: random(10, 15),
    });
  }
}

function draw() {
  background(0);

  //camera controll
  // orbitControl();

  //draw the selected visualisation
  translate(-width / 2, -height / 2);
  vis.selectedVisual.draw();
  //draw the controls on top.
  controls.draw();

  push();
  translate(width / 2, height / 2);
  stroke(255);
  for (s of stars) {
    strokeWeight(map(amplitude.getLevel(), 0, 0.2, 0, s.d));
    point(s.v.x, s.v.y, (s.v.z += amplitude.getLevel() * 500));
    if (s.v.z > 2000) {
      s.v = p5.Vector.random3D().mult(random(1200, 1500));
      s.v.z = -2000;
    }
    // console.log(amplitude.getLevel());
  }
  pop();
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
