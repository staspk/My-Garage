var starfield;

// window.requestAnimationFrame()

document.addEventListener('DOMContentLoaded', () => {
    const timetaken = performance.now() - pageStartTime;
    console.log(`DOMContentLoaded Event hit at: ${timetaken}`);
    console.log(window.requestAnimationFrame);
});

window.onload = () => {
    const timetaken = performance.now() - pageStartTime;
    console.log(`OnLoad Event hit at: ${timetaken}`);
    console.log(window.requestAnimationFrame);


    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    console.log(document.documentElement.clientWidth);
    console.log(document.documentElement.clientHeight);
    canvas.width = document.documentElement.clientWidth;  canvas.height = document.documentElement.clientHeight;

    starfield = new StarField(canvas, ctx);

    console.log(starfield);
};

window.addEventListener('resize', ()=>{
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    starfield.resize(width, height);
});