
/*
 * Rock Paper Scissors Game
 *
 * This application allows users to play a game of rock paper scissors against the computer. The game is played using 
 * PixiJS to display the graphics and interactive elements. The game tracks the scores of both the player and the 
 * computer, and ends when one of them reaches a predetermined number of points. The application provides visual 
 * feedback to the user through various animation and sound effects.
 *
 * Developed by Kirill Golubjov
 */
import { initializeApp } from './pixiConfig';
import * as PIXI from 'pixi.js';
import  {  ROCK_TEXTURE,
  PAPER_TEXTURE,
  SCISSORS_TEXTURE,
  HAND1_TEXTURE,
  HAND2_TEXTURE,
  HAND3_TEXTURE,
hand1,
hand2,
hand3 } from './common/textures';
import {
  DRAW_COLOR,
  WINNER_COLOR,
  START_COLOR,
  WIN,
  FINAL_SCORE,
  FONT_STYLE,
  HUMAN,
  COMPUTER,
  START_SCORE,
  SCORE_TEXT,
  PLAYER_TEXT,
  SELECT_HAND,
} from './common/constants';
import {
  createText,
  createSprite,
  addGlowEffect,
  playSoundEffect,
  updateScores,
  addShakeEffect,
  blinkEffect,
} from './utils/pixiUtils';
import { restartButton } from './utils/reloadPage';

// Initialize the PixiJS app
const app = initializeApp();

// Set initial game variables
let gameState = 'PLAYER_CHOICE';
let score0 = START_SCORE;
let score1 = START_SCORE;
let computerHand = null;
let playerHand = null;

//  Display the "Select your hand" text
const selectHandX = 50;
const selectHandY = 425;
const selectHandText = createText(
  app.stage,
  SELECT_HAND,
  selectHandX,
  selectHandY,
  {
    fontFamily: FONT_STYLE,
  }
);
blinkEffect(selectHandText);

// Display the name and score for the human player
const humanTextX = 65;
const humanTextY = 65;
const humanText = createText(app.stage, HUMAN, humanTextX, humanTextY, {
  ...PLAYER_TEXT,
});
const score0TextX = 105;
const score0TextY = 125;
const score0Text = createText(
  app.stage,
  START_SCORE,
  score0TextX,
  score0TextY,
  {
    ...SCORE_TEXT,
    name: HUMAN,
  }
);

// Display the name and score for the computer player
const computerTextX = 572;
const computerTextY = 65;
const computerText = createText(
  app.stage,
  COMPUTER,
  computerTextX,
  computerTextY,
  {
    ...PLAYER_TEXT,
  }
);
const score1TextX = 652;
const score1TextY = 125;
const score1Text = createText(
  app.stage,
  START_SCORE,
  score1TextX,
  score1TextY,
  {
    ...SCORE_TEXT,
    name: COMPUTER,
  }
);

// Display the rock, paper, and scissors sprites
// Rock Sprite
const rockSpriteX = 347;
const rockSpriteY = 500;
const rockSprite = createSprite(
  app.stage,
  ROCK_TEXTURE,
  rockSpriteX,
  rockSpriteY,
  true
);
// Paper Sprite
const paperSpriteX = 342;
const paperSpriteY = 438;
const paperSprite = createSprite(
  app.stage,
  PAPER_TEXTURE,
  paperSpriteX,
  paperSpriteY,
  true
);
// Scissors Sprite
const scissorsSpriteX = 325;
const scissorsSpriteY = 380;
const scissorsSprite = createSprite(
  app.stage,
  SCISSORS_TEXTURE,
  scissorsSpriteX,
  scissorsSpriteY,
  true
);

// Set up the computer hand choice
const computerSpriteX = 620;
const computerSpriteY = 400;
const computerChoice = () => {
  // Create a new sprite for the computer's hand
  const computer = PIXI.Sprite.from(
    `../assets/images/hand-${Math.floor(Math.random() * 3) + 1}.png`
  );
  computer.position.set(computerSpriteX, computerSpriteY);
  app.stage.addChild(computer);

  // Remove the old computer hand sprite and replace it with the new one
  app.stage.removeChild(computerHand);
  computerHand = computer;

  // Update game state to trigger ROUND_RESULT
  gameState = 'ROUND_RESULT';

  // Add shake effect to the computer's hand
  addShakeEffect(computerHand);

  // Check the winner after the computer's hand is updated
  checkWinner();
};

