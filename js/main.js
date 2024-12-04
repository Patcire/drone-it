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
let gainValue = 0
let selectedOctave = '4'
let sequenceOfNotes = [`E${selectedOctave}`, `E${selectedOctave}`, `E${selectedOctave}`, `E${selectedOctave}`, `E${selectedOctave}`, `E${selectedOctave}`, `E${selectedOctave}`, `E${selectedOctave}`]
const waveforms = ['sine', 'square', 'triangle', 'saw']
let selectedWaveform = 'sine'
// synth variables (tone.js objects)
const finalNodeOfChain = new Tone.Gain().toDestination()
const synth = new Tone.FMSynth().connect(finalNodeOfChain)
const osc = new Tone.Oscillator().connect(finalNodeOfChain)
const osc2 =  new Tone.Oscillator("A2", selectedWaveform).connect(finalNodeOfChain)
const timesTwo = new Tone.WaveShaper((val) => val * 2, 2048).connect(osc.frequency)
const signal = new Tone.Signal(440).connect(timesTwo)

// selectors

const bpmInput = document.querySelector("#bpm")
const volumeInput = document.querySelector("#volume")
const onButton = document.querySelector('.on')
const sineButton = document.querySelector('#sine')
const squareButton = document.querySelector('#square')
const triangleButton = document.querySelector('#triangle')
const sawButton = document.querySelector('#saw')
const offButton = document.querySelector('.off')
const noteSelectors =  document.querySelectorAll('.seq__note')
const octSelectors =  document.querySelectorAll('.seq__oct-selector')
const waveformSelectors = document.querySelectorAll('.waveform')

// methods

const adjustGain = (gainValue) =>{
    finalNodeOfChain.gain.value = gainValue
}

const playSynth = () => {

    synth.triggerAttackRelease(sequenceOfNotes[stepCounter-1], "8n")
    osc.start()
    osc2.baseType = selectedWaveform
    osc2.start()

}

const stopAllSynthParameters = () =>{
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


bpmInput.addEventListener('input', (e) => {
    bpm = e.target.value
    let stepStorage = stepCounter
    cleanAndStopSequencer()
    stepCounter = stepStorage
    startSequencer()
})

volumeInput.addEventListener('input', (e) => {
    adjustGain(e.target.value)
})


noteSelectors.forEach( (element, index) => {
    element.addEventListener("change", (e) => {
        e.preventDefault()
        sequenceOfNotes[index] = (e.target.value)
        console.log(sequenceOfNotes)
    })
})

octSelectors.forEach((el, index) => {
    el.addEventListener('click', (e)=>{
        e.preventDefault()
        console.log(selectedOctave, e.target.value)
        e.target.value === '+' ? selectedOctave = selectedOctave++ : selectedOctave = selectedOctave--
        console.log('selectedOct:', selectedOctave)
    })
})

waveformSelectors.forEach((element, index) =>{
    element.addEventListener("click", (e) => {
        e.preventDefault()
        selectedWaveform = (e.target.id)
    })
})


document.addEventListener("DOMContentLoaded", function() {
    stepSelector = document.querySelectorAll(".seq__step")
})