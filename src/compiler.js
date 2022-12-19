let symbolTable = {};
let positionInMemory = 0;
let startPosInMemory = 0;
let PCstartPos = 0;

function compileToZ80(asm) {
    positionInMemory = 0;
    symbolTable = {};

    const preprocessedASM = processASM(asm);
    const outBytes = replaceSymbols(preprocessedASM);

    return [outBytes, startPosInMemory];
}

function processASM(asm) {
    const asmLines = asm.split(/\r?\n/);
    const preprocessedASM = [];

    asmLines.forEach((line, lineNumber) => {
        try {
            let {tag, lineNoTags} = processTag(line);
            let instruction = processInstruction(lineNoTags);

            if (Object.keys(tag).length != 0) preprocessedASM.push(tag);
            if (Object.keys(instruction).length != 0) preprocessedASM.push(instruction);
        }
        catch (e) {
            setCompilerError(lineNumber + 1); 
        }
    });

    return preprocessedASM;
}

function processTag(line) {
    const tag = {};

    const comment = line.match(/\;.*/);
    if (comment) line = line.replace(comment[0], "");

    const org = line.match(/org (\d+h?)/);
    if (org) {
        positionInMemory = processNumber(org[1]); 
        startPosInMemory = positionInMemory;
        PCstartPos = positionInMemory;
    }

    const memPos = line.match(/([a-zA-Z_]+)\:(.*)/);
    if (memPos) { 
        tag.memPos = positionInMemory; 
        symbolTable[memPos[1]] = positionInMemory;
        symbolTable[`${memPos[1]}_m`] = positionInMemory & parseInt("1111111100000000", 2);
        symbolTable[`${memPos[1]}_n`] = positionInMemory & parseInt("0000000011111111", 2);
        line = memPos[2];
    }

    const equ = line.match(/equ (.*)/);
    if (equ && memPos) {
        let equValue = equ[1];
        
        const equTag = equValue.match(/[a-z_]+/);
        if (equTag) {
            equTag.forEach((tag) => {
                equValue = equValue.replaceAll(tag, "symbolTable['" + tag + "']");
            })
        }

        const $ = positionInMemory;

        const valueToAdd = eval(equValue);
        symbolTable[memPos[1]] = valueToAdd;
    }

    let bytesPerVal = 1;

    const db = line.match(/db (.+)/);
    if (db) tag.vals = parseNumberList(db[1]);
    
    const dw = line.match(/dw (.+)/);
    if (dw) {
        tag.vals = parseNumberList(dw[1]);
        bytesPerVal = 2;
    }

    const ds = line.match(/ds (.+)/);
    if (ds) tag.vals = new Array(parseInt(ds[1])).fill(0);

    const defm = line.match(/defm "(.+)"/);
    if (defm) tag.vals = ASCIItoNumberList(defm[1]); 

    const end = line.match(/end ([a-z_]+)/);
    if (end) PCstartPos = symbolTable[`${end[1]}`]; 

    const valsLength = (tag.vals) ? tag.vals.length : 0;
    positionInMemory += bytesPerVal * valsLength;
    return {tag, lineNoTags: line}
}

function processInstruction(line) {
    const processedLine = {};

    const instructions = getInstructions();

    for (let instruction of instructions) {
        const match = line.match(instruction.instruction);

        if (match) {  
            processedLine.instructionBytes = getInstructionBytes(match, instruction);
            return processedLine;
        }
    }

    if (line.match(/([a-zA-Z_]+ ([a-zA-Z0-9]+|[a-zA-Z0-9]+, [a-zA-Z0-9]+)|[a-zA-Z_]+)/) &&
        !line.match(/(db|ds|defm|dw|org|end|equ).*/)) 
        throw "No matching instruction";

    return {};
}

