import * as PIXI from 'pixi.js';
export const allTexturesKeys = {
  paperImg: 'paper',
  rockImg: 'rock',
  scissorsImg: 'scissors',
  hand1Img: 'hand1',
  hand2Img: 'hand2',
  hand3Img: 'hand3',
  glowImg: 'glow',
};

const appTextures = {
  [allTexturesKeys.rockImg]: '../assets/images/rock.png',
  [allTexturesKeys.paperImg]: '../assets/images/paper.png',
  [allTexturesKeys.scissorsImg]: '../assets/images/scissors.png',
  [allTexturesKeys.hand1Img]: '../assets/images/hand-1.png',
  [allTexturesKeys.hand2Img]: '../assets/images/hand-2.png',
  [allTexturesKeys.hand3Img]: '../assets/images/hand-3.png',
  [allTexturesKeys.glowImg]: '../assets/images/glow.png',
};

 const ROCK_TEXTURE = PIXI.Texture.from(
  appTextures[allTexturesKeys.rockImg]
);
 const PAPER_TEXTURE = PIXI.Texture.from(
  appTextures[allTexturesKeys.paperImg]
);
 const SCISSORS_TEXTURE = PIXI.Texture.from(
  appTextures[allTexturesKeys.scissorsImg]
);

 const HAND1_TEXTURE = PIXI.Texture.from(
  appTextures[allTexturesKeys.hand1Img]
);
 const HAND2_TEXTURE = PIXI.Texture.from(
  appTextures[allTexturesKeys.hand2Img]
);
 const HAND3_TEXTURE = PIXI.Texture.from(
  appTextures[allTexturesKeys.hand3Img]
);

 const hand1 = appTextures[allTexturesKeys.hand1Img];
 const hand2 = appTextures[allTexturesKeys.hand2Img];
 const hand3 = appTextures[allTexturesKeys.hand3Img];

export {
  ROCK_TEXTURE,
  PAPER_TEXTURE,
  SCISSORS_TEXTURE,
  HAND1_TEXTURE,
  HAND2_TEXTURE,
  HAND3_TEXTURE,
  hand1,
  hand2,
  hand3,
};

export default appTextures;
