import * as Tone from "tone";

let startedID
const synth = new Tone.Synth().toDestination()

const playSynth = () => {
    const now = Tone.now()
    synth.triggerAttackRelease("C4", "16n", now)
    synth.triggerAttackRelease("E4", "16t", now+1.5)
    synth.triggerAttackRelease("D7", "16n", now+2.5)
}

const started = () => {
    startedID = setInterval(()=>{
        playSynth()
    }, 2000)
}

document.querySelector(".play").addEventListener("click", () => {
    playSynth()
    started()

})

document.querySelector(".stop").addEventListener("click", () => {
   clearInterval(startedID)
})
