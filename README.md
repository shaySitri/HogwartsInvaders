# Hogwarts Invaders 🎮✨

Welcome to **Hogwarts Invaders**, a magical Space Invaders-inspired game where you defend Hogwarts from waves of Death Eaters. 🚀🧙‍♂️ Use your keyboard arrows to control your wizarding spaceship, shoot enemies, and dodge their attacks. Customize your game settings, track your score, and become a true champion of Hogwarts!

## Play the Game 🎉

You can play the game directly [here](https://web-development-environments-2023.github.io/assignment2-208909416_209405042/) 🌟

## 👥 Authors
- Itay Carmel (📧: carmelit@post.bgu.ac.il)
- Shay Sitri (📧: sitri@post.bgu.ac.il)


## Features ✨

- Classic Space Invaders gameplay with a magical twist 🪄
- Customizable controls and game settings ⚙️
- Scoring system with personal high scores 🏆
- **Responsive Layout**: Designed to run smoothly on Chrome with a minimum resolution of 1366x768.
- **Single HTML Page**: Managed through a single HTML page named `index.html`.
- **Game Screens**: Includes multiple screens for navigation and gameplay.
- **Magical Gameplay**: Features a playable Space Invaders-style game with scores, time limits, and customizable settings.


## Project Structure

- **`index.html`**: The main HTML file containing the layout and content.
- **`styles.css`**: CSS file for styling the layout and game elements.
- **`scripts.js`**: JavaScript file handling game logic and interactions.
- **`assets/`**: Directory containing magical images, sounds, and other media files.

## Screens and Navigation

1. **Welcome Screen 🧙‍♂️**
   - Displays Hogwarts' logo and name with two buttons:
     - **Register** 📝: Navigate to the registration page.
     - **Login** 🔑: Navigate to the login page.
    
        ![Uploading image.png…]()


2. **Registration Page ✍️**
   - Allows users to register with the following fields:
     - Username
     - Password
     - Confirm Password
     - First Name
     - Last Name
     - Email
     - Date of Birth (dropdowns for year, month, day)
   - Includes validation:
     - Passwords must match and be at least 8 alphanumeric characters.
     - First and last names must not contain numbers.
     - Email must be valid.

3. **Login Page 🔓**
   - Contains fields for:
     - Username
     - Password
     - Login button
   - Validates credentials against a predefined user array.
   - Allows login with default user (`username: p`, `password: testuser`).
   - Successful login leads to the game screen; invalid credentials show an error message.

4. **Game Screen 🛡️**
   - Features the main Hogwarts Invaders game with:
     - Player spaceship controlled by keyboard arrows.
     - Enemy Death Eaters arranged in a grid.
     - Shooting mechanics for both player and enemies.
     - Scoring based on the hit location of Death Eaters.
     - Timer and remaining lives display.
     - Speed increase for enemies every 5 seconds, up to a maximum of 4 increments.
     - End game scenarios with messages:
       - "Lost" if out of lives.
       - "You can do better" if time runs out with a score below 100.
       - "Winner!" if score is 100 or more.
       - "Champion!" if all Death Eaters are defeated.

5. **About Screen 📜**
   - Displayed in a modal dialog.
   - Contains credits, any templates or plugins used, and notes on challenges faced.
   - Can be closed by pressing ESC, clicking the X button, or clicking outside the dialog.

6. **Configuration Screen ⚙️**
   - Allows users to:
     - Choose a key for shooting.
     - Set the game duration (minimum 2 minutes).
     - Adjust other options (e.g., spaceship colors).
   - Includes a "Start Game" button that leads to the game screen.

## Design and Sound 🎨🔊

- **Design**: Distinct visuals for Hogwarts and Death Eaters. Includes a magical background and visual effects.
- **Sound**: Background music and sound effects for spells and hits.

## Scoring and History 🏆

- **Score Display**: Shows current score, remaining lives, and time left.
- **Score Handling**: Updated with each hit. Three misses end the game.
- **High Scores**: Displays score history and ranking after each game. Score is saved per player until a new player starts.

## How to Play 🎮

1. Use the arrow keys to navigate your spaceship ⬅️➡️⬆️⬇️.
2. Press the spacebar (or a chosen key) to shoot 🔫.
3. Avoid enemy attacks and destroy all enemies to score points 🎯.
4. Enjoy the magic and challenge of defending Hogwarts! 🏰


