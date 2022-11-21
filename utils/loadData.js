let instructions = [];

const table1 = {"A": 7, "B": 0, "C": 1, "D": 2, "E": 3, "H": 4, "L": 5};
const table2 = {"BC": 0, "DE": 1, "HL": 2, "AF": 3};
const table3 = {"BC": 0, "DE": 1, "HL": 2, "SP": 3};
const table4 = {"BC": 0, "DE": 1, "IX": 2, "SP": 3};
const table5 = {"BC": 0, "DE": 1, "IY": 2, "SP": 3};
const table6 = {"NZ": 0, "Z": 1, "NC": 2, "C": 3, "PO": 4, "PE": 5, "P": 6, "M": 7};

fetch("./src/instructions.json")
    .then(res => res.json())
    .then(data => instructions = data);

function getInstructions() {
    return instructions;
}

function getTables() {
    return { table1, table2, table3, table4, table5, table6 };
}

function getRegFromT1Code(code) {
    return Object.keys(table1).find(key => table1[key] === code);
}

function getRegFromT2Code(code) {
    return Object.keys(table2).find(key => table2[key] === code);
}

function getRegFromT3Code(code) {
    return Object.keys(table3).find(key => table3[key] === code);
}

function getRegFromT4Code(code) {
    return Object.keys(table4).find(key => table4[key] === code);
}

function getRegFromT5Code(code) {
    return Object.keys(table5).find(key => table5[key] === code);
}

function getCondFromT6Code(code) {
    return Object.keys(table6).find(key => table6[key] === code);
}
