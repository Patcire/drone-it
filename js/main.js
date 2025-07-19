import * as Tone from "tone";
import {
    addTemporalStyles,
    calculateNumberOfLinesThroughDelay,
    convertBufferSampleIntoCoordinates, delayPainting, handleStyle,
    setContextStyles
} from "./helpers.js";


/*************************************************/
/*--------- Here we control the UI --------------*/
/*----------- and General Logic -----------------*/
/*************************************************/

//  general variables

let startedID = null
let bpm = 60
let stepCounter = 1
let stepTime
let stepSelector = []
let selectedOctaves = ['4', '4', '4', '4', '4', '4', '4', '4']
let sequenceOfNotes = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E' ]
let selectedWaveform = 'sine'
let revAmount = 0.1 // can't be 0
let reversedBitValue = 16
let oldBitValue = 2
let actualBitValue = 0
let delayOnSeconds = 0
let animationID = null
let context = null
let lineWidth = 2
let strokeColor = '#393E46'
let shadowColor = 'black'
let shadowBlur = 3
let offX= 0
let offY = 2
let cleanGlitch = null
let intervalGlitch = null
let numberDelayLines = null

// synth variables (tone.js objects)

/*
OLD SYNTH ENGINE
const finalNodeOfChain = new Tone.Gain().toDestination()
const synth = new Tone.FMSynth().connect(finalNodeOfChain)
const osc = new Tone.Oscillator(null, selectedWaveform).connect(finalNodeOfChain)
const osc2 =  new Tone.Oscillator("A2", selectedWaveform).connect(finalNodeOfChain)
const timesTwo = new Tone.WaveShaper((val) => val * 2, 2048).connect(osc.frequency)
const signal = new Tone.Signal(440).connect(timesTwo) // no remove, is used!!
const rev = new Tone.Reverb({decay: revAmount, preDelay: 0.10, wet: 0.8}).connect(finalNodeOfChain)
const dest = new Tone.BitCrusher({bits: reversedBitValue}).connect(finalNodeOfChain)
let delay = new Tone.PingPongDelay({delayTime: delayOnSeconds, feedback:0}).connect(finalNodeOfChain)
const analyser = new Tone.Analyser("waveform", 256)
*/

const synth = new Tone.FMSynth({oscillator: {type: "sine"}}).toDestination()
const osc2 =  new Tone.Oscillator("A2", selectedWaveform).toDestination()
const rev = new Tone.Reverb({decay: revAmount, preDelay: 0.10, wet: 0.8}).toDestination()
const dest = new Tone.BitCrusher({bits: reversedBitValue}).toDestination()
let delay = new Tone.PingPongDelay({delayTime: delayOnSeconds, feedback:0}).toDestination()
const analyser = new Tone.Analyser("waveform", 256)

// selectors

const bpmInput = document.querySelector("#bpm")
const bpmOutput = document.querySelector(".bpm-output")
const volumeInput = document.querySelector("#volume")
const onButton = document.querySelector('.on')
const offButton = document.querySelector('.off')
const noteSelectors =  document.querySelectorAll('.seq__note')
const octPlusButtons =  document.querySelectorAll('.seq__oct-plus-buttons')
const octMinusButtons =  document.querySelectorAll('.seq__oct-minus-buttons')
const octValuesSelectors = document.querySelectorAll('.seq__oct-value')
const waveformSelectors = document.querySelectorAll('.waveform')
const selectOptions = document.querySelectorAll('.seq__note')
const reverbInputSelector = (document.querySelectorAll('.effect__input')).item(0)
const destroyerInputSelector = (document.querySelectorAll('.effect__input')).item(1)
const delayInputSelector = (document.querySelectorAll('.effect__input')).item(2)
const canvas = document.querySelector('.screen')

// methods

const adjustGain = (gainValue) =>{
    finalNodeOfChain.gain.value = gainValue
}

const playSynth = () => {
    synth.connect(analyser)

    synth.triggerAttackRelease(sequenceOfNotes[stepCounter-1]+selectedOctaves[stepCounter-1], "8n")
    //osc.start()
    osc2.volume.value = -12
    osc2.start()
}

const stopAllSynthParameters = () =>{
    osc2.stop()
}

const handleStepsVisualStyles = () => {
    stepSelector[stepCounter-1].textContent === "1" && stepSelector[7].classList.remove("seq__step-active")

    if (stepSelector[stepCounter-1].textContent === stepCounter.toString()) {

        stepSelector[stepCounter - 1].classList.add("seq__step-active")
        stepSelector[stepCounter-1].textContent>"1" && stepSelector[stepCounter-2].classList.remove("seq__step-active")

    }

}

