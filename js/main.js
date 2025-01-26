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
let revAmount = 0.1

// synth variables (tone.js objects)

const finalNodeOfChain = new Tone.Gain().toDestination()
const synth = new Tone.FMSynth().connect(finalNodeOfChain)
const osc = new Tone.Oscillator().connect(finalNodeOfChain)
const osc2 =  new Tone.Oscillator("A2", selectedWaveform).connect(finalNodeOfChain)
const timesTwo = new Tone.WaveShaper((val) => val * 2, 2048).connect(osc.frequency)
const signal = new Tone.Signal(440).connect(timesTwo)
const rev = new Tone.Reverb({decay: revAmount, preDelay: 0.10, wet: 0.8}).connect(finalNodeOfChain)

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
const reverbIconSelector = (document.querySelectorAll('.effect__img')).item(0)
const reverbInputSelector = (document.querySelectorAll('.effect__input')).item(0)
const destroyerIconSelector = (document.querySelectorAll('.effect__img')).item(1)
const destroyerInputSelector = (document.querySelectorAll('.effect__input')).item(1)
const delayIconSelector = (document.querySelectorAll('.effect__img')).item(2)
const delayInputSelector = (document.querySelectorAll('.effect__input')).item(2)

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
        let prevButton = document.querySelector(`#${selectedWaveform}`)
        prevButton.children.item(0).src = '/'+selectedWaveform+'.svg'
        selectedWaveform = e.target.id
        console.log(selectedWaveform)
        e.target.children.item(0).src = '/'+selectedWaveform+'-yellow.svg'
    })
})

reverbInputSelector.addEventListener('input', e =>{
    //reverbIconSelector.height = e.target.value
    e.preventDefault()
    revAmount = e.target.value
   if (revAmount === "0.01"){
       synth.disconnect(rev)
       revAmount = 0.001 // the api minimun
       return
   }
   rev["decay"] = revAmount
   synth.chain(rev)
} )

document.addEventListener("DOMContentLoaded", function() {
    stepSelector = document.querySelectorAll(".seq__step")
})