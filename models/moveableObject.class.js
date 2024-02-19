class MoveableObject extends DrawableObject {
  hp = 100;
  lastHit = 0;
  gotHit_sound = new Audio("audio/gothit.mp3");
  spark_sound = new Audio("audio/spark.mp3");
  isMute = false;

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y <= obj.y + obj.height
    );
  }

  gotHit() {
    if (!this.isMute) this.playSound();
    this.hp -= 5;
    this.lastHit = new Date().getTime();
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead() {
    return this.hp <= 0;
  }

  playSound() {
    if (this instanceof PufferFish || this instanceof JellyFish) {
      if (!this.isMute) this.gotHit_sound.play();
    } else {
      if (!this.isMute) this.spark_sound.play();
    }
  }
}
