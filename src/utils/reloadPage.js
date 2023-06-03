import * as PIXI from 'pixi.js';
import { RESTART, RESTART_TEXT } from '../common/constants';

// Reload The Page
const restartButtonX = 338;
const restartButtonY = 20;

export const restartButton = new PIXI.Text(RESTART, {
  ...RESTART_TEXT,
});
restartButton.cursor = 'pointer';
restartButton.x = restartButtonX;
restartButton.y = restartButtonY;
restartButton.interactive = true;
restartButton.buttonMode = true;
restartButton.on('click', () => {
  location.reload();
});

