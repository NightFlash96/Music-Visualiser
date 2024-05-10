function Land() {
  this.name = "land";

  let queue = [];

  class LandSlice {
    constructor() {
      this.spectrum = fourier.analyze();
      this.wave = fourier.waveform();
      this.zpos = -1000;
    }

    update() {
      this.zpos += spaceSlider.value();
    }

    display() {
      push();
      translate(0, -100, -1000);
      noStroke();
      fill(255, 128, 0);
      ellipse(width / 2, (height * 3) / 4, 1000 + amplitude.getLevel() * 1000);
      translate(0, 0, 5);
      fill(0);
      rect(0, height * 1.23, width, height);
      for (let i = 0; i < 6; i++) {
        rect(0, height * 1.2 - i * 75, width, 75 / i);
      }
      pop();

      this.array1 = []; //resets array at the start of each display
      this.array2 = [];
      this.array3 = [];

      for (let i = 0; i < this.spectrum.length; i += 50) {
        this.array1.push(this.spectrum[i]); //creates array of every 20th element of spectrum
        //this.array3.push(this.wave[i] * 50);
      }
      this.array2 = this.array1.slice().reverse(); //creates a copy of array1 in reverse order

      for (let i = 0; i < this.array2.length; i++) {
        this.array1.push(this.array2[i]);
      }

      for (let i = 0; i < this.wave.length; i += 24) {
        this.array3.push(this.wave[i] * 50);
      }

      let bitWidth = (width + 400) / this.array1.length; //spacing between each bit (peak)

      push();
      stroke(map(this.zpos, -500, 400, 0, 255), 50, 255);
      noFill();
      strokeWeight(thickSlider.value());
      translate(0, 0, 0);
      beginShape();
      vertex(-200, height, this.zpos);

      for (var i = 1; i < this.array1.length; i++) {
        //draws the initial spectrum
        let amp = this.array1[i];
        amp += this.array3[i];

        let bitHeight = map(amp, 0, 256, height, height / 2);

        vertex(bitWidth * i - 200, bitHeight, this.zpos);
      }

      vertex(width, height, this.zpos);
      endShape(CLOSE);
      pop();
    }

    isDone() {
      return this.zpos >= 400;
    }
  }

  this.draw = function () {
    push();
    queue.push(new LandSlice());

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
