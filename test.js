function Test() {
  this.name = "test";

  let queue = [];
  let framecount = 0;
  let level;

  smooth();

  class LandSlice {
    constructor() {
      this.spectrum = fourier.analyze();
      // this.array1 = []; //this didn't work 
      // this.array2 = []; //it would constantly increase the size of the array
      this.zpos = -10000;
    }

    update() {
      this.zpos += level * 1000;
    }

    display() {
      push();
      stroke(map(sin(millis() / 5000), -1, 1, 0, 255), 0, map(cos(millis() / 5000), -1, 1, 0, 255), map(this.zpos, -10000, 0, 0, 255));
      strokeWeight(4);
      noFill();
      //translate(0, 0, this.zpos);
      translate((-this.zpos) * (this.zpos/8000) * sin(millis() / 5000), this.zpos * cos(millis() / 5000)/2, this.zpos);
      rect(0, 0, width, height);
      textSize(32);
      text(this.zpos, 0, 0);
      pop();
      
    }

    isDone() {
      return this.zpos >= 0;
    }
  }

  this.draw = function () {
    push();

    level = amplitude.getLevel();

    framecount++;
    if (framecount % 10 == 0) {
      queue.push(new LandSlice());
    }
    

    for (let i = queue.length - 1; i >= 0; i--) {
      queue[i].update();
      queue[i].display();
      if (queue[i].isDone()) {
        queue.splice(i, 1); // remove LandSlice from queue when it's done
      }
    }
    pop();
  };
}
