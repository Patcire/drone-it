import * as Tone from "tone";


/*************************************************/
/*--------- Here we control the UI --------------*/
/*----------- and General Logic -----------------*/
/*************************************************/

//  general variables

let startedID
let bpm = 60
let stepCounter = 1
let stepTime
let stepSelector = []
let volumeValue = -12

// synth variables (tone.js objects)

const volume = new Tone.Volume(0).toDestination()
const synth = new Tone.FMSynth().connect(volume)
const osc = new Tone.Oscillator().connect(volume)
const osc2 = new Tone.Oscillator("C2").connect(volume)
const timesTwo = new Tone.WaveShaper((val) => val * 2, 2048).connect(osc.frequency)
const signal = new Tone.Signal(440).connect(timesTwo)


// selectors

const bpmInput = document.querySelector("#bpm")
const volumeInput = document.querySelector("#volume")
const onButton = document.querySelector('.on')
const offButton = document.querySelector('.off')

// methods

export const playSynth = () => {

    synth.triggerAttackRelease("C4", "8n")

    osc.start()
    osc2.start()
}

export const stopAllSynthParameters = () =>{
    osc2.stop()

}

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
        playSynth(volumeValue)
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