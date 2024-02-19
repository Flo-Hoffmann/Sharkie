class Character extends MoveableObject {
  world;
  x = 50;
  y = 150;
  height = 180;
  width = 200;
  speed = 5;
  mirrorImages = false;
  isMoving = false;
  isAttacking = false;
  movementIntervalId;
  imageIntervalId;
  lastAttack = 0;
  attack_sound = new Audio("audio/bubble.mp3");

  IMAGES_IDLE = [
    "img/1.Sharkie/1.IDLE/1.png",
    "img/1.Sharkie/1.IDLE/2.png",
    "img/1.Sharkie/1.IDLE/3.png",
    "img/1.Sharkie/1.IDLE/4.png",
    "img/1.Sharkie/1.IDLE/5.png",
    "img/1.Sharkie/1.IDLE/6.png",
    "img/1.Sharkie/1.IDLE/7.png",
    "img/1.Sharkie/1.IDLE/8.png",
    "img/1.Sharkie/1.IDLE/9.png",
    "img/1.Sharkie/1.IDLE/10.png",
    "img/1.Sharkie/1.IDLE/11.png",
    "img/1.Sharkie/1.IDLE/12.png",
    "img/1.Sharkie/1.IDLE/13.png",
    "img/1.Sharkie/1.IDLE/14.png",
    "img/1.Sharkie/1.IDLE/15.png",
    "img/1.Sharkie/1.IDLE/16.png",
    "img/1.Sharkie/1.IDLE/17.png",
    "img/1.Sharkie/1.IDLE/18.png",
  ];

  IMAGES_SWIM = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png",
    "img/1.Sharkie/3.Swim/3.png",
    "img/1.Sharkie/3.Swim/4.png",
    "img/1.Sharkie/3.Swim/5.png",
    "img/1.Sharkie/3.Swim/6.png",
  ];

  IMAGES_DEAD = [
    "img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  IMAGES_HURT = [
    "img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
  ];

  IMAGES_ATTACK = [
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.animate();
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_ATTACK);
  }

  animate() {
    setStopableInterval(() => {
      if (this.world.controls.UP && this.y > 0) {
        this.isMoving = true;
        this.y -= this.speed;
      }
      if (this.world.controls.DOWN && this.y < 480 - this.height) {
        this.isMoving = true;
        this.y += this.speed;
      }
      if (this.world.controls.LEFT && this.x - 50 > 0) {
        this.isMoving = true;
        this.x -= this.speed;
        this.mirrorImages = true;
        this.world.camera = -this.x + 50;
      }
      if (this.world.controls.RIGHT && this.x - 50 < this.world.level.end) {
        this.isMoving = true;
        this.x += this.speed;
        this.mirrorImages = false;
        this.world.camera = -this.x + 50;
      }
      if (this.world.controls.SPACE) {
        this.attack();
      }
      this.isMoving = false;
    }, 1000 / 60);

    let i = 0;

    setStopableInterval(() => {
      if (this.isDead()) {
        this.deathAnimation(i);
        i++;
        showGameoverScreen();
      } else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
      else if (this.isAttacking) this.playAnimation(this.IMAGES_ATTACK);
      else if (this.isMoving) this.playAnimation(this.IMAGES_SWIM);
      else this.playAnimation(this.IMAGES_IDLE);
    }, 100);
  }

  deathAnimation(i) {
    if (i < 12) {
      this.playAnimation(this.IMAGES_DEAD);
    } else {
      this.loadImage("img/1.Sharkie/6.dead/1.Poisoned/12.png");
      this.y -= 15;
    }
  }

  attack() {
    if (this.canAttack()) {
      this.isAttacking = true;
      this.lastAttack = new Date().getTime();

      setTimeout(() => {
        this.isAttacking = false;
        this.world.bubble.push(
          new BubbleAttack(this.x + this.width - 30, this.y + this.height - 100)
        );
        if (!this.isMute) this.attack_sound.play();
      }, 800);
    }
  }

  canAttack() {
    let timePassed = new Date().getTime() - this.lastAttack;
    if (timePassed > 1000 && !this.mirrorImages) return true;
    else return false;
  }
}
