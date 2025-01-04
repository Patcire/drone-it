
export const addTemporalStyles = (selector, style, time) => {

    selector.classList.add(style)
    setTimeout(()=>{
        selector.classList.remove(style)
    },time)


}