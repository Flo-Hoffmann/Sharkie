let backgroundObjects = [];
let x = 0;
let y = 0;
let level1;
let end;

let bgRepeats = 3;

// prettier-ignore
for (let i = 0; i < bgRepeats; i++) {

  backgroundObjects.push(
    new BackgroundObject("img/3. Background/Layers/5. Water/L1.png", x, y),
    new BackgroundObject("img/3. Background/Layers/4. Fondo 2/L1.png", x, y),
    new BackgroundObject("img/3. Background/Layers/3. Fondo 1/L1.png", x, y),
    new BackgroundObject("img/3. Background/Layers/2. Floor/L1.png", x, y),
    new BackgroundObject("img/3. Background/Layers/1. Light/1.png", x, y),
    new BackgroundObject("img/3. Background/Layers/5. Water/L2.png", x + 720, y),
    new BackgroundObject("img/3. Background/Layers/4. Fondo 2/L2.png", x + 720, y),
    new BackgroundObject("img/3. Background/Layers/3. Fondo 1/L2.png", x + 720, y),
    new BackgroundObject("img/3. Background/Layers/2. Floor/L2.png", x + 720, y),
    new BackgroundObject("img/3. Background/Layers/1. Light/2.png", x + 720, y)
  );

  x += 720 * 2;
}
end = x - 720;

function initLevel1() {
  level1 = new Level(
    [
      new PufferFish(1440, randomY(), 2),
      new PufferFish(2160, randomY(), 1),
      new PufferFish(2880, randomY(), 1),
      new JellyFish(720, randomY(), 1),
      new JellyFish(1440, randomY(), 1),
      new JellyFish(2880, randomY(), 1),
      new Endboss(end, -70, 1),
    ],
    [
      new CollectableObject("coin", randomX(end), randomY()),
      new CollectableObject("coin", randomX(end), randomY()),
      new CollectableObject("coin", randomX(end), randomY()),
      new CollectableObject("coin", randomX(end), randomY()),
      new CollectableObject("coin", randomX(end), randomY()),
      new CollectableObject("poison", randomX(end), randomY()),
      new CollectableObject("poison", randomX(end), randomY()),
      new CollectableObject("poison", randomX(end), randomY()),
      new CollectableObject("poison", randomX(end), randomY()),
      new CollectableObject("poison", randomX(end), randomY()),
    ],
    backgroundObjects,
    end
  );
}
