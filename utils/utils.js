function processNumber(numberString) {
    const isNumber = numberString.match(/[0-9]+h?/);
    if (!isNumber) return 0;

    const num = numberString.match(/(\d+)(h?)/);
    return (num[2] == "h") ? parseInt(num[1], 16) : parseInt(num[1]);
}

function parseNumberList(numberListString) {
    numberListString = numberListString.replaceAll(" ", "");
    return numberListString.split(",").map(n => processNumber(n));
}

function ASCIItoNumberList(text) {
    return [...text].map(c => c.charCodeAt(0));
}
