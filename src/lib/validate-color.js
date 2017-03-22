exports.hex = function validateHex(hex) {
    if (hex[0] === "#") hex = hex.slice(1);
    if (hex.length !== 6 && hex.length !== 3) return false;

    var charList = "0123456789ABCDEF";

    for (var i = 0; i < hex.length; i++) {
        var c = hex[i];
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

exports.rgb = function validateRGB(rgb) {
    return rgb.r <= 1 && rgb.r >= 0
        && rgb.g <= 1 && rgb.g >= 0
        && rgb.b <= 1 && rgb.b >= 0;
}