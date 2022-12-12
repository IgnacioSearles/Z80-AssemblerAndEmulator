function set8bitAddFlags(a, b) {
    let tempResult = a + b;
    let tempResult2 = (a & 127) + (b & 127);  

    if (tempResult >= 128) setFlag("P/V", 1);
    else setFlag("P/V", 0);

    setFlag("N", 0);

    if (tempResult == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (tempResult >= 128) setFlag("S", 1);
    else setFlag("S", 0);
  
    if (tempResult2 >= 128) setFlag("C", 1);
    else setFlag("C", 0);
}

function set8bitSubFlags(a, b) {
    let tempResult = a - b;

    if (tempResult < -128) setFlag("P/V", 1);
    else setFlag("P/V", 0);

    setFlag("N", 1);

    if (tempResult == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (tempResult < 0) setFlag("S", 1);
    else setFlag("S", 0);
  
    if (a < b) setFlag("C", 1);
    else setFlag("C", 0);
}

function a_add_r() {
    const valToAdd = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 1;
}

function a_add_at_hl() {
    const valToAdd = memory[(H[0] << 8) + L[0]];

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 1;
}

function a_add_at_ix() {
    const valToAdd = memory[IX[0] + memory[PC[0] + 2]];

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 3;
}

function a_add_at_iy() {
    const valToAdd = memory[IY[0] + memory[PC[0] + 2]];

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 3;
}

function a_add_v() {
    const valToAdd = memory[PC[0] + 1];

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 2;
}

function hl_add_r() {
    const regToAdd = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4);

    let valToAdd = 0;
    if (regToAdd == "SP") valToAdd = SP[0];
    else valToAdd = eval(`(${regToAdd[0]}[0] << 8) + ${regToAdd[1]}[0]`);

    setFlag("N", 0);

    let tempResult = (((H[0] << 8) + L[0]) & 32767) + (valToAdd & 32767);

    if (tempResult >= 32767) setFlag("C", 1);
    else setFlag("C", 0);

    H[0] += (valToAdd & parseInt("1111111100000000", 2)) >> 8;
    L[0] += (valToAdd & parseInt("11111111", 2));
    PC[0] += 1;
}

function ix_add_r() {
    const regToAdd = getRegFromT4Code((memory[PC[0] + 1] & parseInt("00110000", 2)) >> 4);

    let valToAdd = 0;
    if (regToAdd == "SP") valToAdd = SP[0];
    else if (regToAdd == "IX") valToAdd = IX[0];
    else valToAdd = eval(`(${regToAdd[0]}[0] << 8) + ${regToAdd[1]}[0]`);

    setFlag("N", 0);

    let tempResult = (IX[0] & 32767) + (valToAdd & 32767);

    if (tempResult >= 32767) setFlag("C", 1);
    else setFlag("C", 0);

    IX[0] += valToAdd;
    PC[0] += 2;
}

function iy_add_r() {
    const regToAdd = getRegFromT5Code((memory[PC[0] + 1] & parseInt("00110000", 2)) >> 4);

    let valToAdd = 0;
    if (regToAdd == "SP") valToAdd = SP[0];
    else if (regToAdd == "IY") valToAdd = IY[0];
    else valToAdd = eval(`(${regToAdd[0]}[0] << 8) + ${regToAdd[1]}[0]`);

    setFlag("N", 0);

    let tempResult = (IY[0] & 32767) + (valToAdd & 32767);

    if (tempResult >= 32767) setFlag("C", 1);
    else setFlag("C", 0);

    IY[0] += valToAdd;
    PC[0] += 2;
}

function a_adc_r() {
    const valToAdd = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`) + getFlag("C");

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 1;
}

function a_adc_at_hl() {
    const valToAdd = memory[(H[0] << 8) + L[0]] + getFlag("C");

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 1;
}

function a_adc_at_ix() {
    const valToAdd = memory[IX[0] + memory[PC[0] + 2]] + getFlag("C");

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 3;
}

function a_adc_at_iy() {
    const valToAdd = memory[IY[0] + memory[PC[0] + 2]] + getFlag("C");

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 3;
}

function a_adc_v() {
    const valToAdd = memory[PC[0] + 1] + getFlag("C");

    set8bitAddFlags(A[0], valToAdd);

    A[0] += valToAdd;
    PC[0] += 2;
}

function hl_adc_r() {
    const regToAdd = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4);

    let valToAdd = 0;
    if (regToAdd == "SP") valToAdd = SP[0] + getFlag("C");
    else valToAdd = eval(`(${regToAdd[0]}[0] << 8) + ${regToAdd[1]}[0]`) + getFlag("C");

    let tempResult = (((H[0] << 8) + L[0]) & 32767) + (valToAdd & 32767);

    if (tempResult >= 32767) setFlag("C", 1);
    else setFlag("C", 0);

    let tempResult2 = (H[0] << 8) + L[0] + valToAdd;

    if (tempResult2 >= 128) setFlag("P/V", 1);
    else setFlag("P/V", 0);

    setFlag("N", 0);

    if (tempResult2 == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (tempResult2 >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    H[0] += (valToAdd & parseInt("1111111100000000", 2)) >> 8;
    L[0] += (valToAdd & parseInt("11111111", 2));
    PC[0] += 2;
}

function a_sub_r() {
    const valToSub = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 1;
}

function a_sub_at_hl() {
    const valToSub = memory[(H[0] << 8) + L[0]];

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 1;
}

function a_sub_at_ix() {
    const valToSub = memory[IX[0] + memory[PC[0] + 2]];

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 3;
}

function a_sub_at_iy() {
    const valToSub = memory[IY[0] + memory[PC[0] + 2]];

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 3;
}

function a_sub_v() {
    const valToSub = memory[PC[0] + 1];

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 2;
}

function a_sbc_r() {
    const valToSub = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`) + getFlag("C");

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 1;
}

