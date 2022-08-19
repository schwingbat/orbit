import { RGBColor, HSLColor } from "types/colors";

export function formatHex(hex: string, hashSymbol = false) {
  if (hex[0] === "#") {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    // Expand hex shorthand.
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  return (hashSymbol ? "#" + hex : hex).toUpperCase();
}

export function formatRGB(rgb: RGBColor, resolution = 0) {
  // Format a float-format RGB object as a displayable string.

  let str = "";

  str += (rgb.r * 255).toFixed(resolution || 0) + ", ";
  str += (rgb.g * 255).toFixed(resolution || 0) + ", ";
  str += (rgb.b * 255).toFixed(resolution || 0);

  return str;
}

export function formatHSL(hsl: HSLColor, resolution = 0) {
  // Format a float-format HSL object as a displayable string.

  let str = "";

  str += (hsl.h * 360).toFixed(resolution || 0) + ", ";
  str += (hsl.s * 100).toFixed(resolution || 0) + "%, ";
  str += (hsl.l * 100).toFixed(resolution || 0) + "%";

  return str;
}

/*
	These are a couple of modified Stack Overflow answers.
	TinyColor is still 30KB, and my goal is to make this app
	as absolutely tiny as possible.
*/

export function rgbToHSL(color: RGBColor) {
  const { r, g, b } = color;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, l };
}

export function hslToRGB(color: HSLColor) {
  const { h, s, l } = color;

  let r;
  let g;
  let b;

  if (s == 0) {
    r = g = b = l;
  } else {
    const hue2rgb = function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r, g, b };
}

export function hexToRGB(hex: string) {
  hex = formatHex(hex);

  return {
    r: parseInt(hex.slice(0, 2), 16) / 255,
    g: parseInt(hex.slice(2, 4), 16) / 255,
    b: parseInt(hex.slice(4, 6), 16) / 255,
  };
}

export function rgbToHex(color: RGBColor) {
  const r = pad2(decToHexString(color.r * 255));
  const g = pad2(decToHexString(color.g * 255));
  const b = pad2(decToHexString(color.b * 255));

  return ("#" + r + g + b).toUpperCase();
}

// With a way to transform between HSL and RGB, I just need a way
// to convert between hex and RGB and I have everything I need.

function decToHexString(number: number) {
  if (number < 0) {
    number = 0xffffffff + number + 1;
  }

  const b16 = Math.round(number).toString(16);
  return b16 === "100" ? "FF" : b16;
}

function pad2(c: string) {
  return c.length == 1 ? "0" + c : "" + c;
}
