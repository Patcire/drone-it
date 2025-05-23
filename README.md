
# · Drone it ·

![Logo of drone it](/public/LOGO.svg)

### 0. What it is?
*Drone it* is a little web FM synth focused on let users make some drone / noise sequences
easily.

### 1. Tech stack
*Drone it* it's heavily focused on web standards and it's build with  **vanilla JS, HTML5, CSS3**. It also use
*Tone.js* lib (a wrapper of native web audio api) to handle the
synth internal objects.

### 2. How to Run locally
    
    1. Clone the repo
    2. Install dependencies with: "npm install" or "pnpm install"
    3. Run "npm run dev" or "pnpm dev"
    4. Open browser with this url: "http://localhost:5173/"


### 3. Repo structure

* ***js*** folder: 
    * ***main.js*** --> All logic of synth and UI interactivity
    * ***helpers.js*** --> Some extra functions
* ***public*** folder:
  * all the SVGs used on the app
* ***style.css***:
    * all the CSS used on the app. I use *BEM* convention for classes.
* ***index.html***:
    * UI description

### 3. Code structure of ***main.js***

I divided the code in this sections to make it more maintainable:

* ***1 - General variables***: the declaration of all variables used on the code to handle UI and logical values
* ***2 - Synth variables***: The objects from Tone.js used and chained to create the synth
* ***3 - Selectors***: The variables that storage the UI HTML elements
* ***4 - Methods***: all functions
* ***5 - Events***: All the listeners that capture the events from user interaction
