function pow (x, n) {
    if (n < 0 | Math.round(n) != n | n == 0 & x == 0 ) {
        return NaN;
    }
    return x**n;
}

module.exports = pow;
