function cpl() {
    setFlag("H", 1);
    setFlag("N", 1);

    A[0] = A[0] ^ 255;

    PC[0] += 1;
}

function setAndFlags(a, b) {
    let temp = a & b;

    setFlag("H", 1);
    setFlag("N", 0);
    setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P/V", temp & 1);
}

function setOrFlags(a, b) {
    let temp = a | b;

    setFlag("H", 0);
    setFlag("N", 0);
    setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P/V", temp & 1);
}

function setXorFlags(a, b) {
    let temp = a ^ b;

    setFlag("H", 0);
    setFlag("N", 0);
    setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P/V", temp & 1);
}

function a_and_r() {
    const valToAnd = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    setAndFlags(A[0], valToAnd);

    A[0] &= valToAnd;
    PC[0] += 1;
}

function a_and_at_hl() {
    const valToAnd = memory[(H[0] << 8) + L[0]];

    setAndFlags(A[0], valToAnd);

    A[0] &= valToAnd;
    PC[0] += 1;
}

function a_and_at_ix() {
    const valToAnd = memory[IX[0] + memory[PC[0] + 2]];

    setAndFlags(A[0], valToAnd);

    A[0] &= valToAnd;
    PC[0] += 3;
}

function a_and_at_iy() {
    const valToAnd = memory[IY[0] + memory[PC[0] + 2]];

    setAndFlags(A[0], valToAnd);

    A[0] &= valToAnd;
    PC[0] += 3;
}

function a_and_v() {
    const valToAnd = memory[PC[0] + 1];

    setAndFlags(A[0], valToAnd);

    A[0] &= valToAnd;
    PC[0] += 2;
}

function a_or_r() {
    const valToOr = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    setOrFlags(A[0], valToOr);

    A[0] |= valToOr;
    PC[0] += 1;
}

function a_or_at_hl() {
    const valToOr = memory[(H[0] << 8) + L[0]];

    setOrFlags(A[0], valToOr);

    A[0] |= valToOr;
    PC[0] += 1;
}

function a_or_at_ix() {
    const valToOr = memory[IX[0] + memory[PC[0] + 2]];

    setOrFlags(A[0], valToOr);

    A[0] |= valToOr;
    PC[0] += 3;
}

function a_or_at_iy() {
    const valToOr = memory[IY[0] + memory[PC[0] + 2]];

    setOrFlags(A[0], valToOr);

    A[0] |= valToOr;
    PC[0] += 3;
}

function a_or_v() {
    const valToOr = memory[PC[0] + 1];

    setOrFlags(A[0], valToOr);

    A[0] |= valToOr;
    PC[0] += 2;
}

function a_xor_r() {
    const valToXor = eval(`${getRegFromT1Code(memory[PC[0]] & parseInt("00000111", 2))}[0]`);

    setXorFlags(A[0], valToXor);

    A[0] ^= valToXor;
    PC[0] += 1;
}

function a_xor_at_hl() {
    const valToXor = memory[(H[0] << 8) + L[0]];

    setXorFlags(A[0], valToXor);

    A[0] ^= valToXor;
    PC[0] += 1;
}

function a_xor_at_ix() {
    const valToXor = memory[IX[0] + memory[PC[0] + 2]];

    setXorFlags(A[0], valToXor);

    A[0] ^= valToXor;
    PC[0] += 3;
}

function a_xor_at_iy() {
    const valToXor = memory[IY[0] + memory[PC[0] + 2]];

    setXorFlags(A[0], valToXor);

    A[0] ^= valToXor;
    PC[0] += 3;
}

function a_xor_v() {
    const valToXor = memory[PC[0] + 1];

    setXorFlags(A[0], valToXor);

    A[0] ^= valToXor;
    PC[0] += 2;
}


function setSlaFlags(a) {
    let temp = a << 1;

    setFlag("H", 0);
    setFlag("N", 0);

    if (a >= 128) setFlag("C", 1);
    else setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P", 0);
}

function sla_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    setSlaFlags(eval(`${regToShift}[0]`));

    eval(`${regToShift}[0] = ${regToShift}[0] << 1`);
    PC[0] += 2;
}

function sla_at_hl() {
    setSlaFlags(memory[(H[0] << 8) + L[0]]);

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] << 1;
    PC[0] += 2;
}

function sla_at_ix() {
    setSlaFlags(memory[IX[0] + memory[PC[0] + 2]]);

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] << 1;
    PC[0] += 4;
}

function sla_at_iy() {
    setSlaFlags(memory[IY[0] + memory[PC[0] + 2]]);

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] << 1;
    PC[0] += 4;
}

