class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x;
  y;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Enemy ||
      this instanceof CollectableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  playAnimation(imageSet) {
    let i = this.currentImage % imageSet.length; // % = Modulu oder "Rest"
    let path = imageSet[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