// Player Hand Choice
const playerSpriteX = 90;
const playerSpriteY = 400;
function onPlayerClick(texture, hand) {
  // Do nothing if it is not player's turn to choose
  if (gameState !== 'PLAYER_CHOICE') return;

  // Play the sound effect for player's click
  playSoundEffect('point');

  // Remove "Press To Start" text
  app.stage.removeChild(selectHandText);

  // Create a new sprite for the player's hand
  const playerChoice = PIXI.Sprite.from(texture);
  playerChoice.position.set(playerSpriteX, playerSpriteY);
  app.stage.addChild(playerChoice);

  // Remove the old player hand sprite and replace it with the new one
  if (playerHand) {
    app.stage.removeChild(playerHand);
    resetHands(playerHand);
  }
  playerHand = playerChoice;

  // Let the computer make a choice after the player has chosen
  computerChoice();

  // Determine who is the winner and update scores and game state accordingly
  const computerHandTexture = computerHand.texture.textureCacheIds[0];
  const isDraw = computerHandTexture === hand;
  const isPlayerWin =
    (computerHandTexture === hand1 && hand === hand2) ||
    (computerHandTexture === hand2 && hand === hand3) ||
    (computerHandTexture === hand3 && hand === hand1);

  if (isDraw) {
    // Tint both hands with draw color if there is a draw
    playerHand.tint = computerHand.tint = DRAW_COLOR;
  } else if (isPlayerWin) {
    // Tint the player's hand with winner color and update the score if the player wins
    playerHand.tint = WINNER_COLOR;
    score0Text.style.fill = humanText.style.fill = WINNER_COLOR;
    score0++;
  } else {
    // Tint the computer's hand with winner color and update the score if the computer wins
    computerHand.tint = WINNER_COLOR;
    score1Text.style.fill = computerText.style.fill = WINNER_COLOR;
    score1++;
  }

  // Add shake effect to the player's hand
  addShakeEffect(playerChoice);

  // Update scores on the screen
  updateScores(score0, score1, score0Text, score1Text);

  // Check if there is a winner
  checkWinner();
}


// Clicks On Buttons
function onButtonClick(texture, handKey) {
  if (gameState !== 'PLAYER_CHOICE') return;
  if (score0 === FINAL_SCORE || score1 === FINAL_SCORE) return;
  onPlayerClick(texture, handKey);
}

rockSprite.on('click', () => {
  onButtonClick(HAND1_TEXTURE, hand1);
});

paperSprite.on('click', () => {
  onButtonClick(HAND2_TEXTURE, hand2);
});

scissorsSprite.on('click', () => {
  onButtonClick(HAND3_TEXTURE, hand3);
});

// Check For Winner
const playerScoreX = 50;
const computerScoreX = 560;
function checkWinner() {
  if (score0 >= FINAL_SCORE || score1 >= FINAL_SCORE) {
    if (score0 > score1) {
      // Player Wins
      score0Text.text = WIN;
      score0Text.x = playerScoreX;
      addGlowEffect(playerHand);
      playSoundEffect('win');
    } else {
      // Computer Wins
      score1Text.text = WIN;
      score1Text.x = computerScoreX;
      addGlowEffect(computerHand);
      playSoundEffect('lost');
    }
    // Game Over
    gameState = 'GAME_OVER';
    blinkEffect(restartButton);
  } else {
    // Continue Game
    setTimeout(() => {
      resetHands();
       score0Text.style.fill = START_COLOR;
       score1Text.style.fill = START_COLOR;
       humanText.style.fill = START_COLOR;
       computerText.style.fill = START_COLOR;
      gameState = 'PLAYER_CHOICE';
    }, 1600);
  }
}

 // Reset Hands
  function resetHands() {
    [computerHand, playerHand].forEach((hand) => {
      if (hand) {
        app.stage.removeChild(hand);
      }
    });
  }

// Reload Page
app.stage.addChild(restartButton);

// Restart Game Without Reloading Page

// const restartButtonX = 338;
// const restartButtonY = 20;
// const restartButton = new PIXI.Text(RESTART, {
//   ...RESTART_TEXT,
// });
// restartButton.cursor = 'pointer';
// restartButton.x = restartButtonX;
// restartButton.y = restartButtonY;
// restartButton.interactive = true;
// restartButton.buttonMode = true;
// restartButton.on('click', () => {
//   // Reset Game Variables
//   gameState = 'PLAYER_CHOICE';
//   score0 = START_SCORE;
//   score1 = START_SCORE;
//   app.stage.removeChild(computerHand);
//   app.stage.removeChild(playerHand);
//   // Reset score and hand sprites
//   score0Text.text = START_SCORE;
//   score0Text.x = score0TextX;
//   score1Text.text = START_SCORE;
//   score1Text.x = score1TextX;
//   resetHands();
//   // Show "Press to start" text and restart button blinking effect
//   app.stage.addChild(selectHandText);
// });
// app.stage.addChild(restartButton);