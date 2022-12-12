function r_to_r() {
    const regDest = getRegFromT1Code((memory[PC[0]] & parseInt("00111000", 2)) >>> 3);
    const regSource = getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2));

    eval(`${regDest}[0] = ${regSource}[0]`);
    PC[0] += 1;
}

function i_to_a() {
    A[0] = I[0];

    if (A[0] == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (A[0] >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    PC[0] += 2;
}

function r_to_a() {
    A[0] = R[0];

    if (A[0] == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (A[0] >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    PC[0] += 2;
}

function a_to_i() {
    I[0] = A[0];
    PC[0] += 2;
}

function a_to_r() {
    R[0] = A[0];
    PC[0] += 2;
}

function at_bc_to_a() {
    A[0] = memory[(B[0] << 8) + C[0]];

    PC[0] += 1;
}

function at_de_to_a() {
    A[0] = memory[(D[0] << 8) + E[0]];

    PC[0] += 1;
}

function a_to_at_bc() {
    memory[(B[0] << 8) + C[0]] = A[0];

    PC[0] += 1;
}

function a_to_at_de() {
    memory[(D[0] << 8) + E[0]] = A[0];

    PC[0] += 1;
}

function at_mn_to_a() {
    A[0] = memory[memory[PC[0] + 1] + (memory[PC[0] + 2] << 8)];

    PC[0] += 3;
}

function a_to_at_mn() {
    memory[memory[PC[0] + 1] + (memory[PC[0] + 2] << 8)] = A[0];

    PC[0] += 3;
}

function at_hl_to_r() {
    const regDest = getRegFromT1Code((memory[PC[0]] & parseInt("00111000", 2)) >>> 3);

    const valueAtHL = memory[(H[0] << 8) + L[0]];
    eval(`${regDest}[0] = valueAtHL;`);

    PC[0] += 1;
}

function r_to_at_hl() {
    const regSource = getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2));

    eval(`memory[(H[0] << 8) + L[0]] = ${regSource}[0];`);

    PC[0] += 1;
}

function at_ix_to_r() {
    const regDest = getRegFromT1Code((memory[PC[0] + 1] & parseInt("00111000", 2)) >>> 3);

    const valueAtIX = memory[IX[0] + memory[PC[0] + 2]];
    eval(`${regDest}[0] = valueAtIX;`);

    PC[0] += 3;
}

function at_iy_to_r() {
    const regDest = getRegFromT1Code((memory[PC[0] + 1] & parseInt("00111000", 2)) >>> 3);

    const valueAtIY = memory[IY[0] + memory[PC[0] + 2]];
    eval(`${regDest}[0] = valueAtIY;`);

    PC[0] += 3;
}

function r_to_at_ix() {
    const regSource = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    eval(`memory[IX[0]] = ${regSource}[0];`);

    PC[0] += 3;
}

function r_to_at_iy() {
    const regSource = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    eval(`memory[IY[0]] = ${regSource}[0];`);

    PC[0] += 3;
}

function v_to_r() {
    const regDest = getRegFromT1Code((memory[PC[0]] & parseInt("00111000", 2)) >>> 3);
    const value = memory[PC[0] + 1]; 

    eval(`${regDest}[0] = ${value}`);
    PC[0] += 2;
}

function v_to_at_hl() {
    const value = memory[PC[0] + 1]; 

    memory[L[0] + (H[0] << 8)] = value;
    PC[0] += 2;
}

function v_to_at_ix() {
    const value = memory[PC[0] + 3]; 

    memory[IX[0] + memory[PC[0] + 2]] = value;

    PC[0] += 4;
}

function v_to_at_iy() {
    const value = memory[PC[0] + 3]; 

    memory[IY[0] + memory[PC[0] + 2]] = value;

    PC[0] += 4;
}

function hl_to_sp() {
    SP[0] = (H[0] << 8) + L[0];

    PC[0] += 1;
}

function ix_to_sp() {
    SP[0] = IX[0];

    PC[0] += 2;
}

function iy_to_sp() {
    SP[0] = IY[0];

    PC[0] += 2;
}

function at_mn_to_hl() {
    L[0] = memory[memory[PC[0] + 1] + (memory[PC[0] + 2] << 8)]; 

    PC[0] += 3;
}

function at_mn_to_ix() {
    IX[0] = memory[memory[PC[0] + 2] + (memory[PC[0] + 3] << 8)]; 

    PC[0] += 4;
}

function at_mn_to_iy() {
    IY[0] = memory[memory[PC[0] + 2] + (memory[PC[0] + 3] << 8)]; 

    PC[0] += 4;
}

function hl_to_at_mn() {
    memory[memory[PC[0] + 1] + (memory[PC[0] + 2] << 8)] = L[0]; 

    PC[0] += 3;
}

function ix_to_at_mn() {
    memory[memory[PC[0] + 2] + (memory[PC[0] + 3] << 8)] = IX[0]; 

    PC[0] += 4;
}

function iy_to_at_mn() {
    memory[memory[PC[0] + 2] + (memory[PC[0] + 3] << 8)] = IY[0]; 

    PC[0] += 4;
}

function at_mn_to_r() {
    const regSource = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >>> 4);

    eval(`memory[memory[PC[0] + 2] + (memory[PC[0] + 3] << 8)] = ${regSource}[0];`);
    PC[0] += 4;
}

function r_to_at_mn() {
    const regDest = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >>> 4);

    eval(`${regDest}[0] = memory[memory[PC[0] + 2] + (memory[PC[0] + 3] << 8)];`);

    PC[0] += 4;
}

function mn_to_ix() {
    IX[0] = memory[PC[0] + 2] + (memory[PC[0] + 3] << 8);

    PC[0] += 4;
}

function mn_to_iy() {
    IY[0] = memory[PC[0] + 2] + (memory[PC[0] + 3] << 8);

    PC[0] += 4;
}

function mn_to_r() {
    const regDest = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >>> 4);

    if (regDest == "SP") SP[0] = memory[PC[0] + 1] + (memory[PC[0] + 2] << 8);
    else if (regDest == "HL") {
        H[0] = memory[PC[0] + 2];
        L[0] = memory[PC[0] + 1];
    }
    else eval(`${regDest}[0] = memory[PC[0] + 1] + (memory[PC[0] + 2] << 8);`);  

    PC[0] += 3;
}
