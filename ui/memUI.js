const memoryListDiv = document.getElementById("memoryListDiv");
const memPosToGoTo = document.getElementById("memPosToGoTo");
const memPosToGoToNumberSystem = document.getElementById("memPosToGoToNumberSystem");
const goToMemPos = document.getElementById("goToMemPos");

const regsDiv = document.getElementById("regsDiv");
const specialRegsDiv = document.getElementById("specialRegsDiv");

let startMemoryList = 0;
const memoryListLen = 50;

const selectNumberSystemOptions = {dec: 10, bin: 2, hex: 16};

goToMemPos.addEventListener("click", () => {
    startMemoryList = parseInt(memPosToGoTo.value, selectNumberSystemOptions[memPosToGoToNumberSystem.value]);

    createMemoryListDiv();
})

function createByteInput(value, memPlace, parentDiv) {
    const byteInputDiv = document.createElement("div");
    byteInputDiv.className = "byteInputDiv";

    const byteInput = document.createElement("input");
    byteInput.value = value;
    byteInput.className = "byteInput";
    byteInput.id = `bi${memPlace}`;
    byteInput.dataset.val = value;
    byteInput.dataset.memPlace = memPlace;
    byteInput.dataset.sId = `s${memPlace}`;

    byteInputDiv.appendChild(byteInput);

    const selectNumberSystem = document.createElement("select");
    selectNumberSystem.innerHTML = `<option>dec</option>
                                    <option>bin</option>
                                    <option>hex</option>`;

    selectNumberSystem.value = memPosToGoToNumberSystem.value;
    
    selectNumberSystem.dataset.biId = `bi${memPlace}`;
    selectNumberSystem.id = `s${memPlace}`;

    selectNumberSystem.className = "selectNumberSystem";

    byteInputDiv.appendChild(selectNumberSystem);

    parentDiv.appendChild(byteInputDiv);
}

function createByteInputListeners() {
    const byteInputSelects = document.querySelectorAll(".selectNumberSystem");

    byteInputSelects.forEach((byteInputSelect) => {
        byteInputSelect.addEventListener("change", () => {
            const byteInput = document.getElementById(byteInputSelect.dataset.biId);
            byteInput.value = parseInt(byteInput.dataset.val).toString(selectNumberSystemOptions[byteInputSelect.value]); 
        });
    });

    const byteInputs = document.querySelectorAll(".byteInput");
    byteInputs.forEach((byteInput) => {
        byteInput.addEventListener("change", () => {
            const selectNumberSystem = document.getElementById(byteInput.dataset.sId);
            const newVal = parseInt(byteInput.value, selectNumberSystemOptions[selectNumberSystem.value]);

            eval(`${byteInput.dataset.memPlace} = ${newVal}`);
            byteInput.dataset.val = newVal.toString(selectNumberSystemOptions[selectNumberSystem.value]);

            updatePCInMemoryList(byteInput.dataset.memPlace);
        });
    });
}

function updatePCInMemoryList(memPlace) {
    if (memPlace == "PC[0]") {
        const oldPCInMemory = document.querySelector(".memAtPC");
        if (oldPCInMemory) oldPCInMemory.className = "memoryAddress";

        const newPCInMemory = document.getElementById(`addrDiv${eval(memPlace)}`);
        if (newPCInMemory) newPCInMemory.className = "memoryAddress memAtPC";
    }
}

function createMemoryListDiv() {
    memoryListDiv.innerHTML = "";

    for (let address = startMemoryList; address <= startMemoryList + memoryListLen; address++) {
        const dataByte = memory[address];

        const addrDiv = document.createElement("div");
        addrDiv.id = `addrDiv${address}`;
        addrDiv.className = "memoryAddress" + ((PC[0] == address) ? " memAtPC" : "");

        const pAddr = document.createElement("p");
        pAddr.innerText = address.toString(selectNumberSystemOptions[memPosToGoToNumberSystem.value]);
        addrDiv.appendChild(pAddr);

        if (matchedInstructions[address]) {
            const pMatchedInstruction = document.createElement("p");
            pMatchedInstruction.innerText = matchedInstructions[address];
            pMatchedInstruction.className = "memAdresssMatchedInstruction";
            addrDiv.appendChild(pMatchedInstruction);
        }

        createByteInput(dataByte, `memory[${address}]`, addrDiv);

        memoryListDiv.appendChild(addrDiv);
    }

    createByteInputListeners();
}

function createRegList(regs, parentDiv) {
    parentDiv.innerHTML = "";
    regs.forEach((reg) => {
        const regDiv = document.createElement("div");
        regDiv.className = "regDiv";

        const regTag = document.createElement("p");
        regTag.innerText = reg;
        
        regDiv.appendChild(regTag);

        createByteInput(eval(`${reg}[0]`), `${reg}[0]`, regDiv);

        parentDiv.appendChild(regDiv);
    });

    createByteInputListeners();
}

createRegList(['A', 'B', 'C', 'D', 'E', 'H', 'L', 'IX', 'IY'], regsDiv); 
createRegList(['PC', 'SP', 'F', 'I', 'R'], specialRegsDiv); 
createMemoryListDiv();
