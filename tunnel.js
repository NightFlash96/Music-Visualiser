function Tunnel() {
  this.name = "tunnel ";

  let queue = [];
  let framecount = 0;
  let level;

  smooth(); //anti-aliasing, necesary for this visualiser to look good

  class TunnelRect {
    //creates a slice of land class
    constructor() {
      this.spectrum = fourier.analyze(); //creates the frequency spectrum of the instant the object is created
      this.zpos = -5500; //initial z position of the slice
    }

    update() {
      this.zpos += level * 1000; //speed of the tunnel depends on the amplitude level
    }

    display() {
      push();
      //stroke colour changes depending on how far the rectangle is from the camera
      stroke(
        map(sin(millis() / 5000), -1, 1, 0, 255),
        map(cos(millis() / 5000), -1, 1, 0, 128),
        map(cos(millis() / 5000), -1, 1, 0, 255)
      );
      strokeWeight(thickSlider.value()); //thickness slider
      noFill();
      translate(
        -this.zpos * (this.zpos / 8000) * sin(millis() / 5000), //moves the rectangle left and right using a sine wave and exponential function to imitate a curve of the tunnel
        (this.zpos * cos(millis() / 5000)) / 2, //moves the rectangle up and down
        this.zpos //moves the rectangle towards the camera
      );
      rect(0, 0, width, height);
      pop();
    }

    isDone() {
      return this.zpos >= 0;
    }
  }

  this.draw = function () {
    push();

    level = amplitude.getLevel(); //returns an amplitude reading at the moment it is called

    //adds a new rectangle to the queue frequently depending space slider value
    framecount++;
    if (framecount % spaceSlider.value() == 0 && level > 0) {
      queue.push(new TunnelRect());
    }

    for (let i = queue.length - 1; i >= 0; i--) {
      queue[i].update();
      queue[i].display();
      if (queue[i].isDone()) {
        queue.splice(i, 1); // remove rectangle from queue when it's done
      }
    }
    pop();
  };
}
