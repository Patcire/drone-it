import * as Tone from "tone";

// variables

let startedID
const synth = new Tone.FMSynth().toDestination()
let bpm = 60
let stepCounter = 1
let stepTime
let stepSelector = []

// methods

const startVisualSequencer = () => {
    console.log(stepSelector[stepCounter-1].textContent)
    console.log(stepCounter)
    console.log(stepSelector[stepCounter-1].textContent === stepCounter.toString())
    stepTime = (bpm / 60 ) * 1000

    startedID =setInterval(() => {

        stepSelector[stepCounter-1].textContent === stepCounter.toString() ?
            stepSelector[stepCounter-1].classList.add("seq__step-active")
            :
            stepSelector[stepCounter-1].classList.remove("seq__step-active")

        stepSelector[stepCounter-1].classList.remove("seq__step-active")
        stepCounter<8 ? stepCounter++ : stepCounter = 1


    }, stepTime)
}

const playSynth = () => {
   /* const now = Tone.now()*/
    synth.triggerAttackRelease("C4", "16n"/*, now*/)
   /* synth.triggerAttackRelease("E4", "16t", now+1.5)
    synth.triggerAttackRelease("D7", "16n", now+2.5)*/
}
function started() {
   /* startedID = setInterval(()=>{
        console.log('synth start')
        playSynth()
    }, stepTime)*/
    startVisualSequencer()
}

// events

document.querySelector(".play").addEventListener("click", () => {
    console.log('play')
    /*playSynth()
    started()*/
    startVisualSequencer()

})

document.querySelector(".stop").addEventListener("click", () => {
   stepCounter = 1
    clearInterval(startedID)
})

document.addEventListener("DOMContentLoaded", function() {
    stepSelector = document.querySelectorAll(".seq__step")
})