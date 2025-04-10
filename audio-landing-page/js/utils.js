function getViewport() {
    const array = [0, 0];
    array[0] = document.documentElement.clientWidth;
    array[1] = document.documentElement.clientHeight;
    
    return array;
}