function setSraFlags(a) {
    let temp = a & 1 + a >> 1;

    setFlag("H", 0);
    setFlag("N", 0);

    if ((a & 1) == 128) setFlag("C", 1);
    else setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P", 0);
}

function sra_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    setSraFlags(eval(`${regToShift}[0]`));

    eval(`${regToShift}[0] = ${regToShift}[0] & 1 + ${regToShift}[0] >> 1`);
    PC[0] += 2;
}

function sra_at_hl() {
    setSraFlags(memory[(H[0] << 8) + L[0]]);

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] & 1 + memory[(H[0] << 8) + L[0]] >> 1;
    PC[0] += 2;
}

function sra_at_ix() {
    setSraFlags(memory[IX[0] + memory[PC[0] + 2]]);

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] & 1 + memory[IX[0] + memory[PC[0] + 2]] >> 1;
    PC[0] += 4;
}

function sra_at_iy() {
    setSraFlags(memory[IY[0] + memory[PC[0] + 2]]);

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] & 1 + memory[IY[0] + memory[PC[0] + 2]] >> 1;
    PC[0] += 4;
}

function setSrlFlags(a) {
    let temp = a >> 1;

    setFlag("H", 0);
    setFlag("N", 0);

    if ((a & 1) == 1) setFlag("C", 1);
    else setFlag("C", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    setFlag("P", 0);
}

function srl_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    setSrlFlags(eval(`${regToShift}[0]`));

    eval(`${regToShift}[0] = ${regToShift}[0] >> 1`);
    PC[0] += 2;
}

function srl_at_hl() {
    setSrlFlags(memory[(H[0] << 8) + L[0]]);

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] >> 1;
    PC[0] += 2;
}

function srl_at_ix() {
    setSrlFlags(memory[IX[0] + memory[PC[0] + 2]]);

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] >> 1;
    PC[0] += 4;
}

function srl_at_iy() {
    setSrlFlags(memory[IY[0] + memory[PC[0] + 2]]);

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] >> 1;
    PC[0] += 4;
}

function setRlFlags(a) {
    setFlag("P/V", getFlag("C"));
    const temp = a << 1 + getFlag("C");

    setFlag("C", (a & 128) >> 8);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    setFlag("H", 0);
    setFlag("N", 0);
}

function rla() {
    A[0] = A[0] << 1 + getFlag("C");

    setFlag("P/V", getFlag("C"));

    setFlag("C", (A[0] & 128) >> 8);

    setFlag("H", 0);
    setFlag("N", 0);

    PC[0] += 1;
}

function rl_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    eval(`${regToShift}[0] = ${regToShift}[0] << 1 + getFlag("C")`);

    setRlFlags(eval(`${regToShift}[0]`));

    PC[0] += 2;
}

function rl_at_hl() {
    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] << 1 + getFlag("C");

    setRlFlags(memory[(H[0] << 8) + L[0]]);

    PC[0] += 2;
}

function rl_at_ix() {
    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] << 1 + getFlag("C");

    setRlFlags(memory[IX[0] + memory[PC[0] + 2]]);

    PC[0] += 4;
}

function rl_at_iy() {
    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] << 1 + getFlag("C");

    setRlFlags(memory[IY[0] + memory[PC[0] + 2]]);

    PC[0] += 4;
}

function setRlcFlags(a) {
    setFlag("C", (a & 128) >> 8);
    setFlag("P/V", getFlag("C"));

    const temp = a << 1 + getFlag("C");

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    setFlag("H", 0);
    setFlag("N", 0);
}

function rlca() {
    setFlag("C", (A[0] & 128) >> 8);
    setFlag("P/V", getFlag("C"));

    A[0] = A[0] << 1 + getFlag("C");

    setFlag("H", 0);
    setFlag("N", 0);

    PC[0] += 1;
}

function rlc_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    setRlcFlags(eval(`${regToShift}[0]`));

    eval(`${regToShift}[0] = ${regToShift}[0] << 1 + getFlag("C")`);
    PC[0] += 2;
}

function rlc_at_hl() {
    setRlcFlags(memory[(H[0] << 8) + L[0]]);

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] << 1 + getFlag("C");
    PC[0] += 2;
}

function rlc_at_ix() {
    setRlcFlags(memory[IX[0] + memory[PC[0] + 2]]);

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] << 1 + getFlag("C");
    PC[0] += 4;
}

function rlc_at_iy() {
    setRlcFlags(memory[IY[0] + memory[PC[0] + 2]]);

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] << 1 + getFlag("C");
    PC[0] += 4;
}

function setRrFlags(a) {
    setFlag("P/V", getFlag("C"));
    const temp = a >> 1 + (getFlag("C") << 8);

    setFlag("C", a & 1);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    setFlag("H", 0);
    setFlag("N", 0);
}

