function print(varName, varValue) {
    if(varName && !varValue)
        console.log(varName);
    if(varName && varValue)
        console.log(`${varName}:`, varValue);
    if(!varName)
        console.log('\n');
}

class FixedElement {
    /**
     * Easily add offsetPx to element.top
     */
    static Top(element, offsetPx) {
        if (!(element instanceof Element))   throw new Error("FixedElement.Top():element must be instanceof Element");
        if (!Number.isInteger(offsetPx))  throw new TypeError(`FixedElement.Top():offsetPx must be an integer. offsetPx: ${offsetPx}`);

        const top = element.style.top;
        const currentPx = parseInt(top);
        const unitType = top.slice(top.length - 2);

        if (unitType !== 'px')
            throw new Error("FixedElement.Top() only supports px");

        element.style.top = `${currentPx + offsetPx}px`;
    }

    /**
     * Easily add offsetPx to element.left
     */
    static Left(element, offsetPx) {
        if (!(element instanceof Element))   throw new Error("FixedElement.Left():element must be instanceof Element");
        if (!Number.isInteger(offsetPx))  throw new TypeError(`FixedElement.Left():offsetPx must be an integer. offsetPx: ${offsetPx}`);

        const left = element.style.left;
        const currentPx = parseInt(left);
        const unitType = left.slice(left.length - 2);

        if (unitType !== 'px')
            throw new Error("FixedElement.Left() only supports px");

        element.style.left = `${currentPx + offsetPx}px`;
    }
}