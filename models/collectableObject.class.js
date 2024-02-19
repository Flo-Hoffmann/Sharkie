class CollectableObject extends DrawableObject {
  height = 50;
  width = 50;
  IMAGES;
  type;

  IMAGES_COINS = [
    "img/4. Marcadores/1. Coins/1.png",
    "img/4. Marcadores/1. Coins/2.png",
    "img/4. Marcadores/1. Coins/3.png",
    "img/4. Marcadores/1. Coins/4.png",
  ];

  IMAGES_POISON = [
    "img/4. Marcadores/Posión/Animada/1.png",
    "img/4. Marcadores/Posión/Animada/2.png",
    "img/4. Marcadores/Posión/Animada/3.png",
    "img/4. Marcadores/Posión/Animada/4.png",
    "img/4. Marcadores/Posión/Animada/5.png",
    "img/4. Marcadores/Posión/Animada/6.png",
    "img/4. Marcadores/Posión/Animada/7.png",
    "img/4. Marcadores/Posión/Animada/8.png",
  ];

  constructor(type, x, y) {
    super();
    this.loadImageSet(type);
    this.loadImage(this.IMAGES[0]);
    this.animate(this.IMAGES);
    this.x = x;
    this.y = y;
    this.type = type;
  }

  loadImageSet(type) {
    if (type == "coin") this.IMAGES = this.IMAGES_COINS;
    if (type == "poison") this.IMAGES = this.IMAGES_POISON;
  }

  animate(imageSet) {
    this.loadImages(imageSet);

    setStopableInterval(() => {
      this.playAnimation(imageSet);
    }, 100);
  }
}
