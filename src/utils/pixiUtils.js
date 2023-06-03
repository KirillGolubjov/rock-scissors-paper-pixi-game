import * as PIXI from 'pixi.js';
import appTextures, { allTexturesKeys } from '../common/textures';
import { soundEffects } from '../common/sounds';
import { TweenMax } from 'gsap';

// Create Text
function createText(stage, text, x, y, options = {}) {
  const textObj = new PIXI.Text(text, {
    fontFamily: 'Arial',
    fontSize: 30,
    fill: 'white',
    ...options,
  });
  textObj.x = x;
  textObj.y = y;
  stage.addChild(textObj);
  return textObj;
}

// Create Sprite
function createSprite(stage, texture, x, y, interactive = false) {
  const sprite = new PIXI.Sprite(texture);
  sprite.x = x;
  sprite.y = y;
  sprite.interactive = interactive;
  sprite.cursor = 'pointer';
  stage.addChild(sprite);
  return sprite;
}

// Add Glow Effect
function addGlowEffect(handSprite) {
  const glow = new PIXI.Sprite(
    PIXI.Texture.from(appTextures[allTexturesKeys.glowImg])
  );
  glow.anchor.set(0.5);
  glow.blendMode = PIXI.BLEND_MODES.ADD;
  glow.alpha = 0.5;
  handSprite.addChild(glow);

  // Remove Glow Effect
  setTimeout(() => {
    handSprite.removeChild(glow);
  }, 2000);
}

// Add Sound Effect
function playSoundEffect(sound) {
  soundEffects[sound].play();
}

// Update Scores
function updateScores(score0, score1, score0Text, score1Text) {
  score0Text.text = score0.toString();
  score1Text.text = score1.toString();
}

// Add Shake Effect
function addShakeEffect(handSprite) {
  TweenMax.to(handSprite, 0.1, {
    x: '-=5',
    yoyo: true,
    repeat: 5,
  });
}

// Add Blink Effect
function blinkEffect(restartButton) {
  setInterval(() => {
    restartButton.visible = !restartButton.visible;
  }, 500);
}

// Add Blink Effect (For Restarting The Game Without Reloading Page)

// function blinkEffect(restartButton) {
//   let intervalId = setInterval(() => {
//     restartButton.visible = !restartButton.visible;
//   }, 500);

//   restartButton.on('click', () => {
//     clearInterval(intervalId);
//     restartButton.visible = true; 
//   });
// }

export {
  createText,
  createSprite,
  addGlowEffect,
  playSoundEffect,
  updateScores,
  addShakeEffect,
  blinkEffect,
};
