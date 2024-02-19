class BubbleAttack extends MoveableObject {
  width = 50;
  height = 50;

  alpha = 20;
  offset = 0;

  constructor(x, y) {
    super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.attack(x, y);
  }

  attack(x, y) {
    this.x = x;
    this.y = y;
    this.offset = y;

    setStopableInterval(() => {
      this.x += 5;
      this.y = this.alpha * Math.sin(this.x / this.alpha) + this.offset;
    }, 1000 / 30);
  }
}
