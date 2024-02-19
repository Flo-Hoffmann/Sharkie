class Endboss extends Enemy {
  height = 500;
  width = 450;
  hp = 15;
  firstContact = false;
  animateIntervalId;


  IMAGES_SPAWN = [
    "img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  IMAGES_SWIM = [
    "img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  IMAGES_HURT = [
    "img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];

  IMAGES_DEAD = [
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  constructor(x, y, speed) {
    super().loadImage(this.IMAGES_SWIM[0]);
    this.loadImages(this.IMAGES_SPAWN);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate(this.IMAGES_SWIM);
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  animate() {
    let i = 0;
    let j = 0;

    this.animateIntervalId = setStopableInterval(() => {
      if (i < 10 && !this.isDead()) {
        this.playAnimation(this.IMAGES_SPAWN);
      } else if (this.isDead()) {
        this.deathAnimation(j);
        j++;
        showKillScreen();
      } else if (this.isHurt() && !this.isDead())
        this.playAnimation(this.IMAGES_HURT);
      else if (!this.isDead()) {
        this.playAnimation(this.IMAGES_SWIM);
      }
      i++;

      if (this.world.character.x > this.x - 720 && !this.firstContact) {
        i = 0;
        this.firstContact = true;
      }
    }, 150);
  }

  deathAnimation(j) {
    if (j < 6) {
      this.playAnimation(this.IMAGES_DEAD);
    } else {
      this.loadImage(
        "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png"
      );
      this.y -= 15;
    }
  }
}