function a_sbc_at_hl() {
    const valToSub = memory[(H[0] << 8) + L[0]] + getFlag("C");

    set8bitSubFlags(A[0], valToSub);
   
    A[0] -= valToSub;
    PC[0] += 1;
}

function a_sbc_at_ix() {
    const valToSub = memory[IX[0] + memory[PC[0] + 2]] + getFlag("C");

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 3;
}

function a_sbc_at_iy() {
    const valToSub = memory[IY[0] + memory[PC[0] + 2]] + getFlag("C");

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 3;
}

function a_sbc_v() {
    const valToSub = memory[PC[0] + 1] + getFlag("C");

    set8bitSubFlags(A[0], valToSub);

    A[0] -= valToSub;
    PC[0] += 2;
}

function hl_sbc_r() {
    const regToSub = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4);

    let valToSub = 0;
    if (regToSub == "SP") valToSub = SP[0] + getFlag("C");
    else valToSub = eval(`(${regToAdd[0]}[0] << 8) + ${regToAdd[1]}[0]`) + getFlag("C");

    let tempResult = ((H[0] << 8) + L[0]) - valToSub;

    if (tempResult < -32768) setFlag("P/V", 1);
    else setFlag("P/V", 0);

    setFlag("N", 1);

    if (tempResult == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (tempResult < 0) setFlag("S", 1);
    else setFlag("S", 0);
  
    if (((H[0] << 8) + L[0]) < valToSub) setFlag("C", 1);
    else setFlag("C", 0);

    H[0] += (valToAdd & parseInt("1111111100000000", 2)) >> 8;
    L[0] += (valToAdd & parseInt("11111111", 2));
    PC[0] += 2;
}

function inc_r() {
    const regToInc = getRegFromT1Code((memory[PC[0]] & parseInt("00111000", 2)) >> 3); 
    const regToIncVal = eval(`${regToInc}[0]`);

    set8bitAddFlags(regToIncVal, 1);

    eval(`${regToInc}[0] += 1`);
    PC[0] += 1;
}

