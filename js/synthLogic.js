import * as Tone from "tone";

/*************************************************/
/*--------- Here we control synth --------------*/
/*************************************************/

const synth = new Tone.FMSynth().toDestination()
const osc = new Tone.Oscillator().toDestination()
const osc2 = new Tone.Oscillator("C2").toDestination()
const timesTwo = new Tone.WaveShaper((val) => val * 2, 2048).connect(osc.frequency);
const signal = new Tone.Signal(440).connect(timesTwo)

export const playSynth = () => {
    synth.triggerAttackRelease("C4", "8n")

    osc.start()
    osc2.start()

}

export const stopAllSynthParameters = () =>{
    osc2.stop()

}