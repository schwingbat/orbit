import { makeState } from "@woofjs/client";

export default function ColorService(self) {
  const defaultColor = self.options.defaultColor || { h: 1, s: 0.5, l: 0.7 };

  const $hue = makeState(defaultColor.h);
  const $saturation = makeState(defaultColor.s);
  const $lightness = makeState(defaultColor.l);

  const $isDark = $lightness.map((l) => l < 0.5);

  return {
    $hue,
    $saturation,
    $lightness,

    $isDark,
  };
}
