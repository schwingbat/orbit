import { makeState as $, mergeStates } from "@woofjs/client";

import { hslToRGB, rgbToHex } from "utils/convert.js";

import { Wheel } from "./Wheel.jsx";

export default function (view) {
  view.description =
    "The color wheel is the main interface for selecting colors in Orbit. The outer ring cycles through 360 degrees of hue, while the sliders in the middle control saturation and lightness.";

  const $hue = $(0.5);
  const $saturation = $(0.7);
  const $lightness = $(0.2);

  view.service("color", {
    $hue,
    $saturation,
    $lightness,
    $isDark: $lightness.map((l) => l < 0.5),
  });

  const $hex = mergeStates($hue, $saturation, $lightness, (h, s, l) => {
    return rgbToHex(hslToRGB({ h, s, l }));
  });

  view.decorate((el) => (
    <div
      style={{
        display: "inline-block",
        padding: "2em",
        margin: "0.5em",
        borderRadius: "8px",
        backgroundColor: $hex,
        overflow: "hidden",
      }}
    >
      {el}
    </div>
  ));

  return <Wheel />;
}
