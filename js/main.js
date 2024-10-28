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

// seelctors

const bpmInput = document.querySelector("#bpm")
const onButton = document.querySelector('.on')
const offButton = document.querySelector('.off')

// methods

const handleStepsVisualStyles = () => {
    stepSelector[stepCounter-1].textContent === "1" && stepSelector[7].classList.remove("seq__step-active")

    if (stepSelector[stepCounter-1].textContent === stepCounter.toString()) {

        /*console.log('actual step', stepSelector[stepCounter - 1].textContent)*/
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

    stepTime = (60 / bpm ) * 1000

    startedID =setInterval(() => {

        handleStepsVisualStyles()
        playSynth()
        stepCounter<8 ? stepCounter++ : stepCounter = 1

    }, stepTime)

}


// events
onButton.addEventListener("click", () => {startSequencer()})

offButton.addEventListener("click", () => {
    cleanAndStopSequencer()
    stopAllSynthParameters()
})


bpmInput.addEventListener('change', (e) => {
    bpm = e.target.value
    let stepStorage = stepCounter
    cleanAndStopSequencer()
    stepCounter = stepStorage
    startSequencer()
})


document.addEventListener("DOMContentLoaded", function() {
    stepSelector = document.querySelectorAll(".seq__step")
})