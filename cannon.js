// Fig. 14.27 cannon.js
// Logic of the Cannon Game
var canvas; // the canvas
var context; // used for drawing on the canvas

// constants for game play
var TARGET_PIECES = 7; // sections in the target
var MISS_PENALTY = 2; // seconds deducted on a miss
var HIT_REWARD = 3; // seconds added on a hit
var TIME_INTERVAL = 25; // screen refresh interval in milliseconds


var then;
var now;

// variables for the game loop and tracking statistics
var intervalTimer; // holds interval timer
var timerCount; // number of times the timer fired since the last second
var timeLeft; // the amount of time left in seconds
var shotsFired; // the number of shots the user has fired
var timeElapsed; // the number of seconds elapsed

// variables for the blocker and target
var blocker; // start and end points of the blocker
var blockerDistance; // blocker distance from left
var blockerBeginning; // blocker distance from top
var blockerEnd; // blocker bottom edge distance from top
var initialBlockerVelocity; // initial blocker speed multiplier
var blockerVelocity; // blocker speed multiplier during game

var target; // start and end points of the target
var targetDistance; // target distance from left
var targetBeginning; // target distance from top
var targetEnd; // target bottom's distance from top
var pieceLength; // length of a target piece
var initialTargetVelocity; // initial target speed multiplier
var targetVelocity; // target speed multiplier during game

var lineWidth; // width of the target and blocker
var targetPiecesHit; // number of target pieces hit (out of 7)

// variables for the cannon and cannonball
var cannonball; // cannonball image's upper-left corner
var cannonballVelocity; // cannonball's velocity
var cannonballOnScreen; // is the cannonball on the screen
var cannonballRadius; // cannonball radius
var cannonballSpeed; // cannonball speed
var cannonBaseRadius; // cannon base radius
var cannonLength; // cannon barrel length
var barrelEnd; // the end point of the cannon's barrel
var canvasWidth; // width of the canvas
var canvasHeight; // height of the canvas

// variables for sounds
var targetSound;
var cannonSound;
var blockerSound;

// varibales for hero position
var hero = new Image();
const HERO_IMG = 80
var heroVelocity;

// variables for hero fire
var heroShoot = new Image();
const HERO_SHOOT_IMG = 30
var heroShootVelocity;
var heroShoots;
var hitStates; // is each target piece hit?

// variables for detremain the enemys
var enemy = new Image();
var enemyShoot = new Image();
var enemyVelocity;
const ENEMY_IMG = 60

// variables for the enemy shooter indices.
var iShooter;
var jShooter;
var curiShooter;
var curjShooter;
var enemyShootVelocity;
var enemyShoots;
var canEnemyShoot;
const ENEMY_SHOOT_IMG = 40;

const ENEMY_I = 5;
const ENEMY_J = 4;


// keys
var keysDown;



// var countdown =document.getElementById( "#countdown" ).countdown360({
//    radius      : 60,
//    seconds     : 100,
//    fontColor   : '#FFFFFF',
//    autostart   : false,
//    onComplete  : function () { console.log('done') }
// });



// called when the app first launches
function setupGame()
{
   // stop timer if document unload event occurs
   document.addEventListener( "unload", stopTimer, false );

   // get the canvas, its context and setup its click event handler
   canvas = document.getElementById( "theCanvas" );
   context = canvas.getContext("2d");

   // start a new game when user clicks Start Game button
   document.getElementById( "startButton" ).addEventListener( 
      "click", newGame, false );

   // JavaScript Object representing game items
   blocker = new Object(); // object representing blocker line
   blocker.start = new Object(); // will hold x-y coords of line start
   blocker.end = new Object(); // will hold x-y coords of line end
   target = new Object(); // object representing target line
   target.start = new Object(); // will hold x-y coords of line start
   target.end = new Object(); // will hold x-y coords of line end
   cannonball = new Object(); // object representing cannonball point
   barrelEnd = new Object(); // object representing end of cannon barrel


   // get sounds
   targetSound = document.getElementById( "targetSound" );
   cannonSound = document.getElementById( "cannonSound" );
   blockerSound = document.getElementById( "blockerSound" );
   
   hero.src = "pic/starship.jpg"
   enemy.src = "pic/bgud.jpg"
   enemyShoot.src = "pic/fire.jpg"
   heroShoot.src = "pic/heroShoot.jpg"

   enemyPos = new Object();
   enemyPos.start = new Object();
   enemyPos.end = new Object();
   enemyShoots = new Array(ENEMY_I);

   heroPos = new Object();
   heroShoots = new Array();
   // initialize hitStates as an array
   hitStates = new Array(ENEMY_I);


   keysDown = {};
   

   // Check for keys pressed where key represents the keycode captured
	// Check for keys pressed where key represents the keycode captured
	addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);

	addEventListener("keyup", function (e) {

      now = Date.now()
      if (e.keyCode == 32 && validSpacePress) { 

         updateHeroShoots();
      }
      else
      {
         delete keysDown[e.keyCode];

      }

   }, false);
   




} // end function setupGame


