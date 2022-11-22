const memory = new Uint8Array(2 ** 16);

const A = new Uint8Array(1);
const B = new Uint8Array(1);
const C = new Uint8Array(1);
const D = new Uint8Array(1);
const E = new Uint8Array(1);

const H = new Uint8Array(1);
const L = new Uint8Array(1);

const I = new Uint8Array(1);
const R = new Uint8Array(1);

const IX = new Uint16Array(1);
const IY = new Uint16Array(1);

const PC = new Uint16Array(1);
const SP = new Uint16Array(1);

const F = new Uint8Array(1);

function compileAndMoveToMem(asm) {
    const [programBytes, startPos] = compileToZ80(asm);
    programBytes.forEach((b, i) => {
        memory[startPos + i] = b;
    });
}

function setFlagBit(bitValue, bitPosition) {
    const bitValueNormalized = bitValue ? 1 : 0;
    const clearMask = ~(1 << bitPosition);
    F[0] = (F[0] & clearMask) | (bitValueNormalized << bitPosition);
}

function setFlag(flag, val) {
    switch(flag) {
        case "S": setFlagBit(val, 7); break;
        case "Z": setFlagBit(val, 6); break;
        case "H": setFlagBit(val, 4); break;
        case "P/V": setFlagBit(val, 2); break;
        case "N": setFlagBit(val, 1); break;
        case "C": setFlagBit(val, 0); break;
        default: break;
    }
}

function getFlagBit(bit) {
    return (F[0] & (1 << bit)) >> bit;
}

function getFlag(flag) {
     switch(flag) {
        case "S": return getFlagBit(7);
        case "Z": return getFlagBit(6);
        case "H": return getFlagBit(4);
        case "P/V": return getFlagBit(2);
        case "N": return getFlagBit(1);
        case "C": return getFlagBit(0);
        default: return 0;
    }
}

function checkCondition(cond) {
    switch (cond) {
        case "NZ": return !getFlag("Z");
        case "Z": return getFlag("Z");
        case "C": return getFlag("C");
        case "NC": return !getFlag("C");
        case "PO": return !getFlag("P/V");
        case "PE": return getFlag("P/V");
        case "P": return !getFlag("S");
        case "M": return getFlag("S");
        default: return false;
    }
}

function runNextInstruction() {
    const instructions = getInstructions(); 

    for (const instruction of instructions) {
        const bytePatterns = instruction.bytePatterns;

        const memMatchesInstruction = bytePatterns.every((bytePattern, d) => {
            if (typeof bytePattern === "number") {
                if (memory[PC[0] + d] == bytePattern) return true;
                return false;
            }

            const memToCheck = ("00000000" + memory[PC[0] + d].toString(2)).substr(-8);
            if (memToCheck.match(bytePattern)) return true;
            return false;
        });

        if (memMatchesInstruction) {
            addMatchedInstruction(PC[0], instruction.fn);

            eval(`${instruction.fn}()`);
            R[0] += 1;
            break;
        }
    }
}

function halt() {
    return;
}

function nop() {
    PC[0] += 1;
}
