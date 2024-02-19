class World {
  canvas;
  ctx;
  controls;
  level = level1;
  camera = 0;
  character = new Character();
  bubble = [new BubbleAttack()];
  coins = 0;
  poison = 0;
  hpBar = new StatusBar("hp", 20, 0);
  coinsBar = new StatusBar("coins", 220, 0);
  poisonBar = new StatusBar("poison", 420, 0);
  endBoss;
  coin_sound = new Audio("audio/coin.mp3");
  bg_sound = new Audio("audio/music.mp3");
  isMute = false;

  constructor(canvas, controls) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.controls = controls;
    this.draw();
    this.setWorld();
    this.run();
    this.bg_sound.play();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera, 0);

    this.addObjectsToCanvas(this.level.background);
    this.addObjectsToCanvas(this.level.enemies);
    this.addObjectsToCanvas(this.level.collectables);
    this.addObjectsToCanvas(this.bubble);
    this.addToCanvas(this.character);

    /* fixed objects */
    this.ctx.translate(-this.camera, 0);
    this.addToCanvas(this.hpBar);
    this.addToCanvas(this.coinsBar);
    this.addToCanvas(this.poisonBar);
    this.ctx.translate(this.camera, 0);
    /* fixed objects end */

    this.ctx.translate(-this.camera, 0);

    self = this;
    requestAnimationFrame((f) => self.draw());
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  run() {
    setStopableInterval(() => {
      this.checkCollisions();
    }, 200);
  }

  checkCollisions() {
    this.checkCharacter();
    this.checkCoins();
    this.checkPoison();
    this.checkEnemies();
  }

  checkCharacter() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.gotHit();
        this.hpBar.setPercentage(this.character.hp);
      }
    });
  }

  checkEnemies() {
    this.level.enemies.forEach((enemy) => {
      this.bubble.forEach((bubble, index) => {
        if (bubble.isColliding(enemy)) {
          enemy.gotHit();
          this.bubble.splice(index, 1);
        }
      });
    });
  }

  checkCoins() {
    this.level.collectables.forEach((collectable, index) => {
      if (
        this.character.isColliding(collectable) &&
        collectable.type == "coin"
      ) {
        if (!this.isMute) this.coin_sound.play();
        this.coins = this.coins + 20;
        this.level.collectables.splice(index, 1);
        this.coinsBar.setPercentage(100 - this.coins);
      }
    });
  }

  checkPoison() {
    this.level.collectables.forEach((collectable, index) => {
      if (
        this.character.isColliding(collectable) &&
        collectable.type == "poison"
      ) {
        if (!this.isMute) this.coin_sound.play();
        this.poison = this.poison + 20;
        this.level.collectables.splice(index, 1);
        this.poisonBar.setPercentage(100 - this.poison);
      }
    });
  }

  addToCanvas(obj) {
    if (obj.mirrorImages) this.flipImage(obj);

    obj.draw(this.ctx);
    obj.drawFrame(this.ctx);

    if (obj.mirrorImages) this.flipImageBack(obj);
  }

  addObjectsToCanvas(objects) {
    objects.forEach((object) => {
      this.addToCanvas(object);
    });
  }

  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = obj.x * -1;
  }

  flipImageBack(obj) {
    obj.x = obj.x * -1;
    this.ctx.restore();
  }
}