const handleOptionOctaves = (index) =>{
    const options = selectOptions[index].querySelectorAll('option')
    options.forEach((el)=> {
        if (el.textContent !== "--"){
            el.textContent = el.textContent[0]+selectedOctaves[index]
        }
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
    startedID = setInterval(() => {
        handleStepsVisualStyles()
        playSynth()
        stepCounter<8 ? stepCounter++ : stepCounter = 1
    }, stepTime)
    paintOnCanvas()

}

const clearCanvas = (context) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

const paintOnCanvas = () =>{

    context = canvas.getContext('2d')
    const path = new Path2D()
    clearCanvas(context)
    context = setContextStyles(context, lineWidth, strokeColor, shadowColor, shadowBlur, offX, offY)
    path.moveTo(0, canvas.height/2)
    for (let i=0; i < analyser.size; i++){
        const {x, y} = convertBufferSampleIntoCoordinates(i, analyser, canvas)
        path.lineTo(x, y/2)
    }
    context.stroke(path)
    numberDelayLines > 0 && delayPainting(context, numberDelayLines)
    animationID = requestAnimationFrame(paintOnCanvas)
}

// events

onButton.addEventListener("click", () => {
    startSequencer()
    handleStyle(true, onButton, 'selected')
    handleStyle(false, offButton, 'selected')
})

offButton.addEventListener("click", () => {
    // synth cleaning
    cleanAndStopSequencer()
    stopAllSynthParameters()
    //ui cleaning
    handleStyle(false, onButton, 'selected')
    handleStyle(true, offButton, 'selected')
    // screen canvas cleaning
    clearCanvas(context)
    cancelAnimationFrame(animationID)
    intervalGlitch = null
    cleanGlitch = null
})

bpmInput.addEventListener('input', (e) => {
    bpm = e.target.value
    addTemporalStyles(bpmOutput, 'visibility', 700)
    bpmOutput.value = bpm
    let stepStorage = stepCounter
    cleanAndStopSequencer()
    stepCounter = stepStorage
    startedID !== null && startSequencer()
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

        // icon changes of color
        let prevButton = document.querySelector(`#${selectedWaveform}`)
        prevButton.children.item(0).src = '/'+selectedWaveform+'.svg'
        selectedWaveform = e.target.id
        e.target.children.item(0).src = '/'+selectedWaveform+'-yellow.svg'

        // audio reaction
        synth.oscillator.type = selectedWaveform
        osc2.baseType = selectedWaveform
    })

})

reverbInputSelector.addEventListener('input', e =>{

    e.preventDefault()
    revAmount = e.target.value
    if (revAmount === "0.01"){
       synth.disconnect(rev)
       revAmount = 0.001 // the api minimun
       return
    }
    rev["decay"] = revAmount
    synth.chain(rev)

    // visual effect on canvas
    shadowBlur = revAmount * 1.2
    offY = revAmount * 1.5

} )

destroyerInputSelector.addEventListener('input', e =>{
    // destroyer is only a bitcrusher,
    // so with the least bits "more destroyed the audio is"
    // on html input range, when user drag to the right, the value grow,
    // but we want that when the user drag the range to the right
    // feel his music more "destroyed". In short, we must manipulate the range to inverse

    e.preventDefault()
    if (e.target.value === "0"){
        // audio
        synth.disconnect(dest)
        oldBitValue = 2
        actualBitValue = 0
        // visual effect on canvas
        context.setTransform(1, 0, 0, 1, 0, 0) //og values
        clearInterval(intervalGlitch)
        clearInterval(cleanGlitch)
        cleanGlitch = null
        intervalGlitch = null
        return
    }
    // audio
    const maxBitsValue = 12
    actualBitValue = e.target.value
    reversedBitValue = maxBitsValue - actualBitValue
    dest.set({bits: reversedBitValue, wet: 0.8})
    synth.chain(dest)
    oldBitValue = e.target.value

    // visual effect on canvas
    if (intervalGlitch === null){
        intervalGlitch = setInterval(()=>{
            context.setTransform(1.5/reversedBitValue-2, 1/reversedBitValue, 3.5/reversedBitValue*2.6, reversedBitValue/7, 0, 0)
        },200)

        cleanGlitch = setInterval(()=>{
            context.setTransform(1, 0, 0, 1, 0, 0) //og values
        },300)
    }
})

delayInputSelector.addEventListener('input', e =>{
    e.preventDefault()
    delayOnSeconds = e.target.value
    numberDelayLines = calculateNumberOfLinesThroughDelay(delayOnSeconds)
    if (delayOnSeconds === "0"){
        synth.disconnect(delay)
        delayOnSeconds = 0
        return
    }
    // audio
    delay.delayTime.value = delayOnSeconds
    delay.feedback.value = delayOnSeconds <= 0.5 ?  delay.delayTime.value + 0.3 : 0.9
    synth.chain(delay)

} )


document.addEventListener("DOMContentLoaded", function() {
    stepSelector = document.querySelectorAll(".seq__step")
})