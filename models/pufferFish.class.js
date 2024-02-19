class PufferFish extends Enemy {
  hp = 5;

  IMAGES_SWIM = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png",
  ];

  constructor(x, y, speed) {
    super().loadImage(this.IMAGES_SWIM[0]);
    this.moveLeft();
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.animate();
  }

  animate() {
    this.loadImages(this.IMAGES_SWIM);

    setStopableInterval(() => {
      if (this.isDead()) this.animateDeath(y);
      else this.playAnimation(this.IMAGES_SWIM);
    }, 200);
  }

  animateDeath() {
    this.loadImage("img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png");

    setStopableInterval(() => {
      (this.y -= 5) ^ this.x;
    }, 1000 / 30);
  }
}
