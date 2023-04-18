var canvas; // the canvas
var context; // used for drawing on the canvas

// constants for game play
var TARGET_PIECES = 20; // sections in the target
var MISS_PENALTY = 2; // seconds deducted on a miss
var HIT_REWARD = 3; // seconds added on a hit
var TIME_INTERVAL = 25; // screen refresh interval in milliseconds
var SPEEDER = 5000; // axlerate enemies and enemies shot.
var speed_interval;

var then;
var now;

// variables for the game loop and tracking statistics
var intervalTimer; // holds interval timer
var timerCount; // number of times the timer fired since the last second
var timeLeft; // the amount of time left in seconds
var timeElapsed; // the number of seconds elapsed

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

// player points
var pts;

// hero life
var life;

// initial start point
var initialXpoint;

// prizes
var prizes;
var prizesVelocity = 150;
var prizeFlag;
// hearts
var extaraLife = new Image();
// clock
var clock = new Image();
// visibillity
var cloap = new Image()
// var extaraLifeVelocity = 150;
var IMG_PRIZE = 60;


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


   // get sounds
   targetSound = document.getElementById( "targetSound" );
   cannonSound = document.getElementById( "cannonSound" );
   blockerSound = document.getElementById( "blockerSound" );
   
   hero.src = "pic/starship.jpg"
   enemy.src = "pic/bgud.jpg"
   enemyShoot.src = "pic/fire.jpg"
   heroShoot.src = "pic/heroShoot.jpg"
   extaraLife.src = "pic/heart.jpg"
   clock.src = "pic/clock.png"
   cloap.src = "pic/visible.png"

   enemyPos = new Object();
   enemyPos.start = new Object();
   enemyPos.end = new Object();
   enemyShoots = new Array(ENEMY_I);

   heroPos = new Object();
   heroShoots = new Array();
   // initialize hitStates as an array
   hitStates = new Array(ENEMY_I);
   prizeFlag = false;
   prizes = 
   [
      // extra life
      {
         pic: extaraLife,
         on: false,
         posx: new Object(),
         posy: new Object()
      },

      // clock
      {
         pic: clock,
         on: false,
         posx: new Object(),
         posy: new Object()
      },
      // visibility
      {
         pic: cloap,
         on: false,
         posx: new Object(),
         posy: new Object(),
         active: false,
         time : 0
      }

   ]


   keysDown = {};
   pts = 0;
   life = 3;

   // Check for keys pressed where key represents the keycode captured
	// Check for keys pressed where key represents the keycode captured
	addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);

	addEventListener("keyup", function (e) {

      now = Date.now()
      if (e.keyCode == keyCode && validSpacePress) { 

         updateHeroShoots();
      }
      else
      {
         delete keysDown[e.keyCode];

      }

   }, false);
   





} // end function setupGame

function createPrizes()
{
   rand = Math.floor(Math.random() * (prizes.length)); 


   prizes[rand].on = true;
   prizes[rand].posx = Math.floor(Math.random() * (canvasWidth - IMG_PRIZE));
   prizes[rand].posy = 0



   prizes[rand].on = true;
   prizes[rand].posx = Math.floor(Math.random() * (canvasWidth - IMG_PRIZE));
   prizes[rand].posy = 0
}

// delay between shoots
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
   intervalTimer = window.setInterval( updatePositions, TIME_INTERVAL );
   speed_interval = window.setInterval (updateSpeed, SPEEDER);
   // countdown.start();
} // end function startTimer

// terminate interval timer
function stopTimer()
{
   window.clearInterval( intervalTimer );
   window.clearInterval (speed_interval )
} // end function stopTimer

// called by function newGame to scale the size of the game elements
// relative to the size of the canvas before the game begins
function resetElements()
{
   var w = canvas.width;
   var h = canvas.height;
   canvasWidth = w; // store the width
   canvasHeight = h; // store the height


   // 180, 620
   enemyPos.start.x = (800 - (ENEMY_I * ENEMY_IMG + 10 * ENEMY_J))/2;
   enemyPos.end.x = 800 - enemyPos.start.x;
   enemyPos.start.y = canvasHeight / 25;
   enemyPos.end.y = enemyPos.start.y + 4 * ENEMY_IMG + (ENEMY_J - 1) * 10;
   enemyVelocity = 100;

   enemyShootVelocity = 100;

   heroVelocity = 256;
   heroShootVelocity = 256;
   heroPos.x = Math.floor(Math.random() * (800 - HERO_IMG));
   initialXpoint = heroPos.x;
   heroPos.y = canvasHeight - HERO_IMG;

   initPrizes();


} // end function resetElements


