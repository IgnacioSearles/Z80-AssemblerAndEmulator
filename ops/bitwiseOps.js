function cpl() {
    setFlag("H", 1);
    setFlag("N", 1);

    A[0] = A[0] ^ 255;

    PC[0] += 1;
}