function rra() {
    A[0] = A[0] >> 1 + (getFlag("C") << 8);

    setFlag("P/V", getFlag("C"));

    setFlag("C", A[0] & 1);

    setFlag("H", 0);
    setFlag("N", 0);

    PC[0] += 1;
}

function rr_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    eval(`${regToShift}[0] = ${regToShift}[0] >> 1 + (getFlag("C") << 8)`);

    setRrFlags(eval(`${regToShift}[0]`));

    PC[0] += 2;
}

function rl_at_hl() {
    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] >> 1 + (getFlag("C") << 8);

    setRrFlags(memory[(H[0] << 8) + L[0]]);

    PC[0] += 2;
}

function rl_at_ix() {
    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] >> 1 + (getFlag("C") << 8);

    setRrFlags(memory[IX[0] + memory[PC[0] + 2]]);

    PC[0] += 4;
}

function rl_at_iy() {
    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] >> 1 + (getFlag("C") << 8);

    setRrFlags(memory[IY[0] + memory[PC[0] + 2]]);

    PC[0] += 4;
}

function setRrcFlags(a) {
    setFlag("C", a & 1);
    setFlag("P/V", getFlag("C"));

    const temp = a >> 1 + (getFlag("C") << 8);

    if (temp == 0) setFlag("Z", 1);
    else setFlag("Z", 0);

    if (temp >= 128) setFlag("S", 1);
    else setFlag("S", 0);

    setFlag("H", 0);
    setFlag("N", 0);
}

function rlca() {
    setFlag("C", A[0] & 1);
    setFlag("P/V", getFlag("C"));

    A[0] = A[0] >> 1 + (getFlag("C") << 8);

    setFlag("H", 0);
    setFlag("N", 0);

    PC[0] += 1;
}

function rrc_r() {
    const regToShift = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));

    setRrcFlags(eval(`${regToShift}[0]`));

    eval(`${regToShift}[0] = ${regToShift}[0] >> 1 + (getFlag("C") << 8)`);
    PC[0] += 2;
}

function rrc_at_hl() {
    setRrcFlags(memory[(H[0] << 8) + L[0]]);

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] >> 1 + (getFlag("C") << 8);
    PC[0] += 2;
}

function rrc_at_ix() {
    setRrcFlags(memory[IX[0] + memory[PC[0] + 2]]);

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] >> 1 + (getFlag("C") << 8);
    PC[0] += 4;
}

function rrc_at_iy() {
    setRrcFlags(memory[IY[0] + memory[PC[0] + 2]]);

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] >> 1 + (getFlag("C") << 8);
    PC[0] += 4;
}

function set_b_of_r() {
    const reg = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));
    const b = (memory[PC[0] + 1] & parseInt("00111000", 2)) >> 3;

    eval(`${reg}[0] = ${reg}[0] | (1 << b);`);

    PC[0] += 2;
}

function set_b_of_at_hl() {
    const b = (memory[PC[0] + 1] & parseInt("00111000", 2)) >> 3;

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] | (1 << b);

    PC[0] += 2;
}

function set_b_of_at_ix() {
    const b = (memory[PC[0] + 3] & parseInt("00111000", 2)) >> 3;

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] | (1 << b);
    PC[0] += 4;
}

function set_b_of_at_iy() {
    const b = (memory[PC[0] + 3] & parseInt("00111000", 2)) >> 3;

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] | (1 << b);
    PC[0] += 4;
}

function res_b_of_r() {
    const reg = getRegFromT1Code(memory[PC[0] + 1] & parseInt("00000111", 2));
    const b = (memory[PC[0] + 1] & parseInt("00111000", 2)) >> 3;

    eval(`${reg}[0] = ${reg}[0] & (255 ^ (1 << b));`);

    PC[0] += 2;
}

function res_b_of_at_hl() {
    const b = (memory[PC[0] + 1] & parseInt("00111000", 2)) >> 3;

    memory[(H[0] << 8) + L[0]] = memory[(H[0] << 8) + L[0]] & (255 ^ (1 << b));

    PC[0] += 2;
}

function res_b_of_at_ix() {
    const b = (memory[PC[0] + 3] & parseInt("00111000", 2)) >> 3;

    memory[IX[0] + memory[PC[0] + 2]] = memory[IX[0] + memory[PC[0] + 2]] & (255 ^ (1 << b));
    PC[0] += 4;
}

function res_b_of_at_iy() {
    const b = (memory[PC[0] + 3] & parseInt("00111000", 2)) >> 3;

    memory[IY[0] + memory[PC[0] + 2]] = memory[IY[0] + memory[PC[0] + 2]] & (255 ^ (1 << b));
    PC[0] += 4;
}