function getInstructionBytes(lineMatch, instruction) {
    const processedLine = [];

    const tables = getTables();

    instruction.compilecode.forEach((code) => {
        let codeStringToAdd = code;

        let t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0;
        let t1_2 = 0, t2_2 = 0, t3_2 = 0, t4_2 = 0, t5_2 = 0;
        let v = 0, v_2 = 0;
        let d = 0, d_2 = 0;
        let m, n, m_2, n_2;
        let j = 0;
        let f = 0;
        let b = 0;

        if (lineMatch[2]) {
            t1 = (tables.table1[lineMatch[2]]) ? tables.table1[lineMatch[2]] : 0;
            t2 = (tables.table2[lineMatch[2]]) ? tables.table2[lineMatch[2]] : 0;
            t3 = (tables.table3[lineMatch[2]]) ? tables.table3[lineMatch[2]] : 0;
            t4 = (tables.table4[lineMatch[2]]) ? tables.table4[lineMatch[2]] : 0;
            t5 = (tables.table5[lineMatch[2]]) ? tables.table5[lineMatch[2]] : 0;

            f = (tables.table6[lineMatch[2]]) ? tables.table6[lineMatch[2]] : 0;

            m = (lineMatch[2].match(/^[a-z_]+/)) ? `${lineMatch[2]}_m` : (processNumber(lineMatch[2]) & parseInt("1111111100000000", 2));
            n = (lineMatch[2].match(/^[a-z_]+/)) ? `${lineMatch[2]}_n` : (processNumber(lineMatch[2]) & parseInt("0000000011111111", 2));

            v = (lineMatch[2].match(/^[a-z_]+/)) ?  `${lineMatch[2]}` : processNumber(lineMatch[2]);

            d = (lineMatch[2].match(/^[a-z_]+/)) ?  `${lineMatch[2]}` : processNumber(lineMatch[2]);

            j = (lineMatch[2].match(/^[a-z_]+/)) ?  `symbolTable["${lineMatch[2]}"] - ${positionInMemory} - 1` : processNumber(lineMatch[2]) - positionInMemory - 1;

            b = processNumber(lineMatch[2]);
        }
        if (lineMatch[3]) {
            t1_2 = (tables.table1[lineMatch[3]]) ? tables.table1[lineMatch[3]] : 0;
            t2_2 = (tables.table2[lineMatch[3]]) ? tables.table2[lineMatch[3]] : 0;
            t3_2 = (tables.table3[lineMatch[3]]) ? tables.table3[lineMatch[3]] : 0;
            t4_2 = (tables.table4[lineMatch[3]]) ? tables.table4[lineMatch[3]] : 0;
            t5_2 = (tables.table5[lineMatch[3]]) ? tables.table5[lineMatch[3]] : 0;

            m_2 = (lineMatch[3].match(/^[a-z_]+/)) ? `${lineMatch[3]}_m` : (processNumber(lineMatch[3]) & parseInt("1111111100000000", 2));
            n_2 = (lineMatch[3].match(/^[a-z_]+/)) ? `${lineMatch[3]}_n` : (processNumber(lineMatch[3]) & parseInt("0000000011111111", 2));

            v_2 = (lineMatch[3].match(/^[a-z_]+/)) ? `${lineMatch[3]}` : processNumber(lineMatch[3]);

            d_2 = (lineMatch[3].match(/^[a-z_]+/)) ? `${lineMatch[3]}` : processNumber(lineMatch[3]);
        }

        processedLine.push(eval(codeStringToAdd).toString());
        positionInMemory++;
    });

    return processedLine;
}

function replaceSymbols(preprocessedASM) {
    let outBytes = [];

    preprocessedASM.forEach((asmLine) => {
        if (asmLine.instructionBytes) {
            const instructionBytes = [];
            asmLine.instructionBytes.forEach((insByte) => {
                if (insByte.match(/^[a-zA-Z_]+$/)) instructionBytes.push(symbolTable[insByte]);
                else if (insByte.match(/[a-zA-Z_]+/)) instructionBytes.push(eval(insByte));
                else instructionBytes.push(insByte);
            });

            outBytes = outBytes.concat(instructionBytes);
        }
        else if (asmLine.vals) outBytes = outBytes.concat(asmLine.vals);
    });

    return new Uint8Array(outBytes);
}
