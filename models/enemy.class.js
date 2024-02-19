class Enemy extends MoveableObject {
  height = 75;
  width = 75;
  speed = 1;
  world;

  moveLeft() {
    setStopableInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
