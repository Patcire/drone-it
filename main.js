import * as Tone from "tone";

// variables

let startedID
const synth = new Tone.FMSynth().toDestination()
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
    startSequencer()
}

// events

document.querySelector(".play").addEventListener("click", () => {
    /*playSynth()
    started()*/
    startSequencer()

})

document.querySelector(".stop").addEventListener("click", () => {
    cleanAndStopSequencer()
})

document.addEventListener("DOMContentLoaded", function() {
    stepSelector = document.querySelectorAll(".seq__step")
})