function inc_at_hl() {
    const valAtHl = memory[(H[0] << 8) + L[0]];
    set8bitAddFlags(valAtHl, 1);

    memory[(H[0] << 8) + L[0]] += 1;
    PC[0] += 1;
}

function inc_at_ix() {
    const valAtIX = memory[IX[0] + memory[PC[0] + 2]];
    set8bitAddFlags(valAtIX, 1);

    memory[IX[0] + memory[PC[0] + 2]] += 1;
    PC[0] += 3;
}

function inc_at_iy() {
    const valAtIY = memory[IY[0] + memory[PC[0] + 2]];
    set8bitAddFlags(valAtIY, 1);

    memory[IY[0] + memory[PC[0] + 2]] += 1;
    PC[0] += 3;
}

function inc_R() {
    const regToInc = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4); 

    if (regToInc == "SP") SP[0] += 1;
    else {
        let temp = eval(`(${regToInc[0]}[0] << 8) + ${regToInc[1]}[0]`) + 1;
        eval(`${regToInc[0]}[0] = temp & parseInt("1111111100000000", 2)`);
        eval(`${regToInc[1]}[0] = temp & parseInt("11111111", 2)`);
    }
    PC[0] += 1;
}

function inc_ix() {
    IX[0] += 1;
    PC[0] += 2;
}

function inc_iy() {
    IY[0] += 1;
    PC[0] += 2;
}

function dec_r() {
    const regToDec = getRegFromT1Code((memory[PC[0]] & parseInt("00111000", 2)) >> 3); 
    const regToDecVal = eval(`${regToDec}[0]`);

    set8bitSubFlags(regToDecVal, 1);

    eval(`${regToDec}[0] -= 1`);
    PC[0] += 1;
}

function dec_at_hl() {
    const valAtHl = memory[(H[0] << 8) + L[0]];
    set8bitSubFlags(valAtHl, 1);

    memory[(H[0] << 8) + L[0]] -= 1;
    PC[0] += 1;
}

function dec_at_ix() {
    const valAtIX = memory[IX[0] + memory[PC[0] + 2]];
    set8bitSubFlags(valAtIX, 1);

    memory[IX[0] + memory[PC[0] + 2]] -= 1;
    PC[0] += 3;
}

function dec_at_iy() {
    const valAtIY = memory[IY[0] + memory[PC[0] + 2]];
    set8bitSubFlags(valAtIY, 1);

    memory[IY[0] + memory[PC[0] + 2]] -= 1;
    PC[0] += 3;
}

function dec_R() {
    const regToDec = getRegFromT3Code((memory[PC[0]] & parseInt("00110000", 2)) >> 4); 

    if (regToDec == "SP") SP[0] -= 1;
    else {
        let temp = eval(`(${regToDec[0]}[0] << 8) + ${regToDec[1]}[0]`) - 1;
        eval(`${regToDec[0]}[0] = temp & parseInt("1111111100000000", 2)`);
        eval(`${regToDec[1]}[0] = temp & parseInt("11111111", 2)`);
    }
    PC[0] += 1;
}

function dec_ix() {
    IX[0] -= 1;
    PC[0] += 2;
}

function dec_iy() {
    IY[0] -= 1;
    PC[0] += 2;
}

function neg() {
    set8bitSubFlags(0, A[0]);
    A[0] = -A[0];

    PC[0] += 2;
}

function mlt() {
    const regToMlt = getRegFromT3Code((memory[PC[0] + 1] & parseInt("00110000", 2)) >> 4); 

    if (regToMlt == "SP") SP[0] = (SP[0] & parseInt("1111111100000000", 2)) * (SP[0] & parseInt("11111111", 2));
    else eval(`${regToMlt[1]}[0] = ${regToMlt[0]}[0] * ${regToMlt[1]}[0]`);

    PC[0] += 2;
}
