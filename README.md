
# · Drone it ·

![Logo of drone it](/public/LOGO.svg)

### 0. What it is?
***

*Drone it* is a little web FM synth focused on let users make some drone / noise sequences
easily.

### 1. Tech stack
***

*Drone it* it's heavily focused on web standards and it's build with  **vanilla JS, HTML5, CSS3**. It also use
[*Tone.js*](https://github.com/Tonejs/Tone.js) lib (a wrapper of native web audio api) to handle the
synth internal objects.

### 2. How to Run locally
***
    
    1. Clone the repo
    2. Install dependencies with: "npm install" or "pnpm install"
    3. Run "npm run dev" or "pnpm dev"
    4. Open browser with this url: "http://localhost:5173/"


### 3. Repo structure
***

* ***js*** folder: 
    * ***main.js*** --> All logic of synth and UI interactivity
    * ***helpers.js*** --> Some extra functions
* ***public*** folder:
  * all the SVGs used on the app
* ***style.css***:
    * all the CSS used on the app. I use *BEM* convention for classes.
* ***index.html***:
    * UI description

### 4. Code structure of ***main.js***
***

I divided the code in this sections to make it more maintainable:

* ***1 - General variables***: the declaration of all variables used on the code to handle UI and logical values
* ***2 - Synth variables***: The objects from Tone.js used and chained to create the synth
* ***3 - Selectors***: The variables that storage the UI HTML elements
* ***4 - Methods***: all functions
* ***5 - Events***: All the listeners that capture the events from user interaction


### 5. Screen waveform view feature
***

The screen feature that can be view on the web mode of the app is only an artistic addition to the synth.

Altough the main and plain waveform of the sound is extracted from the synth internals object *Tone.analyser*, when you apply some FX the result view **is not** a fidelity representation of the actual waveform but **an artistic representation** of what effects made. 

### 6. Credits and Licensing
***

Code, icons and logo by Patcire. 

Font used on logo and through the APP is "Sixtyfour" by "*Jens Kutílek*". Here the [repo](https://github.com/jenskutilek/homecomputer-fonts/tree/master/Sixtyfour)

Everyone have permission to fork and mod the code fron this repo and use it to make their own *uncommercial* things. Only requirement is credit me :) Same with icons, they are free to use for no commercial projects (with credits).

The use of the logo is not allowed.


### 7. A handmade web 
***

This project is a handmaded web, no AI generated. AI is useful as faster stackoverflow / google research (my only use of it) but shoudn't be the ghostwriter neither the captain of our human capabilities or artistic projects. It's important that internet remain for and from people and the web be more than a product, an artistic (and tolerant and respectful) expression of self and comunnities. 

There are many groups of people embracing this philosophy and this projects has the lucky of be included in one amazing project [Hypertext.tv](https://github.com/evadecker/hypertext.tv) by @evadecker that pursues it. So, I encorauge you to visit it, contribute and think about what future we want for the internet :)

**Update (06/07/2025)**: *To more I thought about it and the more I read it about it more I refuse to use AI even as a "faster google". So since last few weeks I don't use it at all and feel more conected with the project and the time that I dedicate to it and feel that I'm learning and consolidating more knowledge searching through the web than before* 😊

<small>If you want to read more about this theme I recommend you this blogpost! [Great Blogpost by Frank](https://www.frank.computer/blog/2024/06/llms-and-thoughts.html) :)<small>