function validSpacePress()
{
   if ((now - then) < 0.75)
   {
      now = then
      return false
   }
   else
      now = then 
      return true;
}

// set up interval timer to update game
function startTimer()
{

   canvas.addEventListener( "click", fireCannonball, false );
   intervalTimer = window.setInterval( updatePositions, TIME_INTERVAL );

   // countdown.start();



} // end function startTimer

// terminate interval timer
function stopTimer()
{
   canvas.removeEventListener( "click", fireCannonball, false );
   window.clearInterval( intervalTimer );
} // end function stopTimer

// called by function newGame to scale the size of the game elements
// relative to the size of the canvas before the game begins
function resetElements()
{
   var w = canvas.width;
   var h = canvas.height;
   canvasWidth = w; // store the width
   canvasHeight = h; // store the height
   cannonBaseRadius = h / 18; // cannon base radius 1/18 canvas height
   cannonLength = w / 8; // cannon length 1/8 canvas width

   cannonballRadius = w / 36; // cannonball radius 1/36 canvas width
   cannonballSpeed = w * 3 / 2; // cannonball speed multiplier

   lineWidth = w / 24; // target and blocker 1/24 canvas width

   // configure instance variables related to the blocker
   blockerDistance = w * 5 / 8; // blocker 5/8 canvas width from left
   blockerBeginning = h / 8; // distance from top 1/8 canvas height
   blockerEnd = h * 3 / 8; // distance from top 3/8 canvas height
   initialBlockerVelocity = h / 2; // initial blocker speed multiplier
   blocker.start.x = blockerDistance;
   blocker.start.y = blockerBeginning;
   blocker.end.x = blockerDistance;
   blocker.end.y = blockerEnd;

   // configure instance variables related to the target
   targetDistance = h * 7 / 8; // target 7/8 canvas width from left
   targetBeginning = w / 8; // distance from top 1/8 canvas height
   targetEnd = w * 7 / 8; // distance from top 7/8 canvas height
   pieceLength = (targetEnd - targetBeginning) / TARGET_PIECES;
   initialTargetVelocity = -h / 4; // initial target speed multiplier
   target.start.y = targetDistance;
   target.start.x = targetBeginning;
   target.end.y = targetDistance;
   target.end.x = targetEnd;

   // end point of the cannon's barrel initially points horizontally
   barrelEnd.x = cannonLength;
   barrelEnd.y = h / 2;

   enemyPos.start.x = 180;
   enemyPos.end.x = 620;
   enemyPos.start.y = canvasHeight / 25;
   enemyPos.end.y = enemyPos.start.y + 4 * ENEMY_IMG + (ENEMY_J - 1) * 10;
   enemyVelocity = 100;

   enemyShootVelocity = 100;

   heroVelocity = 256;
   heroShootVelocity = 256;
   heroPos.x = Math.floor(Math.random() * (800 - HERO_IMG));
   heroPos.y = canvasHeight - HERO_IMG;

} // end function resetElements

