//displays and handles clicks on the playback button.
function PlaybackButton() {
  this.x = width / 2 - 10;
  this.y = height - 40;
  this.width = 20;
  this.height = 20;

  //flag to determine whether to play or pause after button click and
  //to determine which icon to draw
  this.playing = false;

  this.draw = function () {
    if (this.playing) {
      rect(this.x, this.y, this.width / 2 - 2, this.height);
      rect(
        this.x + (this.width / 2 + 2),
        this.y,
        this.width / 2 - 2,
        this.height
      );
      triangle(
        this.x + 40,
        this.y,
        this.x + this.width + 40,
        this.y + this.height / 2,
        this.x + 40,
        this.y + this.height
      );
      rect(this.x + 40 + this.width, this.y, 5, this.height);
      triangle(
        this.x - 40 + this.width,
        this.y,
        this.x - 40,
        this.y + this.height / 2,
        this.x - 40 + this.width,
        this.y + this.height
      );
      rect(this.x - 45, this.y, 5, this.height);
    } else {
      triangle(
        this.x,
        this.y,
        this.x + this.width,
        this.y + this.height / 2,
        this.x,
        this.y + this.height
      );
      triangle(
        this.x + 40,
        this.y,
        this.x + this.width + 40,
        this.y + this.height / 2,
        this.x + 40,
        this.y + this.height
      );
      rect(this.x + 40 + this.width, this.y, 5, this.height);
      triangle(
        this.x - 40 + this.width,
        this.y,
        this.x - 40,
        this.y + this.height / 2,
        this.x - 40 + this.width,
        this.y + this.height
      );
      rect(this.x - 45, this.y, 5, this.height);
    }
  };

  //checks for clicks on the button, starts or pauses playabck.
  //@returns true if clicked false otherwise.

  this.hitCheck = function (keycode = undefined) {
    // text(j + 1 + ":" + soundName[j], width - 225, 170 + j * 35);
    if (
      (mouseX > this.x &&
        mouseX < this.x + this.width &&
        mouseY > this.y &&
        mouseY < this.y + this.height) ||
      keycode == 32
    ) {
      this.playing = !this.playing;
      return true;
    }
    return false;
  };
}
