console.log('FIXIT - CONTENT.JS RUNNING')

const urlParams = new URLSearchParams(window.location.search);
const passage = urlParams.get('search');
const translations = urlParams.get('version').split(';');

console.log(Bible[BIBLE.MATTHEW]);
console.log(translations);

if(translations.length > 1) {
    console.log("multiple translations targetted. Fixit doing it's thing...");


    const targetElement = 'text Matt-23-2';

    // const cssSelector = '.' + targetClass.split(' ').join('.');     // Converts "text Matt-23-2" to ".text.Matt-23-2"
}
else {
    console.log("else reached. -not(hasMultipleVersions)")
}



