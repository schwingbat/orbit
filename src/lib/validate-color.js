exports.hex = function validateHex(value) {
    var newVal = value.split("");

    if (newVal[0] === "#") newVal.shift();
    if (newVal.length !== 6 && newVal.length !== 3) return false;

    var charList = "0123456789ABCDEF";

    for (var i = 0; i < newVal.length; i++) {
        var c = newVal[i];
        var match = false;

        for (var x = 0; x < charList.length; x++) {
            if (charList[x] === c.toUpperCase()) {
                match = true;
                break;
            }
        }

        if (!match) return false;
    }

    return true;
}

exports.hsl = function validateHSL(hsl) {
    return hsl.h <= 1 && hsl.h >= 0
        && hsl.s <= 1 && hsl.s >= 0
        && hsl.l <= 1 && hsl.l >= 0;
}