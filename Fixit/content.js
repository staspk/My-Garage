console.log('FIXIT RUNNING...')

const urlParams = new URLSearchParams(window.location.search);
const passage = urlParams.get('search');                                //  '1John 1'
const translations = urlParams.get('version').split(';');               //  ['KJV', 'NASB', 'RSV', 'RUSV', 'NRT']

console.log(passage);
console.log(translations);


if(translations.length === 1) {
    console.log("one translation targetted. Fixit doing it's thing...");

    const logo = document.querySelector('.logo');
    logo.remove();

    const leftNavButtons = document.querySelector('.an-mobile-menu-closed');           // Goal: leave an empty red column running vertically on the keft side
    leftNavButtons.remove();

    const leftAd = document.querySelector('.sidebar-tall-ad');
    leftAd.remove();
    setTimeout(() => {
        const leftAd = document.querySelector('.sidebar-tall-ad');
        leftAd.remove();

        const leftNav = document.querySelector('nav');
        leftNav.style.minWidth = '100px';
    }, 1050);

    const passageDiv = document.querySelector('.passage-col');
    passageDiv.style.padding = '40px 500px 40px 500px';
}
else if(translations.length > 1) {
    console.log("multiple translations targetted. Fixit doing it's thing...");

    const leftNav = document.querySelector('nav');
    leftNav.style.pointerEvents = 'none';

    const leftNavButtons = document.querySelector('.an-mobile-menu-closed');           // Goal: leave an empty red column running vertically on the keft side
    leftNavButtons.remove();

    const content = document.querySelector('.content');                                // Goal: add padding to right side   
    content.style.padding = '32px 72px 21px 32px';

    const passageColumns = document.querySelectorAll('.passage-box .passage-col');     // Goal: change padding in reading columns from: 40px 60px, to: 40px 40px
    passageColumns.forEach(column => {
        column.style.padding = '40px 40px';
    });

    const passageLabels = document.querySelectorAll('.passage-display');               // Goal: remove redundant chapter/translation labels/buttons so that text begins at identical x-axis
    passageLabels.forEach(label => {
        label.remove();
    });




    const prevRect = document.querySelector('.prev-chapter');
    console.log(prevRect);
    console.log(prevRect.style);
    console.log(prevRect.style.top);
    // const box = prevRect.getBoundingClientRect();
    // console.log(box);

    
    // const newWidth = prevRect.clientWidth / 2; const newHeight = prevRect.clientHeight / 2;
    // prevRect.width = `${newWidth}px`; prevRect.height = `${newHeight}px`;
    // console.log(prevRect.style.left);
    

    const right = document.querySelector('.next-chapter');
    // console.log(right);

    const arrows = document.querySelectorAll('.prev-next path');
    // console.log(arrows);
    arrows.forEach(arrow => {
        arrow.style.transform = 'scale(.5, .5)';
    });

    const targetElement = 'text Matt-23-2';

    // const cssSelector = '.' + targetClass.split(' ').join('.');     // Converts "text Matt-23-2" to ".text.Matt-23-2"
}
else {
    console.log("else reached. -not(translations.length > 1)")
}



