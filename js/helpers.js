
export const addTemporalStyles = (selector, style, time) => {
    selector.classList.add(style)
    setTimeout(()=>{
        selector.classList.remove(style)
    },time)
}

export const setContextStyles = (context, lineWidth, strokeColor, shadowColor, shadowBlur, offX, offY) =>{
    context.lineWidth = lineWidth
    context.strokeStyle = strokeColor
    context.shadowColor = shadowColor
    context.shadowBlur = shadowBlur
    context.shadowOffsetX = offX;
    context.shadowOffsetY = offY;
    return context
}

export const convertBufferSampleIntoCoordinates = (sampleIndex, analyser, canvas) => {
    // analyser samples indexes goes from 0- 1023 (1024 samples)
    const x = sampleIndex / analyser.size * canvas.width
    const y = (1 -analyser.getValue()[sampleIndex]) * canvas.height
    return {x, y}
}

export const calculateNumberOfLinesThroughDelay = (delayOnSecons) =>{
    return delayOnSecons.toString().split('.')[1]
}

export const delayPainting = (context, numberDelayLines) =>{
    for (let i= 1; i<=numberDelayLines; i++){
        context.beginPath() // new path, same context
        context.rect(i *numberDelayLines,i*numberDelayLines, i*numberDelayLines, i*numberDelayLines)
        context.stroke()
    }
}