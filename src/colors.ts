import { createAtom, compose, createEffect } from "@manyducks.co/dolla";
import { hexFromRGB, rgbFromHSL } from "./utils/convert";
import { makeDebouncer } from "./utils/makeDebouncer";

const saveDebouncer = makeDebouncer(100);

export const [hsl, setHSL] = createAtom({ h: 1, s: 0.5, l: 0.7 });

export const rgb = compose(() => rgbFromHSL(hsl()));
export const hex = compose(() => hexFromRGB(rgb()));

export const isDark = compose(() => hsl().l < 0.5);

const _ = createEffect(() => {
  const value = hex();
  saveDebouncer.queue(() => {
    localStorage.setItem("latestColor", value);
  });
});

export function patchHSL(patch: { h?: number; s?: number; l?: number }) {
  setHSL((current) => Object.assign({}, current, patch));
}

export function serializeHSL(value: {
  h: number;
  s: number;
  l: number;
}): string {
  return `${value.h}-${value.s}-${value.l}`;
}

export function deserializeHSL(value: string) {
  const [h, s, l] = value.split("-").map((part) => Number(part));
  return { h, s, l };
}