function initEnemyShoots()
{
   // init enemy shoot and hits
   for (var i = 0; i < ENEMY_I; i++)
   {
      enemyShoots[i] = new Array(ENEMY_J)
      hitStates[i] = new Array(ENEMY_J);

      for (var j = 0; j < ENEMY_J; j++)
      {
         enemyShoots[i][j] = new Object();
         enemyShoots[i][j].on = new Object();
         enemyShoots[i][j].pos = new Object();
         hitStates[i][j] = false
      }
   }

}
// reset all the screen elements and start a new game
function newGame()
{
   document.getElementById( "startButton" ).blur();
   resetElements(); // reinitialize all game elements
   stopTimer(); // terminate previous interval timer

   // set every element of hitStates to false--restores target pieces
   for (var i = 0; i < TARGET_PIECES; ++i)
      hitStates[i] = false; // target piece not destroyed


   targetPiecesHit = 0; // no target pieces have been hit
   blockerVelocity = initialBlockerVelocity; // set initial velocity
   targetVelocity = initialTargetVelocity; // set initial velocity
   timeLeft = 10; // start the countdown at 10 seconds
   timerCount = 0; // the timer has fired 0 times so far
   cannonballOnScreen = false; // the cannonball is not on the screen
   shotsFired = 0; // set the initial number of shots fired
   timeElapsed = 0; // set the time elapsed to zero
   enemyVelocity = 150;
   canEnemyShoot = true; // enemy can shoot
   isHeroShoot = false;
   keysDown = {};
   initEnemyShoots()
   heroShoots = new Array();
	updatePositions();

   // prevent double shooting from hero player
   then = Date.now();

   startTimer(); // starts the game loop
} // end function newGame


function updateHeroPos()
{
   var heroUpdate = TIME_INTERVAL / 1000.0 * heroVelocity;

      // update player position
      if ((38 in keysDown) ) { 
         // Player holding up
         if(heroPos.y > canvasHeight * 0.6)
            heroPos.y -= heroUpdate;
      }
      if ((40 in keysDown) ) { 
         // Player holding down
         if(heroPos.y <= canvasHeight - HERO_IMG)
            heroPos.y += heroUpdate;
      }
      if (37 in keysDown) { 
         // Player holding left
         if(heroPos.x >= 0)
            heroPos.x -= heroUpdate;
      }
      if (39 in keysDown) { 
         // Player holding right
         if(heroPos.x <= canvasWidth - HERO_IMG)
            heroPos.x += heroUpdate;	
      }
      // changed
      
      
   
}

