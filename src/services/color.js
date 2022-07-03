import { makeState } from "@woofjs/client";

export default function ColorService(self) {
  const $hue = makeState(1);
  const $saturation = makeState(0.5);
  const $lightness = makeState(0.7);

  const $hsl = makeState({
    h: 1,
    s: 0.5,
    l: 0.7,
  });

  return {
    $hue,
    $saturation,
    $lightness,
  };
}
