import { HSLColor, RGBColor } from "types/colors";

export function validateHex(hex: string) {
  if (hex[0] === "#") hex = hex.slice(1);
  if (hex.length !== 6 && hex.length !== 3) return false;

  const charList = "0123456789ABCDEF";

  for (let i = 0; i < hex.length; i++) {
    const c = hex[i];
    let match = false;

    for (let x = 0; x < charList.length; x++) {
      if (charList[x] === c.toUpperCase()) {
        match = true;
        break;
      }
    }

    if (!match) return false;
  }

  return true;
}

export function validateHSL(hsl: HSLColor) {
  return (
    hsl.h <= 1 &&
    hsl.h >= 0 &&
    hsl.s <= 1 &&
    hsl.s >= 0 &&
    hsl.l <= 1 &&
    hsl.l >= 0
  );
}

export function validateRGB(rgb: RGBColor) {
  return (
    rgb.r <= 1 &&
    rgb.r >= 0 &&
    rgb.g <= 1 &&
    rgb.g >= 0 &&
    rgb.b <= 1 &&
    rgb.b >= 0
  );
}
