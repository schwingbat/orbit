import { makeState as $, mergeStates } from "@woofjs/client";
import { hslToRGB, rgbToHex } from "utils/convert.js";

import { Formats } from "./Formats.jsx";

function colorDecorator($hue, $saturation, $lightness) {
  const $hex = mergeStates($hue, $saturation, $lightness, (h, s, l) => {
    return rgbToHex(hslToRGB({ h, s, l }));
  });

  return (el) => (
    <div
      style={{
        display: "inline-block",
        padding: "2em",
        margin: "0.5em",
        borderRadius: "8px",
        backgroundColor: $hex,
      }}
    >
      {el}
    </div>
  );
}

export default (view) => {
  view.description =
    "Displays the current color in several different formats for editing and copying to the clipboard.";

  const $hue = $(0.5);
  const $saturation = $(0.7);
  const $lightness = $(0.2);

  view.service("color", {
    $hue,
    $saturation,
    $lightness,
    $isDark: $lightness.map((l) => l < 0.5),
  });

  view.decorate(colorDecorator($hue, $saturation, $lightness));

  return <Formats />;
};
