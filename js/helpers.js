
export const addTemporalStyles = (selector, style) => {
    setTimeout(()=>{
        selector.classList.add(style)
    },100)

    setTimeout(()=>{
        selector.classList.remove(style)
    },500)
}