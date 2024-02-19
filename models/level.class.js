class Level {
  enemies;
  collectables;
  background;
  end;

  constructor(enemies, collectables, background, end) {
    this.enemies = enemies;
    this.collectables = collectables;
    this.background = background;
    this.end = end;
  }
}
