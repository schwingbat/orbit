import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { hexFromRGB, rgbFromHSL } from "./utils/convert";
import { makeDebouncer } from "./utils/makeDebouncer";

export const Colors = createContext(createColorState());

export function createColorState() {
  const saveDebouncer = makeDebouncer(100);

  const [hsl, setHSL] = createSignal({ h: 1, s: 0.5, l: 0.7 });

  const rgb = createMemo(() => rgbFromHSL(hsl()));
  const hex = createMemo(() => hexFromRGB(rgb()));

  createEffect(() => {
    const value = hex();
    saveDebouncer.queue(() => {
      localStorage.setItem("latestColor", value);
    });
  });

  const isDark = createMemo(() => hsl().l < 0.5);

  function patchHSL(patch: { h?: number; s?: number; l?: number }) {
    const clone = Object.assign({}, hsl());
    if (patch.h) clone.h = patch.h;
    if (patch.s) clone.s = patch.s;
    if (patch.l) clone.l = patch.l;
    setHSL(clone);
  }

  return { hsl, rgb, hex, isDark, patchHSL };
}
