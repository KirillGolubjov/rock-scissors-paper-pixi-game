import * as PIXI from 'pixi.js';
import { SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_COLOR } from './common/constants';

export function initializeApp() {
  const app = new PIXI.Application({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: SCREEN_COLOR,
  });

  document.body.appendChild(app.view);

  return app;
}
