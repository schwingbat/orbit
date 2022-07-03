import { Wheel } from "./Wheel.jsx";

export default function (view) {
  view.description =
    "The color wheel is the main interface for selecting colors in Orbit. The outer ring cycles through 360 degrees of hue, while the sliders in the middle control saturation and lightness. This color system is called HSL.";

  return <Wheel />;
}
