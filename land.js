function Land() {
  this.name = "land";

  let queue = [];

  class LandSlice {
    constructor() {
      this.spectrum = fourier.analyze(); //creates the frequency spectrum of the instant the object is created
      this.wave = fourier.waveform(); //creates the waveform of the instant the object is created
      this.zpos = -1000; //initial z position of the slice
    }

    update() {
      this.zpos += spaceSlider.value(); //space slider
    }

    display() {
      //draws the slice
      push();
      translate(0, -100, -1000);
      noStroke();
      fill(255, 128, 0);
      ellipse(width / 2, (height * 3) / 4, 1000 + amplitude.getLevel() * 1000); //draws the sun responds to current amplitde
      translate(0, 0, 5);
      fill(0);
      rect(0, height * 1.23, width, height); //covers the sun below the horizon
      for (let i = 0; i < 6; i++) {
        rect(0, height * 1.2 - i * 75, width, 75 / i); //draws the lines across the sun
      }
      pop();

      this.array1 = []; //resets arrays at the start of each display
      this.array2 = [];
      this.array3 = [];

      for (let i = 0; i < this.spectrum.length; i += 50) {
        this.array1.push(this.spectrum[i]); //creates array of every 50th element of spectrum
      }
      this.array2 = this.array1.slice().reverse(); //creates a copy of array1 in reverse order

      for (let i = 0; i < this.array2.length; i++) {
        this.array1.push(this.array2[i]); //adds the reversed array to the original array
      }

      for (let i = 0; i < this.wave.length; i += 24) {
        this.array3.push(this.wave[i] * 50); //creates array of every 24th element of waveform to match the length of the spectrum array
      }

      let peakWidth = (width + 400) / this.array1.length; //spacing between each peak

      push();
      stroke(map(this.zpos, -500, 400, 0, 255), 50, 255); //stroke colour changes depending on the z position
      noFill();
      strokeWeight(thickSlider.value()); //thickness slider

      beginShape();
      vertex(-200, height, this.zpos);

      for (var i = 1; i < this.array1.length; i++) {
        let amp = this.array1[i];
        amp += this.array3[i]; //adds the waveform to the spectrum to create a more interesting shape and fill the gaps in the spectrum where the amplitude value is 0

        let peakHeight = map(amp, 0, 256, height, height / 2);

        vertex(peakWidth * i - 200, peakHeight, this.zpos);
      }

      vertex(width, height, this.zpos);
      endShape(CLOSE);

      pop();
    }

    isDone() {
      return this.zpos >= 400; //checks if the slice has reached the end point past the camera
    }
  }

  this.draw = function () {
    push();
    queue.push(new LandSlice()); //add LandSlice to queue

    for (let i = queue.length - 1; i >= 0; i--) {
      queue[i].update(); //update LandSlice z position
      queue[i].display();
      if (queue[i].isDone()) {
        queue.splice(i, 1); // remove LandSlice from queue when it's done
      }
    }
    pop();
  };
}
