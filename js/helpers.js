
export const addTemporalStyles = (selector, style, time) => {
    selector.classList.add(style)
    setTimeout(()=>{
        selector.classList.remove(style)
    },time)
}

export const convertBufferSampleIntoCoordinates = (sampleIndex, analyser, canvas) => {
    // analyser samples indexes goes from 0- 1023 (1024 samples)
    console.log(sampleIndex, analyser.getValue()[sampleIndex])
    const x = sampleIndex / analyser.size * canvas.width
    const y = (1 -analyser.getValue()[sampleIndex]) * canvas.height
    return {x, y}
}