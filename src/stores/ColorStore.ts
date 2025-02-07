import { createState, createStore, derive } from "@manyducks.co/dolla";
import { hslToRGB, rgbToHex } from "../utils/convert";

export const ColorStore = createStore((_, ctx) => {
  const [$hsl, setHSL] = createState({ h: 1, s: 0.5, l: 0.7 });

  const $rgb = derive([$hsl], (hsl) => hslToRGB(hsl));
  const $hex = derive([$rgb], (rgb) => rgbToHex(rgb));

  const $isDark = derive([$hsl], ({ l }) => l < 0.5);

  const patchHSL = (patch: { h?: number; s?: number; l?: number }) => {
    setHSL((current) => {
      const clone = Object.assign({}, current);
      if (patch.h) clone.h = patch.h;
      if (patch.s) clone.s = patch.s;
      if (patch.l) clone.l = patch.l;
      return clone;
    });
  };

  ctx.on("hsl:patch", (e) => {
    patchHSL(e.detail as { h?: number; s?: number; l?: number });
  });

  return {
    $hsl,
    $rgb,
    $hex,
    $isDark,

    patchHSL,
  };
});
