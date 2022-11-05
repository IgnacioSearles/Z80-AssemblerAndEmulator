const editor = document.getElementById("editor");
const compileBtn = document.getElementById("compileBtn");

compileBtn.addEventListener("click", () => {
    const asm = editor.value;
    compileAndMoveToMem(asm);

    PC[0] = startPosInMemory;
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
