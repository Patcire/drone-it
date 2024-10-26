import {playSynth, stopAllSynthParameters} from "./synthLogic.js";


/*************************************************/
/*--------- Here we control the UI --------------*/
/*----------- and General Logic -----------------*/
/*************************************************/

// variables

let startedID
let bpm = 60
let stepCounter = 1
let stepTime
let stepSelector = []

// methods

const handleStepsVisualStyles = () => {
    stepSelector[stepCounter-1].textContent === "1" && stepSelector[7].classList.remove("seq__step-active")

    if (stepSelector[stepCounter-1].textContent === stepCounter.toString()) {

        console.log('actual step', stepSelector[stepCounter - 1].textContent)
        stepSelector[stepCounter - 1].classList.add("seq__step-active")
        stepSelector[stepCounter-1].textContent>"1" && stepSelector[stepCounter-2].classList.remove("seq__step-active")

    }

}

const cleanAndStopSequencer = () => {

    // clean visually
    stepSelector.forEach((item)=> item.classList.remove("seq__step-active"))

    // stop it
    stepCounter = 1
    clearInterval(startedID)
}

const startSequencer = () => {

    stepTime = (bpm / 60 ) * 1000

    startedID =setInterval(() => {

        handleStepsVisualStyles()
        playSynth()
        stepCounter<8 ? stepCounter++ : stepCounter = 1

    }, stepTime)

}


// events
document.querySelector(".on").addEventListener("click", () => {

    startSequencer()

})

document.querySelector(".off").addEventListener("click", () => {
    cleanAndStopSequencer()
    stopAllSynthParameters()
})

document.addEventListener("DOMContentLoaded", function() {
    stepSelector = document.querySelectorAll(".seq__step")
})