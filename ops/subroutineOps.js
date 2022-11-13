function push_r() {
    const regToPush = getRegFromT2Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4);

    eval(`memory[SP[0] - 1] = ${regToPush[0]}[0]`); 
    eval(`memory[SP[0] - 2] = ${regToPush[1]}[0]`); 
    SP[0] -= 2;

    PC[0] += 1;
}

function push_ix() {
    memory[SP[0] - 1] = (IX[0] & parseInt("1111111100000000", 2)) >> 8;
    memory[SP[0] - 2] = IX[0] & parseInt("11111111", 2);

    SP[0] -= 2;

    PC[0] += 2;
}


function push_iy() {
    memory[SP[0] - 1] = (IY[0] & parseInt("1111111100000000", 2)) >> 8;
    memory[SP[0] - 2] = IY[0] & parseInt("11111111", 2);

    SP[0] -= 2;

    PC[0] += 2;
}

function pop_r() {
    const regToPopTo = getRegFromT2Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4);

    eval(`${regToPopTo[0]}[0] = memory[SP[0] + 1];`); 
    eval(`${regToPopTo[1]}[0] = memory[SP[0]];`); 
    SP[0] += 2;

    PC[0] += 1;
}

function pop_ix() {
    IX[0] = (memory[SP[0] + 1] << 8) + memory[SP[0]];

    SP[0] += 2;

    PC[0] += 2;
}


function pop_iy() {
    IY[0] = (memory[SP[0] + 1] << 8) + memory[SP[0]];

    SP[0] += 2;

    PC[0] += 2;
}

function call() {
    let returnDir = PC[0] + 3;
    memory[SP[0] - 1] = (returnDir & parseInt("1111111100000000", 2)) >> 8;
    memory[SP[0] - 2] = returnDir & parseInt("11111111", 2);

    PC[0] = (memory[PC[0] + 2] << 8) + memory[PC[0] + 1];

    SP[0] -= 2;
}

function ret() {
    PC[0] = (memory[SP[0] + 1] << 8) + memory[SP[0]];

    SP[0] += 2;
}
