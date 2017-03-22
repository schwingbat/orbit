exports.hex = function validateHex(value) {
    var newVal = value.split("");

    if (newVal[0] === "#") newVal.shift();
    if (newVal.length !== 6 && newVal.length !== 3) return false;

    var charList = "0123456789ABCDEF";
    var valid = true;

    newVal.forEach(function(val) {
        var match = false;
        charList.split("").forEach(function(char) {
            if (char === val.toUpperCase()) match = true;
        });
        if (!match) valid = false;
    })

    return !!valid;
}

exports.rgb = function validateRGB(rgb) {
    return rgb.r <= 255 && rgb.r >= 0
        && rgb.g <= 255 && rgb.g >= 0
        && rgb.b <= 255 && rgb.b >= 0;
}

exports.rgbString = function validateRGBString(value) {
    var split = value.split(",");

    if (split.length !== 3) return false;

    var inRange = true;

    split.forEach(item => {
        var parsed = parseInt(item);
        if (parsed > 255 || parsed < 0) inRange = false;
    });

    return inRange;
}

exports.hsl = function validateHSL(hsl) {
    return hsl.h <= 360 && hsl.h >= 0
        && hsl.s <= 100 && hsl.s >= 0
        && hsl.l <= 100 && hsl.l >= 0;
}

exports.hslString = function validateHSLString(value) {
    var split = value.replace("%", "").split(",");

    if (split.length !== 3) return false;

    if (split[0] > 360 || split[0] < 0) return false;
    if (split[1] > 100 || split[1] < 0) return false;
    if (split[2] > 100 || split[2] < 0) return false;

    return true;
}