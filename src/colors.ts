import { computed, effect, signal } from "@preact/signals";
import { hexFromRGB, rgbFromHSL } from "./utils/convert";
import { makeDebouncer } from "./utils/makeDebouncer";

const saveDebouncer = makeDebouncer(100);

export const hsl = signal({ h: 1, s: 0.5, l: 0.7 });

export const rgb = computed(() => rgbFromHSL(hsl.value));
export const hex = computed(() => hexFromRGB(rgb.value));

effect(() => {
  saveDebouncer.queue(() => {
    localStorage.setItem("latestColor", hex.value);
  });
});

export const isDark = computed(() => hsl.value.l < 0.5);

export function patchHSL(patch: { h?: number; s?: number; l?: number }) {
  const clone = Object.assign({}, hsl.value);
  if (patch.h) clone.h = patch.h;
  if (patch.s) clone.s = patch.s;
  if (patch.l) clone.l = patch.l;
  hsl.value = clone;
}
