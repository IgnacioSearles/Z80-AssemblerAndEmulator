const editor = document.getElementById("editor");
const compileBtn = document.getElementById("compileBtn");

const compilerErrorText = document.getElementById("compilerErrorText");

function clearCompilerError() {
    compilerErrorText.innerText = "";
}

function setCompilerError(line) {
    compilerErrorText.innerText = "Error on line: " + line;
}

compileBtn.addEventListener("click", () => {
    clearCompilerError();

    const asm = editor.value;
    compileAndMoveToMem(asm);

    clearMatchedInstructions();

    PC[0] = PCstartPos;
    createRegList(['PC', 'SP', 'F', 'I', 'R'], specialRegsDiv); 

    createMemoryListDiv();
});

const fetchAtPcAndRunIns = document.getElementById("fetchAtPcAndRunIns");

fetchAtPcAndRunIns.addEventListener("click", () => {
    runNextInstruction();

    createMemoryListDiv();
    createRegList(['A', 'B', 'C', 'D', 'E', 'H', 'L', 'IX', 'IY'], regsDiv); 
    createRegList(['PC', 'SP', 'F', 'I', 'R'], specialRegsDiv); 
});

const fetchAtPcAndRunMultipleInsBtn = document.getElementById("fetchAtPcAndRunMultipleInsBtn");
const fetchAtPcAndRunMultipleIns = document.getElementById("fetchAtPcAndRunMultipleIns");

fetchAtPcAndRunMultipleInsBtn.addEventListener("click", () => {
    const insAmount = parseInt(fetchAtPcAndRunMultipleIns.value);
    
    let i = 0;
    const interval = setInterval(() => {
        if (i >= insAmount - 1) clearInterval(interval);
        runNextInstruction();
        i += 1;


        createMemoryListDiv();
        createRegList(['A', 'B', 'C', 'D', 'E', 'H', 'L', 'IX', 'IY'], regsDiv); 
        createRegList(['PC', 'SP', 'F', 'I', 'R'], specialRegsDiv); 
    }, 120);
})

const resetCPU = document.getElementById("resetCPU");

resetCPU.addEventListener("click", () => {
    A[0] = 0;
    B[0] = 0;
    C[0] = 0;
    D[0] = 0;
    E[0] = 0;

    H[0] = 0;
    L[0] = 0;

    I[0] = 0;
    R[0] = 0;

    IX[0] = 0;
    IY[0] = 0;

    PC[0] = 0;
    SP[0] = 0;

    F[0] = 0;

    memory.fill(0); 

    clearMatchedInstructions();

    createMemoryListDiv();
    createRegList(['A', 'B', 'C', 'D', 'E', 'H', 'L', 'IX', 'IY'], regsDiv); 
    createRegList(['PC', 'SP', 'F', 'I', 'R'], specialRegsDiv); 
});
