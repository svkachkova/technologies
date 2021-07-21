
function divide(a, b, settings = {}) {
    if (b === 0) throw new Error("Maths doesn't work like that...");
    const { precision = 2 } = settings;
    return Number((a / b).toFixed(precision));
}

module.exports = divide;
