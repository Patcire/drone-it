import * as Tone from "tone";
import {addTemporalStyles} from "./helpers.js";


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
let selectedOctaves = ['4', '4', '4', '4', '4', '4', '4', '4']
let sequenceOfNotes = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E' ]
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
const bpmOutput = document.querySelector(".bpm-output")
const volumeInput = document.querySelector("#volume")
const onButton = document.querySelector('.on')
const sineButton = document.querySelector('#sine')
const squareButton = document.querySelector('#square')
const triangleButton = document.querySelector('#triangle')
const sawButton = document.querySelector('#saw')
const offButton = document.querySelector('.off')
const noteSelectors =  document.querySelectorAll('.seq__note')
const octPlusButtons =  document.querySelectorAll('.seq__oct-plus-buttons')
const octMinusButtons =  document.querySelectorAll('.seq__oct-minus-buttons')
const octValuesSelectors = document.querySelectorAll('.seq__oct-value')
const waveformSelectors = document.querySelectorAll('.waveform')
const selectOptions = document.querySelectorAll('.seq__note')

// methods

const adjustGain = (gainValue) =>{
    finalNodeOfChain.gain.value = gainValue
}

const playSynth = () => {

    synth.triggerAttackRelease(sequenceOfNotes[stepCounter-1]+selectedOctaves[stepCounter-1], "8n")
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

const handleOptionOctaves = (index) =>{
    const options = selectOptions[index].querySelectorAll('option')
    options.forEach((el)=> {
        el.textContent = el.textContent[0]+selectedOctaves[index]
    })
}

const handleOctavePlusSelection = (index) => {
    if (octValuesSelectors[index].textContent <= 7){
        octValuesSelectors[index].value = octValuesSelectors[index].textContent++
        selectedOctaves[index] = octValuesSelectors[index].textContent
        handleOptionOctaves(index)
        return
    }
    addTemporalStyles(octValuesSelectors[index], 'limit-reached', 500)
}

const handleOctaveMinusSelection = (index) => {
    if (octValuesSelectors[index].textContent >= 2){
        octValuesSelectors[index].value = octValuesSelectors[index].textContent--
        selectedOctaves[index] = octValuesSelectors[index].textContent
        handleOptionOctaves(index)
        return
    }
    addTemporalStyles(octValuesSelectors[index], 'limit-reached', 500)
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
    addTemporalStyles(bpmOutput, 'visibility', 700)
    bpmOutput.value = bpm
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
        sequenceOfNotes[index] = e.target.value
    })
})

octPlusButtons.forEach((el, index) => {
    el.addEventListener('click', (e)=>{
        e.preventDefault()
        handleOctavePlusSelection(index)
    })
})

octMinusButtons.forEach((el, index) => {
    el.addEventListener('click', (e)=>{
        e.preventDefault()
        handleOctaveMinusSelection(index)
    })
})

waveformSelectors.forEach((element, index) =>{
    element.addEventListener("click", (e) => {
        e.preventDefault()
        let previousWaveform = selectedWaveform
        // todo: function to catch the correct selector
        selectedWaveform = e.target.id
        console.log(selectedWaveform)
        e.target.children.item(0).src = '/'+selectedWaveform+'-yellow.svg'

        //selectedWaveform = e.target.id
        //let newButtonClicked =
        //window[lastButtonClicked].src = `/${selectedWaveform}-yellow.svg`
        //console.log(e.target.firstChild.src)
        //console.log(e.target.id)
    })
})

document.addEventListener("DOMContentLoaded", function() {
    stepSelector = document.querySelectorAll(".seq__step")
})