// called every TIME_INTERVAL milliseconds
function updatePositions()
{
   updateHeroPos();
   // update the target's position
   var enemyUpdate = TIME_INTERVAL / 1000.0 * enemyVelocity;
   enemyPos.start.x += enemyUpdate;
   enemyPos.end.x += enemyUpdate;

   // update the target's position
   var enemyShootUpdate = TIME_INTERVAL / 1000.0 * enemyShootVelocity;
   enemyPos.start.x += enemyUpdate;
   enemyPos.end.x += enemyUpdate;

   if (canEnemyShoot == true)
   {
      randomShootingEnemy();
   }

   // if the blocker hit the top or bottom, reverse direction
   if (enemyPos.start.x < 0 || enemyPos.start.x > 460)
      enemyVelocity *= -1;

   if (enemyShoots[iShooter][jShooter].pos.y > 450)
   {
      canEnemyShoot = true;
   }

   for (var i = 0; i < ENEMY_I; i++)
   {
      for (var j = 0; j < ENEMY_J; j++)
      {
         if (enemyShoots[i][j].on == true)
         {
            if(enemyShoots[i][j].pos.y < 600)
            {
               enemyShoots[i][j].pos.y += enemyShootUpdate;
            }
            else
            {
               enemyShoots[i][j].on == false
               enemyShoots[i][j].pos = new Object();
            }
         }
         
      }
   }


   // update hero shoot positions
   heroShootUpdate = TIME_INTERVAL / 1000.0 * heroShootVelocity;
   for (var i = 0; i < heroShoots.length; i++)
   {
      heroShoots[i].y -= heroShootUpdate

      var sectionx = 
      Math.floor((heroShoots[i].x  - enemyPos.start.x) / ENEMY_IMG);
      var sectiony = 
      Math.floor((heroShoots[i].y  - enemyPos.start.y) / ENEMY_IMG);

      if (heroShoots[i].y < 0)
         heroShoots.splice(i, 1)
      // check for collision with enemies
      if ( 
         heroShoots[i].x >= enemyPos.start.x &&
         heroShoots[i].x + HERO_SHOOT_IMG  <= enemyPos.end.x && 
         heroShoots[i].y >= enemyPos.start.y &&
         heroShoots[i].y + HERO_SHOOT_IMG <= enemyPos.end.y &&
         !hitStates[sectionx][sectiony])
      {
         blockerSound.play(); // play blocker hit 

         hitStates[sectionx][sectiony] = true

         heroShoots.splice(i, 1) // shoot blow

         
         timeLeft += MISS_PENALTY; // penalize the user
      } // end if
   }


   if (cannonballOnScreen) // if there is currently a shot fired
   {
      // update cannonball position
      var interval = TIME_INTERVAL / 1000.0;

      cannonball.x += interval * cannonballVelocityX;
      cannonball.y += interval * cannonballVelocityY;

      // check for collision with blocker
      if ( cannonballVelocityX > 0 && 
         cannonball.x + cannonballRadius >= blockerDistance &&
         cannonball.x + cannonballRadius <= blockerDistance + lineWidth &&
         cannonball.y - cannonballRadius > blocker.start.y &&
         cannonball.y + cannonballRadius < blocker.end.y)
      {
         blockerSound.play(); // play blocker hit sound
         cannonballVelocityX *= -1; // reverse cannonball's direction
         timeLeft -= MISS_PENALTY; // penalize the user
      } // end if

      // check for collisions with left and right walls
      else if (cannonball.x + cannonballRadius > canvasWidth || 
         cannonball.x - cannonballRadius < 0)
      {
         cannonballOnScreen = false; // remove cannonball from screen
      } // end else if

      // check for collisions with top and bottom walls
      else if (cannonball.y + cannonballRadius > canvasHeight || 
         cannonball.y - cannonballRadius < 0)
      {
         cannonballOnScreen = false; // make the cannonball disappear
      } // end else if

      // check for cannonball collision with target
      else if (cannonballVelocityX > 0 && 
         cannonball.x + cannonballRadius >= targetDistance &&
         cannonball.x + cannonballRadius <= targetDistance + lineWidth &&
         cannonball.y - cannonballRadius > target.start.y &&
         cannonball.y + cannonballRadius < target.end.y)
      {
         // determine target section number (0 is the top)
         var section = 
            Math.floor((cannonball.y  - target.start.y) / pieceLength);

         // check whether the piece hasn't been hit yet
         if ((section >= 0 && section < TARGET_PIECES) && 
            !hitStates[section])
         {
            targetSound.play(); // play target hit sound
            hitStates[section] = true; // section was hit
            cannonballOnScreen = false; // remove cannonball
            timeLeft += HIT_REWARD; // add reward to remaining time

            // if all pieces have been hit
            if (++targetPiecesHit == TARGET_PIECES)
            {
               stopTimer(); // game over so stop the interval timer
               draw(); // draw the game pieces one final time
               showGameOverDialog("You Won!"); // show winning dialog
            } // end if
         } // end if
      } // end else if




   } // end if

   ++timerCount; // increment the timer event counter

   // if one second has passed
   if (TIME_INTERVAL * timerCount >= 1000)
   {
      --timeLeft; // decrement the timer
      ++timeElapsed; // increment the time elapsed
      timerCount = 0; // reset the count
   } // end if

   draw(); // draw all elements at updated positions

   // if the timer reached zero
   if (timeLeft <= 0)
   {
      stopTimer();
      showGameOverDialog("You lost"); // show the losing dialog
   } // end if
} // end function updatePositions

function updateHeroShoots()
{
   heroShootPos = new Object();
   heroShootPos.x = heroPos.x;
   heroShootPos.y = heroPos.y;
   heroShoots.push(heroShootPos);
}

function randomShootingEnemy()
{
   // rand shooter
   iShooter = Math.floor(Math.random() * 5); 
   jShooter = Math.floor(Math.random() * 4);
   // jShooter = 3;

   curiShooter = iShooter;
   curjShooter = jShooter;
   // is shooter exist?

   enemyShoots[iShooter][jShooter].on = true;
   enemyShoots[iShooter][jShooter].pos.x = enemyPos.start.x + ENEMY_IMG * (iShooter + 1) + (10 * iShooter) - (ENEMY_IMG / 2)
   enemyShoots[iShooter][jShooter].pos.y = enemyPos.start.y + ENEMY_IMG * (jShooter + 1) + (10 * jShooter)

   canEnemyShoot = false;
}




