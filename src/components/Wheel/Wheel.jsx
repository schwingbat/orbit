import { mergeStates } from "@woofjs/client";

import styles from "./Wheel.module.css";

import FlatSlider from "./FlatSlider";
import WheelSlider from "./WheelSlider";

export function Wheel($attrs, self) {
  const { $hue, $saturation, $lightness } = self.getService("color");

  return (
    <div class={styles.wheel}>
      <div class={styles.hue}>
        <WheelSlider
          $value={$hue}
          activeKnobColor={$hue.map((h) => `hsl(${h * 360}, 100%, 50%)`)}
        />
      </div>

      <div class={styles.satAndLight}>
        <div class={styles.slider}>
          <FlatSlider
            label="Saturation"
            $value={$saturation}
            activeKnobColor={mergeStates(
              $hue,
              $saturation,
              (h, s) => `hsl(${h * 360}, ${s * 100}%, 50%)`
            )}
          />
        </div>
        <div class={styles.slider}>
          <FlatSlider
            label="Lightness"
            $value={$lightness}
            activeKnobColor={mergeStates(
              $hue,
              $lightness,
              (h, l) => `hsl(${h * 360}, 0%, ${l * 100}%)`
            )}
          />
        </div>
      </div>
    </div>
  );
}
