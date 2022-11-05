function cp_r() {
    const valToSub = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    set8bitSubFlags(A[0], valToSub);

    PC[0] += 1;
}

function cp_at_hl() {
    const valToSub = memory[(H[0] << 8) + L[0]];

    set8bitSubFlags(A[0], valToSub);

    PC[0] += 1;
}

function cp_at_ix() {
    const valToSub = memory[IX[0] + memory[PC[0] + 2]];

    set8bitSubFlags(A[0], valToSub);

    PC[0] += 3;
}

function cp_at_iy() {
    const valToSub = memory[IY[0] + memory[PC[0] + 2]];

    set8bitSubFlags(A[0], valToSub);

    PC[0] += 3;
}

function cp_v() {
    const valToSub = memory[PC[0] + 1];

    set8bitSubFlags(A[0], valToSub);

    PC[0] += 2;
}

function jp_to_mn() {
    PC[0] = memory[PC[0] + 1] + (memory[PC[0] + 2] << 8);
}

function jp_to_hl() {
    PC[0] = (H[0] << 8) + L[0];
}

function jp_to_ix() {
    PC[0] = IX[0];
}

function jp_to_iy() {
    PC[0] = IY[0];
}

function jr_j() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 
    PC[0] = temp;
}

function jp_cond_to_mn() {
    const cond = getCondFromT6Code((memory[PC[0]] & parseInt("00111000", 2)) >> 3);
    if (checkCondition(cond)) PC[0] = memory[PC[0] + 1] + (memory[PC[0] + 2] << 8);
    else PC[0] += 3;
}

function jr_C_j() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 
    if (checkCondition("C")) PC[0] = temp;
    else PC[0] += 2;
}

function jr_NC_j() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 
    if (checkCondition("NC")) PC[0] = temp;
    else PC[0] += 2;
}

function jr_Z_j() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 
    if (checkCondition("Z")) PC[0] = temp;
    else PC[0] += 2;
}

function jr_NZ_j() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 
    if (checkCondition("NZ")) PC[0] = temp;
    else PC[0] += 2;
}

function djnz() {
    const temp = new Uint8Array(1);
    temp[0] = PC[0] + memory[PC[0] + 1] + 2; 

    B[0] -= 1;

    if (B[0] != 0) PC[0] = temp[0];
    else PC[0] += 2;
}