function initPrizes()
{
   prizes = 
   [
      // extra life
      {
         pic: extaraLife,
         on: false,
         posx: new Object(),
         posy: new Object()
      },

      // clock
      {
         pic: clock,
         on: false,
         posx: new Object(),
         posy: new Object()
      },
      // visibility
      {
         pic: cloap,
         on: false,
         posx: new Object(),
         posy: new Object(),
         active: false,
         time : 0
      }

   ]

}



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
   timeLeft = 10; // start the countdown at 10 seconds
   timerCount = 0; // the timer has fired 0 times so far
   shotsFired = 0; // set the initial number of shots fired
   timeElapsed = 0; // set the time elapsed to zero
   enemyVelocity = 150;
   canEnemyShoot = true; // enemy can shoot
   isHeroShoot = false;
   keysDown = {};
   pts = 0;
   initEnemyShoots()
   heroShoots = new Array();
	updatePositions();
   life = 3;

   // prevent double shooting from hero player
   then = Date.now();
   initPrizes();
   startTimer(); // starts the game loop


} // end function newGame

function updateSpeed()
{
   if (prizeFlag == false)
   {
      prizeFlag = true
   }
   else
   {
      prizeFlag = false;
      createPrizes();
   }
   if (Math.abs(enemyVelocity) < 300 && enemyShootVelocity < 300)
   {
      if (enemyVelocity > 0)
      {
         enemyVelocity += 50;
      }
      else
      {
         enemyVelocity -= 50;
      }
      enemyShootVelocity += 50;
   }
}


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
   document.getElementById("cords").innerHTML = life;

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

   if (enemyShoots[iShooter][jShooter].pos.y > 0.75 * canvasHeight)
   {
      canEnemyShoot = true;
   }

   for (var i = 0; i < ENEMY_I; i++)
   {
      for (var j = 0; j < ENEMY_J; j++)
      {

         if (enemyShoots[i][j].on == true)
         {
            if(enemyShoots[i][j].pos.y < canvasHeight)
            {
               enemyShoots[i][j].pos.y += enemyShootUpdate;

               if ( 
                  ((enemyShoots[i][j].pos.x  >= heroPos.x &&
                  enemyShoots[i][j].pos.x  <= heroPos.x + HERO_IMG) ||
                  (enemyShoots[i][j].pos.x + ENEMY_SHOOT_IMG  >= heroPos.x &&
                  enemyShoots[i][j].pos.x + ENEMY_SHOOT_IMG <= heroPos.x + HERO_IMG)) &&
                  enemyShoots[i][j].pos.y + ENEMY_SHOOT_IMG >= heroPos.y &&
                  enemyShoots[i][j].pos.y <= heroPos.y + HERO_IMG
                  )
               {
                  if (blockerSound.currentTime != 0)
                  {
                     blockerSound.pause()
                     blockerSound.currentTime = 0;
                  }
         
                  blockerSound.play(); // play blocker hit 
                  life = life - 1 // update player life
                  canEnemyShoot = true;
                  enemyShoots[i][j].on == false
                  enemyShoots[i][j].pos = new Object();
                  // back player to start point
                  heroPos.x = initialXpoint;
                  heroPos.y = canvasHeight - HERO_IMG;
                  
               } // end if

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
      Math.floor((heroShoots[i].x - enemyPos.start.x) / ENEMY_IMG);
      var sectiony = 
      Math.floor((heroShoots[i].y  - enemyPos.start.y) / ENEMY_IMG);

      if (heroShoots[i].y < 0)
         heroShoots.splice(i, 1)

      
      if ( 
         ((heroShoots[i].x + HERO_SHOOT_IMG >= enemyPos.start.x &&
         heroShoots[i].x + HERO_SHOOT_IMG <= enemyPos.end.x) ||
         (heroShoots[i].x >= enemyPos.start.x &&
            heroShoots[i].x <= enemyPos.end.x)) && 
         heroShoots[i].y + HERO_SHOOT_IMG >= enemyPos.start.y &&
         heroShoots[i].y + HERO_SHOOT_IMG <= enemyPos.end.y &&
         hitStates[sectionx][sectiony] == false)
      {
         if (blockerSound.currentTime != 0)
         {
            blockerSound.pause()
            blockerSound.currentTime = 0;
         }

         blockerSound.play(); // play blocker hit 

         hitStates[sectionx][sectiony] = true

         heroShoots.splice(i, 1) // shoot blow
         if (sectiony == 3)
            pts += 5
         else if (sectiony == 2)
            pts += 10
         else if (sectiony == 1)
            pts += 15;
         else if (sectiony == 0)
            pts += 20
         
         timeLeft += MISS_PENALTY; // penalize the user
      } // end if
   }

   prizeUpdate = TIME_INTERVAL / 1000.0 * prizesVelocity;
   for (var i = 0; i < prizes.length; i++)
   {
      if(prizes[i].on == true)
      {
         prizes[i].posy += prizeUpdate
         if (((prizes[i].posx  >= heroPos.x &&
            prizes[i].posx  <= heroPos.x + HERO_IMG) ||
            (prizes[i].posx + IMG_PRIZE  >= heroPos.x &&
               prizes[i].posx + IMG_PRIZE <= heroPos.x + HERO_IMG)) &&
               prizes[i].posy + IMG_PRIZE >= heroPos.y &&
               prizes[i].posy <= heroPos.y + HERO_IMG
            )
   
            {
               if(i == 0)
               {
                  life += 1
                  prizes[i].on = false;
               }
               else if(i == 1 )
               {
                  timeLeft += 5
                  prizes[i].on = false;
               }
               else if( i == 2 )
               {
                  prizes[2].on = false;
                  prizes[2].active = true
               }
            }
         else if (prizes[i].posy > canvasHeight)
         {
            prizes[i].on = false;
         }
      }
   }

   ++timerCount; // increment the timer event counter


   // if one second has passed
   if (TIME_INTERVAL * timerCount >= 1000)
   {
      --timeLeft; // decrement the timer
      ++timeElapsed; // increment the time elapsed
      if (prizes[2].active == true)
      {
         if (prizes[2].time < 6)
         {
            prizes[2].time += 1
         }
         else if (prizes[2].time == 6)
         {
            prizes[2].time = 0
            prizes[2].active = false
         }
         
      }
      timerCount = 0; // reset the count

   } // end if

   draw(); // draw all elements at updated positions


   if (pts == 250)
   {
      stopTimer();
      showGameOverDialog("Champion!");
   }
   // if the timer reached zero
   if ((life == 0))
   {
      stopTimer();
      showGameOverDialog("You lost"); // show the losing dialog
   } // end if
   if (timeLeft <= 0)
   {
      stopTimer();
      if (pts < 100)
      {
         showGameOverDialog("You Can Do Better! :( \nYou've got " + pts + " points."); // show the losing dialog
      }
      else if (pts < 250)
      {
         showGameOverDialog("Winner!"); 
      }
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
   
   do {
   // rand shooter
   iShooter = Math.floor(Math.random() * 5); 
   jShooter = Math.floor(Math.random() * 4);
   } while(hitStates[iShooter][jShooter] == true && pts < 250)

   // jShooter = 3;

   curiShooter = iShooter;
   curjShooter = jShooter;
   // only if enemy not kiiled 

   enemyShoots[iShooter][jShooter].on = true;
   enemyShoots[iShooter][jShooter].pos.x = enemyPos.start.x + ENEMY_IMG * (iShooter + 1) + (10 * iShooter) - (ENEMY_IMG / 2)
   enemyShoots[iShooter][jShooter].pos.y = enemyPos.start.y + ENEMY_IMG * (jShooter + 1) + (10 * jShooter)

   canEnemyShoot = false;
   
}


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

   for (var i = 0; i < prizes.length; i++)
   {
      if(prizes[i].on == true)
      {
         context.drawImage(prizes[i].pic,prizes[i].posx,prizes[i].posy, IMG_PRIZE, IMG_PRIZE);
      }
      if(prizes[2].active == true)
      {
         context.clearRect(heroPos.x, heroPos.y, HERO_IMG, HERO_IMG);
      }
   }


} // end function draw



// display an alert when the game ends
function showGameOverDialog(message)
{
   alert(message);
} // end function showGameOverDialog

window.addEventListener("load", setupGame, false);
