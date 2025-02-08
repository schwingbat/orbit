import { createState, createStore, derive } from "@manyducks.co/dolla";
import {
  rgbFromHex,
  rgbFromHSL,
  hexFromRGB,
  hslFromRGB,
} from "../utils/convert";
import { validateHex } from "~/utils/validate";
import { makeDebouncer } from "~/utils/makeDebouncer";

const saveDebouncer = makeDebouncer(100);

export const ColorStore = createStore(function (initialColorHex: string) {
  const [$hsl, setHSL] = createState({ h: 1, s: 0.5, l: 0.7 });

  if (initialColorHex && validateHex(initialColorHex)) {
    setHSL(hslFromRGB(rgbFromHex(initialColorHex)));
  }

  const $rgb = derive([$hsl], (hsl) => rgbFromHSL(hsl));
  const $hex = derive([$rgb], (rgb) => hexFromRGB(rgb));

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

  this.watch([$hex], (hex) => {
    saveDebouncer.queue(() => {
      localStorage.setItem("latestColor", hex);
    });
  });

  return {
    $hsl,
    $rgb,
    $hex,
    $isDark,

    patchHSL,
  };
});
