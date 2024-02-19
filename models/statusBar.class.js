class StatusBar extends DrawableObject {
  percentage = 100;
  path;
  IMAGES;
  width = 180;
  height = 60;

  IMAGES_HP = [
    "img/4. Marcadores/orange/0_  copia.png",
    "img/4. Marcadores/orange/20_  copia.png",
    "img/4. Marcadores/orange/40_  copia.png",
    "img/4. Marcadores/orange/60_  copia.png",
    "img/4. Marcadores/orange/80_  copia.png",
    "img/4. Marcadores/orange/100_  copia.png",
  ];

  IMAGES_COINS = [
    "img/4. Marcadores/orange/100_  copia 2.png",
    "img/4. Marcadores/orange/80_  copia 2.png",
    "img/4. Marcadores/orange/60_  copia 2.png",
    "img/4. Marcadores/orange/40_  copia 2.png",
    "img/4. Marcadores/orange/20_  copia 2.png",
    "img/4. Marcadores/orange/0_  copia 2.png",
  ];

  IMAGES_POISON = [
    "img/4. Marcadores/orange/100_ copia.png",
    "img/4. Marcadores/orange/80_ copia.png",
    "img/4. Marcadores/orange/60_ copia.png",
    "img/4. Marcadores/orange/40_ copia.png",
    "img/4. Marcadores/orange/20_ copia.png",
    "img/4. Marcadores/orange/0_ copia.png",
  ];

  constructor(type, x, y) {
    super();
    this.loadImageSet(type);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.setPercentage(this.percentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    this.path = this.IMAGES[this.getImageIndex()];
    this.img = this.imageCache[this.path];
  }

  getImageIndex() {
    if (this.percentage == 100) return 5;
    else if (this.percentage >= 80) return 4;
    else if (this.percentage >= 60) return 3;
    else if (this.percentage >= 40) return 2;
    else if (this.percentage >= 20) return 1;
    else return 0;
  }

  loadImageSet(type) {
    if (type == "hp") this.IMAGES = this.IMAGES_HP;
    if (type == "coins") this.IMAGES = this.IMAGES_COINS;
    if (type == "poison") this.IMAGES = this.IMAGES_POISON;
  }
}