// fires a cannonball
function fireCannonball(event)
{
   if (cannonballOnScreen) // if a cannonball is already on the screen
      return; // do nothing

   var angle = alignCannon(event); // get the cannon barrel's angle

   // move the cannonball to be inside the cannon
   cannonball.x = cannonballRadius; // align x-coordinate with cannon
   cannonball.y = canvasHeight / 2; // centers ball vertically

   // get the x component of the total velocity
   cannonballVelocityX = (cannonballSpeed * Math.sin(angle)).toFixed(0);

   // get the y component of the total velocity
   cannonballVelocityY = (-cannonballSpeed * Math.cos(angle)).toFixed(0);
   cannonballOnScreen = true; // the cannonball is on the screen
   ++shotsFired; // increment shotsFired

   // play cannon fired sound
   cannonSound.play();
} // end function fireCannonball

// aligns the cannon in response to a mouse click
function alignCannon(event)
{
   // get the location of the click 
   var clickPoint = new Object();
   clickPoint.x = event.clientX;
   clickPoint.y = event.clientY;

   // compute the click's distance from center of the screen
   // on the y-axis
   var centerMinusY = (canvasHeight / 2 - clickPoint.y);

   var angle = 0; // initialize angle to 0

   // calculate the angle the barrel makes with the horizontal
   if (centerMinusY !== 0) // prevent division by 0
      angle = Math.atan(clickPoint.x / centerMinusY);

   // if the click is on the lower half of the screen
   if (clickPoint.y > canvasHeight / 2)
      angle += Math.PI; // adjust the angle

   // calculate the end point of the cannon's barrel
   barrelEnd.x = (cannonLength * Math.sin(angle)).toFixed(0);
   barrelEnd.y = 
      (-cannonLength * Math.cos(angle) + canvasHeight / 2).toFixed(0);

   return angle; // return the computed angle
} // end function alignCannon

// draws the game elements to the given Canvas
function draw()
{
   canvas.width = canvas.width; // clears the canvas (from W3C docs)
   // context.rotate(-90 * Math.PI / 180);
   // context.translate(-canvas.width, 0);
   // display time remaining
   context.fillStyle = "black";
   context.font = "bold 24px serif";
   context.textBaseline = "top";
   context.fillText("Time remaining: " + timeLeft, 5, 5);

   // initialize currentPoint to the starting point of the target
   var currentPoint = new Object();
   currentPoint.x = target.start.x;
   currentPoint.y = target.start.y; 

   context.drawImage(hero, heroPos.x, heroPos.y, HERO_IMG, HERO_IMG);
   
      // draw the target
      for (var i = 0; i < ENEMY_I; ++i)
      {
         for (var j = 0; j < ENEMY_J; j++)
         {
            extrai = (ENEMY_IMG + 10) * i
            extraj = (ENEMY_IMG + 10) * j
            if (hitStates[i][j] == false)
            {
               context.drawImage(enemy, extrai + enemyPos.start.x, canvasHeight / 25 + extraj, ENEMY_IMG, ENEMY_IMG);
            }

         }
      } 
      
      for (var i = 0; i < ENEMY_I; ++i)
      {
         for (var j = 0; j < ENEMY_J; j++)
         {
            if (enemyShoots[i][j].on == true)
            {
               context.drawImage(enemyShoot,enemyShoots[i][j].pos.x, enemyShoots[i][j].pos.y, ENEMY_SHOOT_IMG, ENEMY_SHOOT_IMG);
            }
         }
      }

      for (var i = 0; i < heroShoots.length; ++i)
      {
         context.drawImage(heroShoot,heroShoots[i].x,heroShoots[i].y, HERO_SHOOT_IMG, HERO_SHOOT_IMG);
      }


} // end function draw

// display an alert when the game ends
function showGameOverDialog(message)
{
   alert(message + "\nShots fired: " + shotsFired + 
      "\nTotal time: " + timeElapsed + " seconds ");
} // end function showGameOverDialog

window.addEventListener("load", setupGame, false);
