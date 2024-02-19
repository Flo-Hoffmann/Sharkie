class JellyFish extends Enemy {
  hp = 5;

  IMAGES_SWIM = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];

  constructor(x, y, speed) {
    super().loadImage(this.IMAGES_SWIM[0]);
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.animate(this.y);
  }

  animate(y) {
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_DEAD);

    setStopableInterval(() => {
      if (this.isDead()) this.animateDeath(y);
      else this.playAnimation(this.IMAGES_SWIM);
    }, 200);
  }

  animateDeath(y) {
    this.playAnimation(this.IMAGES_DEAD);

    setStopableInterval(() => {
      this.x += 5;
      this.y = 20 * Math.sin(this.x / 20) + y;
    }, 1000 / 30);
  }
}
