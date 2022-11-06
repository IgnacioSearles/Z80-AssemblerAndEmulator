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
