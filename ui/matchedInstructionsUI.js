let matchedInstructions = {};

function addMatchedInstruction(posInMem, instruction) {
    matchedInstructions[posInMem] = instruction;
}

function clearMatchedInstructions() {
    matchedInstructions = {};
}
