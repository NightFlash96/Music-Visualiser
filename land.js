function Land() {
  this.name = "test";

  let queue = [];

  class LandSlice {
    constructor() {
      this.spectrum = fourier.analyze();
      // this.array1 = []; //this didn't work
      // this.array2 = []; //it would constantly increase the size of the array
      this.zpos = -500;
    }

    update() {
      this.zpos += 10;
    }

    display() {
      push();
      translate(0, 0, -500);
      noStroke();
      fill(255, 128, 0);
      ellipse(width / 2, (height * 3) / 4, 1000);
      pop();

      this.array1 = []; //resets array at the start of each display
      this.array2 = [];

      console.log(this.array2);

      for (let i = 0; i < this.spectrum.length; i = i + 50) {
        this.array1.push(this.spectrum[i]); //creates array of every 20th element of spectrum
      }
      this.array2 = this.array1.slice().reverse(); //creates a copy of array1 in reverse order

      let bitWidth = width / this.array1.length; //spacing between each bit (peak)

      stroke(255);
      noFill();

      beginShape();
      vertex(0, height, this.zpos);

      for (var i = 1; i < this.array1.length; i++) {
        //draws the initial spectrum
        let amp = this.array1[i];
        let bitHeight = map(amp, 0, 256, height, 0);
        vertex((bitWidth / 2) * i, bitHeight, this.zpos);
      }

      // vertex(width / 2, height);

      for (var j = 1; j < this.array2.length; j++) {
        //draws the mirrored spectrum
        let amp = this.array2[j];
        let bitHeight = map(amp, 0, 256, height, 0);
        vertex(width / 2 + (bitWidth / 2) * j, bitHeight, this.zpos);
      }

      vertex(width, height, this.zpos);
      endShape(CLOSE);
    }

    isDone() {
      return this.zpos >= 0;
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
