import { makeState } from "@woofjs/client";

import styles from "./Wheel.module.css";
import colors from "./colors.png";

import FlatSlider from "./FlatSlider";
import WheelSlider from "./WheelSlider";

export function Wheel($attrs, self) {
  const $hue = makeState(1);
  const $saturation = makeState(0.5);
  const $lightness = makeState(0.7);

  const $changingHue = makeState(false);
  const $changingSat = makeState(false);
  const $changingLight = makeState(false);

  return (
    <div class={styles.wheel}>
      <img src={colors} class={styles.colors} />
      <div class={styles.hueGuide} />

      <WheelSlider $value={$hue} $changing={$changingHue} />

      <div class={styles.properties}>
        <FlatSlider
          label="Saturation"
          $value={$saturation}
          $changing={$changingSat}
        />
        <FlatSlider
          label="Lightness"
          $value={$lightness}
          $changing={$changingLight}
        />
      </div>
    </div>
  );
}
