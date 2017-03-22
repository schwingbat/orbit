function formatHex(hex) {
    if (hex[0] === "#") hex = hex.slice(1);
    if (hex.length === 3) {
        // Expand hex shorthand.
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return hex;
}

exports.isLightHex = function(hex) {
    // 7829367 is the decimal equivalent of #777777, middle grey.
    return parseInt(formatHex(hex), 16) > 7829367;
}

/*
    These are a couple of modified Stack Overflow answers.
    TinyColor is still 30KB, and my goal is to make this app
    as absolutely tiny as possible.
*/

exports.rgbToHSL = function rgbToHSL(color) {
    var r = color.r / 255;
    var g = color.g / 255;
    var b = color.b / 255;

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);

    var h;
    var s;
    var l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return {
        h: h * 360 + 0.5 | 0,
        s: s * 100 + 0.5 | 0,
        l: l * 100 + 0.5 | 0
    }
}

exports.hslToRGB = function hslToRGB(color) {
    var h = color.h / 360;
    var s = color.s / 100;
    var l = color.l / 100;

    var r;
    var g;
    var b;

    if (s == 0) {
        r = g = b = l;
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// With a way to transform between HSL and RGB, I just need a way
// to convert between hex and RGB and I have everything I need.

function decToHexString(number) {
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }

    return Math.round(number).toString(16);
}

function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

exports.hexToRGB = function hexToRGB(hex) {
    hex = formatHex(hex);

    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
    }
}

exports.rgbToHex = function rgbToHex(color) {
    var r = pad2(decToHexString(color.r));
    var g = pad2(decToHexString(color.g));
    var b = pad2(decToHexString(color.b));

    return "#" + r + g + b;
}