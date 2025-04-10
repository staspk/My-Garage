


function waveLeft(container) {
    let option = {
        width: 17,
        spaceBetween: 13,
        trigger: '.sound-wave',
        column: 0,
        delay: 0
    }
    
    console.log(container.clientWidth)
    
    let element = option.trigger
    let length = container.clientWidth / option.width
    let waveHtml = ''
    
    let columnStep = 52
    let delayStep = 20
    
    console.log(`Length: ${length}`);
    
    const pageStartTime = performance.now();
    
    for (let i = 0; i < length; i++) {  
        
        if (columnStep <= 0) {
            columnStep = 15
            
            if (columnStep % 52 === 0) {
                columnStep = 46
            }
        }
        
        if (i % 20 === 0) {
            delayStep = 20
        }
        
        let animDelay = 0.1 + (0.05 * delayStep) - 0.05
        
        waveHtml += `<div class="wave-line line-${i+1} line${columnStep}" style="width: ${option.width-option.spaceBetween}px; animation-delay: ${animDelay}s"></div>`
        
        columnStep--
        delayStep--
    }
    
    const elapsedTime = performance.now() - pageStartTime;
    console.log(`Time to Process: ${elapsedTime}`)
    
    container.innerHTML = waveHtml;
}

window.onload = () => {
    div = document.getElementById('sound-wave');
    waveLeft(div);
    
    console.log(getViewport());
};